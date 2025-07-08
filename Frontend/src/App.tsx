// Import necessary React and router tools
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import API functions to fetch data from the backend
import { fetchCustomerType, fetchTeam, fetchAccountIndustry, fetchACVRange } from './api/api';

// Import reusable UI components
import CardContainer from './components/CardContainer';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';

// Import UI utilities from Material UI
import { Box, Grid, Typography, MenuItem, FormControl, Select, InputLabel, AppBar, Toolbar, Button } from '@mui/material';

// A reusable section component that receives data and renders chart + card layout
const DashboardSection = ({
  title,
  barData,
  doughnutData,
  cardSummary,
  showDoughnut = false
}: {
  title: string;
  barData: { label: string; value: number }[];
  doughnutData?: { label: string; value: number }[];
  cardSummary: { count: number; acv: number };
  showDoughnut?: boolean;
}) => (
  <Box
    sx={{
      padding: 4,
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography variant="h4" gutterBottom>{title}</Typography>

    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: '1200px',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      {/* Card showing total count and ACV */}
      <Grid xs={12} md={4} item>
        <CardContainer title={`${title} Summary`} count={cardSummary.count} acv={cardSummary.acv} />
      </Grid>

      {/* Main Bar Chart Section */}
      <Grid xs={12} md={8} item>
        <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 2, padding: 2 }}>
          <Typography variant="h6" gutterBottom>Bar Chart</Typography>
          <BarChart data={barData} />
        </Box>
      </Grid>

      {/* Optional Doughnut Chart */}
      {showDoughnut && doughnutData && (
        <Grid xs={12} md={6} item>
          <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 2, padding: 2 }}>
            <Typography variant="h6" gutterBottom>Doughnut Chart</Typography>
            <DoughnutChart data={doughnutData} />
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
);

const App = () => {
  // Define state variables to store data from the backend APIs
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [industryData, setIndustryData] = useState<any[]>([]);
  const [acvRangeData, setACVRangeData] = useState<any[]>([]);
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All');

  // Fetch all JSON datasets when the app loads
  useEffect(() => {
    fetchCustomerType().then(res => setCustomerData(res.data));
    fetchTeam().then(res => setTeamData(res.data));
    fetchAccountIndustry().then(res => setIndustryData(res.data));
    fetchACVRange().then(res => setACVRangeData(res.data));
  }, []);

  // Filters a given dataset by the selected fiscal quarter
  const filterByQuarter = (data: any[]) => selectedQuarter === 'All' ? data : data.filter(item => item.closed_fiscal_quarter === selectedQuarter);

  // Generic helper to calculate summary and bar chart input from a dataset
  const getSummaryAndBar = (data: any[], labelKey: string, valueKey = 'acv', countKey = 'count') => {
    const filtered = filterByQuarter(data);
    const summary = filtered.reduce((acc, item) => {
      acc.count += item[countKey] || 0;
      acc.acv += item[valueKey] || 0;
      return acc;
    }, { count: 0, acv: 0 });

    const barData = Object.entries(filtered.reduce((acc: Record<string, number>, item) => {
      acc[item[labelKey]] = (acc[item[labelKey]] || 0) + item[valueKey];
      return acc;
    }, {})).map(([label, value]) => ({ label, value }));

    return { summary, barData };
  };

  // Prepare data for Customer charts
  const customerFiltered = filterByQuarter(customerData);
  const customerSummary = customerFiltered.reduce((acc, item) => {
    acc.count += item.count;
    acc.acv += item.acv;
    return acc;
  }, { count: 0, acv: 0 });

  const customerBar = customerFiltered.map(item => ({
    label: `${item.closed_fiscal_quarter} (${item.Cust_Type})`,
    value: item.acv,
  }));

  const customerDoughnut = Object.entries(customerFiltered.reduce((acc: Record<string, number>, item) => {
    acc[item.Cust_Type] = (acc[item.Cust_Type] || 0) + item.acv;
    return acc;
  }, {})).map(([label, value]) => ({ label, value }));

  // Prepare data for Team, Industry, and ACV Range using helper
  const team = getSummaryAndBar(teamData, 'Team');
  const industry = getSummaryAndBar(industryData, 'Acct_Industry');
  const acvRange = getSummaryAndBar(acvRangeData, 'ACV_Range', 'count');

  // Get all unique quarters for dropdown filter
  const uniqueQuarters = Array.from(new Set([
    ...customerData,
    ...teamData,
    ...industryData,
    ...acvRangeData
  ].map(item => item.closed_fiscal_quarter))).sort();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Router>
        {/* Top navigation with filter and links */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button component={Link} to="/customer" color="inherit">Customer</Button>
            <Button component={Link} to="/team" color="inherit">Team</Button>
            <Button component={Link} to="/industry" color="inherit">Industry</Button>
            <Button component={Link} to="/acv-range" color="inherit">ACV Range</Button>

            <Box sx={{ flexGrow: 1 }} />

            {/* Quarter Filter Dropdown */}
            <FormControl sx={{ minWidth: 150, background: 'white', borderRadius: 1 }} size="small">
              <Select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All">All Quarters</MenuItem>
                {uniqueQuarters.map(q => <MenuItem key={q} value={q}>{q}</MenuItem>)}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        {/* Define routes for each section of the dashboard */}
        <Routes>
          <Route path="/customer" element={<DashboardSection title="Customer Type" barData={customerBar} doughnutData={customerDoughnut} cardSummary={customerSummary} showDoughnut />} />
          <Route path="/team" element={<DashboardSection title="Team" barData={team.barData} cardSummary={team.summary} />} />
          <Route path="/industry" element={<DashboardSection title="Account Industry" barData={industry.barData} cardSummary={industry.summary} />} />
          <Route path="/acv-range" element={<DashboardSection title="ACV Range" barData={acvRange.barData} cardSummary={acvRange.summary} />} />
          <Route path="*" element={<DashboardSection title="Customer Type" barData={customerBar} doughnutData={customerDoughnut} cardSummary={customerSummary} showDoughnut />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
