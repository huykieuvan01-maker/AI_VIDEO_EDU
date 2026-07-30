import React, { useRef, useEffect } from 'react';

interface Props {
  strokeCount: number;
  eraseCount: number;
  durationSeconds: number;
}

export const TelemetryChart: React.FC<Props> = ({ strokeCount, eraseCount, durationSeconds }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const d3 = (window as any).d3;
    if (!d3 || !svgRef.current || !containerRef.current) return;

    // Clear SVG content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Data for the comparison chart
    // Format: { label, studentValue, benchmarkValue, unit }
    const data = [
      { label: 'Thời gian vẽ (Giây)', student: durationSeconds, benchmark: 60, color: '#0ea5e9' },
      { label: 'Số nét vẽ', student: strokeCount, benchmark: 15, color: '#f59e0b' },
      { label: 'Số lần tẩy xóa', student: eraseCount, benchmark: 1, color: '#ef4444' }
    ];

    const margin = { top: 20, right: 30, bottom: 40, left: 130 };
    
    // Set responsive width/height
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = Math.max(300, containerRect.width);
    const height = 180;
    
    svg.attr('width', width).attr('height', height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerHeight])
      .padding(0.3);

    // X scale max is determined by max value between student and benchmark
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d: any) => Math.max(d.student, d.benchmark)) * 1.1])
      .range([0, innerWidth]);

    // Draw gridlines
    g.append('g')
      .attr('class', 'grid-lines')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
      )
      .selectAll('.tick line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '2,2');

    // Draw Y axis labels
    g.append('g')
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll('text')
      .style('font-family', 'Arial')
      .style('font-size', '11px')
      .style('font-weight', 'bold')
      .style('fill', '#475569');

    // Remove Y-axis line
    g.select('.domain').remove();

    // Group for each metric
    const row = g.selectAll('.bar-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d: any) => `translate(0, ${yScale(d.label)})`);

    const barHeight = yScale.bandwidth() / 2 - 2;

    // 1. Draw Benchmark Bars (light background bars)
    row.append('rect')
      .attr('x', 0)
      .attr('y', barHeight)
      .attr('width', (d: any) => xScale(d.benchmark))
      .attr('height', barHeight)
      .attr('fill', '#e2e8f0')
      .attr('rx', 3)
      .attr('opacity', 0.8);

    // 2. Draw Student Bars (colored active bars)
    row.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 0) // Start at 0 for transition
      .attr('height', barHeight)
      .attr('fill', (d: any) => d.color)
      .attr('rx', 3)
      .transition()
      .duration(800)
      .attr('width', (d: any) => xScale(d.student));

    // 3. Add Student Value labels
    row.append('text')
      .attr('x', (d: any) => xScale(d.student) + 5)
      .attr('y', barHeight / 2 + 3)
      .text((d: any) => d.student)
      .style('font-family', 'monospace')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('fill', (d: any) => d.color)
      .style('opacity', 0)
      .transition()
      .delay(400)
      .duration(400)
      .style('opacity', 1)
      .attr('x', (d: any) => xScale(d.student) + 5);

    // 4. Add Benchmark labels
    row.append('text')
      .attr('x', (d: any) => xScale(d.benchmark) + 5)
      .attr('y', barHeight * 1.5 + 4)
      .text((d: any) => `chuẩn: ${d.benchmark}`)
      .style('font-family', 'Arial')
      .style('font-size', '8px')
      .style('fill', '#94a3b8');

  }, [strokeCount, eraseCount, durationSeconds]);

  return (
    <div ref={containerRef} className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-bold text-slate-500">So sánh với Benchmark chuẩn</span>
        <span className="text-[10px] text-sky-500 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Tương tác D3.js
        </span>
      </div>
      <svg ref={svgRef} className="w-full block"></svg>
    </div>
  );
};
