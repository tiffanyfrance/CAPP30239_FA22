d3.json('flare.json')
.then((data) => {

  let width = d3.select('svg').node().getBoundingClientRect().width,
    radius = width / 2;

  let svg = d3.select('svg')
    .append('g');

  // let color = d3.scaleOrdinal(d3.quantize(t => d3.interpolateSpectral(t * 0.9 + 0.2), data.children.length + 1));
  // let color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  let color = d3.scaleOrdinal(['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']);

  let arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005)) //between arcs
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1);

  let partitionLayout = d3.partition()
    .size([2 * Math.PI, radius]);

  let rootNode = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  partitionLayout(rootNode);

  svg.selectAll('path')
    .data(rootNode.descendants())
    .join('path')
    .attr('d', arc)
    .attr('fill', d => {
      if (!d.depth) return "rgb(255,255,255)";
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("opacity", 0.7);

  svg.append("g")
    .attr('class', 'text-layer')
    .selectAll("text")
    .data(rootNode.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
    .attr("transform", function (d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text(d => d.data.name);

})