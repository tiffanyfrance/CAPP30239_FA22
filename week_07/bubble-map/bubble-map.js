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
  d3.json("chicago-2022-crime.json"),
  d3.json("chicago.json")
]).then(([data, chicagoTopology]) => {

  const radius = d3.scaleLinear()
    .domain([0, d3.max(Object.values(data), d => d.crimeDensity)])
    .range([0, 25]);

  const communities = topojson.feature(chicagoTopology, chicagoTopology.objects.chicago);
  const mesh = topojson.mesh(chicagoTopology, chicagoTopology.objects.chicago);
  const projection = d3.geoAlbers()
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  svg.append("g")
    .selectAll("path")
    .data(communities.features)
    .join("path")
    .attr("stroke", '#ccc')
    .attr("fill", "#efefef")
    .attr("d", path)

  svg.append("g")
    .selectAll("circle")
    .data(communities.features)
    .join("circle")
    .attr("stroke", '#ccc')
    .attr("fill", "#f00")
    .attr("opacity", 0.75)
    .attr("r", d => radius(data[d.properties.area_numbe].crimeDensity))
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .on("mousemove", function (event, d) {
      let community = d.properties.community;
      let stats = data[d.properties.area_numbe];

      tooltip
        .style("visibility", "visible")
        .html(`${community}<br>Crime Count: ${stats.crimeCount}
          <br>Population: ${stats.population}
          <br>Crime/1000: ${stats.crimeDensity.toFixed(2)}`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", '#f00');
    });
});