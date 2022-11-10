const height = 410,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.json("libs/counties-albers-10m.json").then(us => {  
  us.objects.states.geometries = us.objects.states.geometries.filter(d => d.properties.name === "Arizona");
  
  const az = topojson.feature(us, us.objects.states); // Map simple geometries, used to create canvas
  const mesh = topojson.mesh(us, us.objects.states); // Shape of object, used to center and resize (projection)
  const projection = d3.geoIdentity()
    .angle(10)
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  svg.append("g")
    .selectAll("path")
    // .data(counties.features)
    // .data(states.features)
    .data(az.features)
    .join("path")
    .attr("stroke","#999")
    .attr("fill","#eee")
    .attr("d", path);
    
});