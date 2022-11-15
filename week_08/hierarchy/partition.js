let margin = { top: 0, right: 0, bottom: 0, left: 0 },
width = 900,
height = 800;

const tip = d3.tip()
.attr('class', 'd3-tip')
.html((e,d) => d.data.name);

const svg = d3.select('#chart')
.append('svg')
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append('g')
.attr("transform", `translate(${margin.left},${margin.top})`);

d3.json('flare.json')
.then((data) => {

  let color = d3.scaleOrdinal(d3.quantize(d3.interpolateSpectral, data.children.length + 1));

  let partitionLayout = d3.partition()
    .size([width, height]);

  let rootNode = d3.hierarchy(data)
    .sum(d => d.value);

  partitionLayout(rootNode);

  svg.selectAll('rect')
    .data(rootNode.descendants())
    .enter()
    .append('rect')
    .attr('x', d => d.y0)
    .attr('y', d => d.x0)
    .attr('width', d => d.y1 - d.y0)
    .attr('height', d => d.x1 - d.x0)
    .attr('fill', d => {
      if (!d.depth) return "#ccc";
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .on('mouseover', tip.show);

    svg.call(tip);

})