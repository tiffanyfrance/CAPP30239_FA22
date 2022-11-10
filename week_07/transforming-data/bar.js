function bar(data, id, xVal, yVal) {
  const height = 300,
    margin = ({ top: 25, right: 30, bottom: 25, left: 30 });

  const width = d3.select(id)
    .node()
    .getBoundingClientRect().width;

  let svg = d3.select(id)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  let x = d3.scaleBand()
    .domain(data.map(d => d[xVal])) // Use array from line 8 (data) and Gender from data
    .range([margin.left, width - margin.right])
    .padding(0.1);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[yVal])]).nice() // uses data as data and Totals from data
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left - 5},0)`)
    .call(d3.axisLeft(y));

  let bar = svg.selectAll(".bar")
    .append("g")
    .data(data) // Update data to data
    .join("g")
    .attr("class", "bar");

  bar.append("rect")
    .attr("fill", "steelblue")
    .attr("x", d => x(d[xVal])) // Gender
    .attr("width", x.bandwidth())
    .attr("y", d => y(d[yVal])) // Totals
    .attr("height", d => y(0) - y(d[yVal])); // Totals

  bar.append('text')
    .text(d => d[yVal]) // Totals
    .attr('x', d => x(d[xVal]) + (x.bandwidth() / 2)) // Gender
    .attr('y', d => y(d[yVal]) - 15) // Totals
    .attr('text-anchor', 'middle');
};