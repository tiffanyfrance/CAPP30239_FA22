// Symbol function immediately invoked
(function symbol() {
  let height = 400,
      width = 600,
      margin = ({ top: 25, right: 30, bottom: 35, left: 25 });
    
  const svg = d3.select("#symbol-chart")
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

    svg.append("g")
        .selectAll(".cross")
        .data(data)
        .join("path")
        .attr("d", d3.symbol().type(d3.symbolCross).size(12))
        .attr("class", "cross")
        .attr("fill", "orange")
        .attr("opacity", 0.75)
        .attr("transform", d => `translate(${x(d.body_mass_g)},${y(d.flipper_length_mm)})`);

    const tooltip = d3.select("body").append("div")
      .attr("class", "svg-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden");

    d3.selectAll(".cross") // note we are selecting all the symbols by class
      .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "black");
        tooltip
          .style("visibility", "visible")
          .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill", "orange");
        tooltip.style("visibility", "hidden");
      })
      
  });
})();