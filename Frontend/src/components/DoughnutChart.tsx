import * as d3 from 'd3';               // D3.js for data visualization
import { useEffect, useRef } from 'react';

// Define shape of data item
interface DataItem {
  label: string;
  value: number;
}

// Functional component to render a Doughnut Chart
const DoughnutChart = ({ data }: { data: DataItem[] }) => {
  const ref = useRef<SVGSVGElement>(null); // Ref to attach D3 to the SVG element

  useEffect(() => {
    const svg = d3.select(ref.current);    // Select the SVG element
    svg.selectAll('*').remove();            // Clear previous drawings

    // Set dimensions and radius for the doughnut chart
    const width = 300, height = 300, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Create a group element to center the chart
    const chart = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Define a color scale using D3's categorical scheme
    const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    // Compute pie layout from data values
    const pie = d3.pie<DataItem>().value(d => d.value);
    const data_ready = pie(data);

    // Define arc generator for the doughnut slices
    const arc = d3.arc()
      .innerRadius(100)     // Inner radius defines the hole size
      .outerRadius(radius); // Outer radius defines the outer circle size

    // Draw doughnut arcs
    chart.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Add labels to the center of each slice
    chart.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '10px');
  }, [data]);

  return <svg ref={ref}></svg>; // Render the SVG chart
};

export default DoughnutChart;
