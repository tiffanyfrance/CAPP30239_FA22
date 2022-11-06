// Voronoi function immediately invoked
(function voronoi() {
  let height = 400,
      width = 600,
      margin = ({ top: 25, right: 30, bottom: 35, left: 25 });
    
  const svg = d3.select("#voronoi-chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

  d3.csv('penguins.csv').then(data => {
    
    let x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.body_mass_g)).nice()
      .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.flipper_length_mm)).nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

    let cellGroups = svg.append("g") // adding a group so we can isolate the data
      .selectAll("g")
      .data(data)
      .join('g');

    const tooltip = d3.select("body").append("div")
      .attr("class", "svg-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");

    cellGroups.append("path")
        .attr("d", d3.symbol().type(d3.symbolCross).size(12))
        .attr("class", "star")
        .attr("fill", "orange")
        .attr("opacity", 0.75)
        .attr("transform", d => `translate(${x(d.body_mass_g)},${y(d.flipper_length_mm)})`);

    const delaunay = d3.Delaunay.from(data, d => x(d.body_mass_g), d => y(d.flipper_length_mm));
    const voronoi = delaunay.voronoi([x.range()[0], y.range()[1], x.range()[1], y.range()[0]]);

    cellGroups.append("path")
      .attr("d", (d, i) => voronoi.renderCell(i))
      .attr("fill-opacity", 0)
      .attr("stroke", "black")
      .on("mouseover", function (event, d) {
        d3.select(this.parentNode)
          .select(".star")
          .attr("fill", "black");
        tooltip
          .style("visibility", "visible")
          .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        d3.select(this.parentNode)
          .select(".star")
          .attr("fill", "orange");
        tooltip.style("visibility", "hidden");
    });
      
  });
})();