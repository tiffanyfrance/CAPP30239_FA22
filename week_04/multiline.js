let height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("long-term-interest-G7.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let countries = new Set(); 

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.Value = +d.Value;
    countries.add(d.Location); // push unique values to Set
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Value)).nice() // using extent because values are less than 0
    .range([height - margin.bottom, margin.top]);

  // Y Axis first
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)
      .tickSize(-innerWidth)
      .tickFormat(d => d + "%")
    );

  // X Axis second because we want it to be placed on top
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top})`)
    .call(d3.axisBottom(x)
      .tickSizeOuter(0)
      .tickSizeInner(0)
    );

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Value));
 
  // looping through set
  for (let country of countries) { 
    //.filter filters data in D3
    let countryData = data.filter(d => d.Location === country);

    let g = svg.append("g")
      .attr("class", "country")
      .on('mouseover', function () {
        // set/remove highlight class
        // highlight class defined in html
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    // USA selected in blue on load of page
    if (country === "USA") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(countryData) // datum is a single result from data
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    // find position of last piece to position end of line labels
    let lastEntry = countryData[countryData.length - 1];

    g.append("text")
      .text(country)
      .attr("x", x(lastEntry.Date))
      .attr("y", y(lastEntry.Value))
      .attr("dx", "5px") // shifting attribute in svg
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});