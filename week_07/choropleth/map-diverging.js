const tooltip = d3.select("body").append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.csv("data/unemployment2020.csv"),
  d3.json("libs/counties-albers-10m.json")
]).then(([data, us]) => {
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d;
  }

  const counties = topojson.feature(us, us.objects.counties);

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()
    .domain([0, 10]).nice()
    .range(['#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac']);
    // .range(d3.schemePuOr[9]); // Alternative color scheme https://observablehq.com/@d3/color-schemes

  const path = d3.geoPath();

  d3.select("#legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
          (['#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac'])
          // (d3.schemePuOr[9]) // Alternative color scheme https://observablehq.com/@d3/color-schemes
        ),
        { title: "Unemployment rate (%)" }
      ));

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
        .html(`${info.county}<br>${info.rate}%`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
});