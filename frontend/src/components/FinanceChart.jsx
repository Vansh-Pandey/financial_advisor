import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function FinanceChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous

    // Chart dimensions
    const width = chartRef.current.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Process data
    const dates = Object.keys(data.daily_breakdown);
    const categories = data.categories;

    // Neon color scale
    const color = d3.scaleOrdinal() 
      .domain(categories)
      .range(['#0aff0a', '#ff00ff', '#00ffff', '#ffff00', '#ff00aa']);

    // Create chart
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add glitch background
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#glitchPattern)')
      .attr('opacity', 0.05);

    // X scale (time)
    const x = d3.scaleBand()
      .domain(dates)
      .range([0, innerWidth])
      .padding(0.1);

    // Y scale (amount)
    const y = d3.scaleLinear()
      .domain([0, d3.max(dates, date => 
        d3.sum(categories, cat => data.daily_breakdown[date][cat])
      )])
      .range([innerHeight, 0]);

    // Add axes
    const xAxis = d3.axisBottom(x)
      .tickFormat(d => d3.timeFormat('%b %d')(new Date(d)))
      .tickSizeOuter(0);

    const yAxis = d3.axisLeft(y)
      .tickFormat(d => `$${d}`)
      .tickSizeOuter(0);

    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#0aff0a');

    chart.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .attr('color', '#0aff0a');

    // Add bars with glitch effect
    dates.forEach(date => {
      categories.forEach(category => {
        const value = data.daily_breakdown[date][category];
        if (value > 0) {
          const bar = chart.append('rect')
            .attr('x', x(date))
            .attr('y', y(value))
            .attr('width', x.bandwidth())
            .attr('height', innerHeight - y(value))
            .attr('fill', color(category))
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('opacity', 0.8);

          // Add glitch animation
          bar.append('animate')
            .attr('attributeName', 'x')
            .attr('values', `${x(date)};${x(date)+1};${x(date)-1};${x(date)}`)
            .attr('dur', '3s')
            .attr('repeatCount', 'indefinite');
        }
      });
    });

    // Add interactive tooltip
    const tooltip = d3.select(chartRef.current.parentNode)
      .append('div')
      .attr('class', 'absolute bg-black border border-green-400 p-2 text-xs pointer-events-none opacity-0');

    chart.selectAll('rect')
      .on('mouseover', function(event) {
        const [xPos, yPos] = d3.pointer(event, chartRef.current);
        const date = d3.select(this).attr('x');
        const category = d3.select(this).attr('fill');
        const value = d3.select(this).attr('height');
        
        d3.select(this).attr('opacity', 1);
        tooltip.transition().duration(200).style('opacity', 1)
          .style('left', `${xPos + margin.left + 10}px`)
          .style('top', `${yPos + margin.top}px`)
          .html(`<strong>${d3.timeFormat('%b %d')(new Date(date))}</strong><br/>
                 ${category}: $${value.toFixed(2)}`);
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.8);
        tooltip.transition().duration(500).style('opacity', 0);
      });

  }, [data]);

  return (
    <div className="relative bg-black bg-opacity-50 border border-green-400 rounded-lg p-4 h-[400px] w-full overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <defs>
          <pattern id="glitchPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="black" />
            <path d="M0,0 L10,10 M10,0 L0,10" stroke="#0aff0a" strokeWidth="0.5" />
          </pattern>
        </defs>
      </svg>
      
      <svg 
        ref={chartRef} 
        className="w-full h-full"
        viewBox={`0 0 ${chartRef.current?.clientWidth || 800} 400`}
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  );
}