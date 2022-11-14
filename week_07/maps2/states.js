const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.json("libs/counties-albers-10m.json").then(us => {

  // us data contains counties, states, and nation
  const nation = topojson.feature(us, us.objects.nation); // Map simple geometries

  const path = d3.geoPath();

  svg.append("g")
    .selectAll("path")
    .data(nation.features)
    .join("path")
    .attr("stroke", "#999")
    .attr("fill", "white")
    // .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc')
    .attr("d", path);

});