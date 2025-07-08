import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface DataItem {
  label: string;
  value: number;
}

const BarChart = ({ data }: { data: DataItem[] }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value) || 0]).range([height, 0]);

    const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#3f51b5');

    chart.append('g').call(d3.axisLeft(y));
    chart.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
  }, [data]);

  return <svg ref={ref} width={400} height={300} />;
};

export default BarChart;
