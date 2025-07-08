import { Card, CardContent, Typography } from '@mui/material';

const CardContainer = ({ title, count, acv }: { title: string; count: number; acv: number }) => (
  <Card sx={{ margin: 2, width: 300, borderRadius: 4, boxShadow: 4 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">Count: {count}</Typography>
      <Typography variant="body1">ACV: ${acv.toLocaleString()}</Typography>
    </CardContent>
  </Card>
);

export default CardContainer;
