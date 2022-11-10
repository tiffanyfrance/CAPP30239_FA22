/* D3 Line Chart */
function line(data, id, xVal, yVal, minVal) {
  const height = 250,
    margin = ({ top: 15, right: 30, bottom: 20, left: 20 });
 
  const width = d3.select(id)
    .node()
    .getBoundingClientRect().width;

  const svg = d3.select(id)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d[xVal])) // returns an array
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([minVal, d3.max(data, d => d[yVal])]).nice() // nice to round up axis tick
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis") // adding a class to y-axis for scoping
    .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat(d => d)
      .tickSize(-width + margin.right + margin.left) // modified to meet at end of axis
    );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%b")));

  let line = d3.line()
    .x(d => x(d[xVal]))
    .y(d => y(d[yVal]))
    .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

  svg.append("path")
    .datum(data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue");

};