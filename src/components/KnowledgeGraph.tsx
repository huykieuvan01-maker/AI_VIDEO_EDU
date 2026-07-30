import React, { useRef, useEffect } from 'react';

interface Props {
  subject: string;
  recapConcept: string;
  coreGap: string;
}

export const KnowledgeGraph: React.FC<Props> = ({ subject, recapConcept, coreGap }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const d3 = (window as any).d3;
    if (!d3 || !svgRef.current || !containerRef.current) return;

    // Clear SVG content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Define Graph Nodes & Links
    const nodes = [
      { id: 'subject', name: `Môn Học: ${subject.toUpperCase()}`, group: 1, val: 24, color: '#4f46e5' },
      { id: 'topic', name: 'Chủ Đề Hiện Tại', group: 2, val: 20, color: '#06b6d4' },
      { id: 'gap', name: `Lỗ Hổng: ${coreGap.substring(0, 20)}...`, group: 3, val: 18, color: '#ef4444' },
      { id: 'recap', name: `Cần Ôn Tập: ${recapConcept}`, group: 4, val: 18, color: '#f59e0b' }
    ];

    const links = [
      { source: 'subject', target: 'topic', value: 2 },
      { source: 'topic', target: 'gap', value: 4 },
      { source: 'gap', target: 'recap', value: 6 }
    ];

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = Math.max(300, containerRect.width);
    const height = 180;

    svg.attr('width', width).attr('height', height);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(55))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Arrow markers for links
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#cbd5e1');

    // Draw Links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    // Draw Node Groups
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Draw Node Circles
    node.append('circle')
      .attr('r', (d: any) => d.val)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'grab')
      .style('filter', 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))');

    // Draw Text Labels
    node.append('text')
      .attr('dy', (d: any) => d.val + 12)
      .attr('text-anchor', 'middle')
      .text((d: any) => d.name)
      .style('font-family', 'Arial')
      .style('font-size', '9.5px')
      .style('font-weight', 'bold')
      .style('fill', '#475569');

    // Simulation ticks update
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
    });

    // Drag handlers
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      // Bound the drag within SVG container
      d.fx = Math.max(d.val, Math.min(width - d.val, event.x));
      d.fy = Math.max(d.val, Math.min(height - d.val, event.y));
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [subject, recapConcept, coreGap]);

  return (
    <div ref={containerRef} className="w-full bg-white border border-slate-200 rounded-xl p-3 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-bold text-slate-500">Mạng lưới Liên kết Khái niệm</span>
        <span className="text-[10px] text-sky-500 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" /> D3 Force Link
        </span>
      </div>
      <svg ref={svgRef} className="w-full block"></svg>
    </div>
  );
};
