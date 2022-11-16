const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.json("chicago-2022-crime-longlat.json"), // this uses a different dataset with long lat arrays
  d3.json("chicago.json")
]).then(([data, chicagoTopology]) => {

  const communities = topojson.feature(chicagoTopology, chicagoTopology.objects.chicago);
  const mesh = topojson.mesh(chicagoTopology, chicagoTopology.objects.chicago);
  const projection = d3.geoMercator()
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  console.log("projection", projection)

  svg.append("g")
    .selectAll("path")
    .data(communities.features)
    .join("path")
    .attr("stroke", '#ccc')
    .attr("fill", "#efefef")
    .attr("d", path)
  console.log("data", data)
  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("stroke", '#ccc')
    .attr("fill", "brown")
    .attr("opacity", 0.75)
    // .attr("r", d => (d.crimeDensity))
    .attr("r", 8) // if a marker, you can use a static value
    // .attr("transform", d => `translate(${path.centroid(d)})`) // replaced by next two lines
    .attr("cx", d => projection(d.longLat)[0]) // uses projection and returns long
    .attr("cy", d => projection(d.longLat)[1]) // uses projection and returns lat
    .on("mousemove", function (event, d) {
      // tooltip updated to use new data structure
      tooltip
        .style("visibility", "visible")
        .html(`Crime Count: ${d.crimeCount}
          <br>Population: ${d.population}
          <br>Crime/1000: ${d.crimeDensity.toFixed(2)}`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", 'brown');
    });
});