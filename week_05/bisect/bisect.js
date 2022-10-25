/* D3 Line Chart with Bisect Tooltip */

const height = 500,
  width = 800,
  margin = ({ top: 15, right: 30, bottom: 45, left: 50 });

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv('long-term-interest-G7.csv').then(data => {
  let timeParse = d3.timeParse("%Y-%m");
  let maxDate = timeParse("2010-12"); // used to filter data

  for (let d of data) {
    d.Value = +d.Value;
    d.Date = timeParse(d.Date);
  }

  // filtering data to only return USA with date greater than maxDate
  data = data.filter(d => d.Location === "USA" && d.Date > maxDate);
  console.log(data)

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Value)]).nice()
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat(d => d + "%")
      .tickSize(-width + margin.right + margin.left)
    );

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em")
    .text("Year");

  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top / 2)
    .attr("dx", "-0.5em")
    .attr("y", 10)
    .attr("transform", "rotate(-90)")
    .text("Interest rate");

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Value))
    .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

  svg.append("path")
    .datum(data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
  
  // Event Listener
  svg.on("pointerenter pointermove", pointerMove)
    .on("pointerleave", pointerLeave)

  // Create tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  // Circle for hovering tooltip
  const circle = svg
    .append("circle")
    .attr("r", 3)
    .attr("fill", "black")
    .attr("opacity", 0);

  // Defining bisector function
  const bisectDate = d3.bisector(d => d.Date).center;

  // Function called on pointerenter and pointermove (75)
  function pointerMove(event) {
    // Use bisectDate to return position in array
    // invert is "give range/get domain", inverts way scale works
    let i = bisectDate(data, x.invert(d3.pointer(event)[0]));
    let d = data[i];

    circle.attr("opacity", 1)
      .attr("cx", x(d.Date))
      .attr("cy", y(d.Value));

    // getBoundingClientRect() is javascript function 
    // that gives info about element e.g. height, width, 
    // position, etc. (used line 111 and 112)
    let circlePos = circle.node().getBoundingClientRect();
    let tooltipPos = tooltip.node().getBoundingClientRect();

    tooltip
      .style("visibility", "visible")
      // .toLocaleDateString() makes human readable date
      .html(`Date: ${d.Date.toLocaleDateString()}<br />Interest: ${d.Value}%`)
      .style("top", (circlePos.top - tooltipPos.height - 10) + "px")
      .style("left", (circlePos.left - (tooltipPos.width / 2)) + "px");
  }

  // Function run on pointerleave event (76)
  function pointerLeave() {
    circle.attr("opacity", 0);
    tooltip.style("visibility", "hidden");
  }
});