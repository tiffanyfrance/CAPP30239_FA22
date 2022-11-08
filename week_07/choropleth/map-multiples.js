const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

let counties;

Promise.all([
  d3.json("data/unemployment-four-years.json"),
  d3.json("libs/counties-albers-10m.json")
]).then(([data, us]) => {
  counties = topojson.feature(us, us.objects.counties);
  createChart(data, "2018", '#row1');
  createChart(data, "2019", '#row1');
  createChart(data, "2020", '#row2');
  createChart(data, "2021", '#row2');
});

function createChart(allData, year, elemId) {
  const data = allData[year];
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;
  }

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()
    .domain([0, 10]).nice()
    .range(d3.schemePurples[9]);

  const path = d3.geoPath();

  const svg = d3.select(elemId)
    .append("div")
    .html(`<h3>${year}</h3>`)
    .attr("class", "chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("path")
    .data(counties.features)
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc')
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info?.county}<br>${info?.rate}%`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
}

d3.select("#legend")
  .node()
  .appendChild(
    Legend(
      d3.scaleOrdinal(
        ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
        d3.schemePurples[9]
      ),
      { title: "Unemployment rate (%)" }
    ));