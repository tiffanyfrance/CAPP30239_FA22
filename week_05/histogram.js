// Simple Histogram

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate-jan.json').then((data) => {

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.average)).nice()
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0,10]);
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g")
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(10)
    .value(d => d.average)(data);

  let g = binGroups.selectAll("g")
    .data(bins)
    .join("g");

  // g.append("rect")
  //   .attr("x", d => x(d.x0) + (padding / 2))
  //   .attr("y", d => y(d.length))
  //   .attr("width", d => x(d.x1) - x(d.x0) - padding)
  //   .attr("height", d => height - margin.bottom - y(d.length))
  //   .attr("fill", "steelblue");

  // g.append("text")
  //   .text(d => d.length)
  //   .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
  //   .attr("y", d => y(d.length) - 5)
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "#333");

});