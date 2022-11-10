const height = 810,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.json("data/japan.json").then(japan => {
  // japan.objects["N03-21_210101"].geometries = japan.objects["N03-21_210101"].geometries.filter(d => d.properties.N03_001 === "北海道");

  const countries = topojson.feature(japan, japan.objects["N03-21_210101"]);
  const mesh = topojson.mesh(japan, japan.objects["N03-21_210101"]);
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