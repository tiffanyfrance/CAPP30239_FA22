const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.json("libs/countries-110m.json").then(world => {
  const countries = topojson.feature(world, world.objects.countries);
  const mesh = topojson.mesh(world, world.objects.countries);
  const projection = d3.geoMercator()
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  svg.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("stroke", "#999")
    .attr("fill", "white")
    .attr("d", path);

});