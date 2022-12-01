// ring
ring();
ring2();
ring3();
legend();
multiline();
multiline2();
network();
function ring() {
  let data = [
    { "category": "Food", "amount": 1300 },
    { "category": "Home", "amount": 2300 },
    { "category": "Entertainment", "amount": 500 },
    { "category": "Utilies", "amount": 500 },
    { "category": "Loans", "amount": 50 },
    { "category": "Gas", "amount": 50 },
  ]
  console.log(data)
  const height = 250,
    width = 250,
    innerRadius = 50,
    outerRadius = 80,
    labelRadius = 100;

  const arcs = d3.pie().value(d => d.amount)(data);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .attr("d", arc);

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .selectAll("tspan")
    .data(d => {
      return [d.data.category, d.data.amount];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
}
function ring2() {
  let data = [
    { "category": "Food", "amount": 1300 },
    { "category": "Home", "amount": 2300 },
    { "category": "Entertainment", "amount": 500 },
    { "category": "Utilies", "amount": 500 },
    { "category": "Loans", "amount": 50 },
    { "category": "Gas", "amount": 50 },
  ]
  console.log(data)
  const height = 250,
    width = 250,
    innerRadius = 50,
    outerRadius = 80,
    labelRadius = 100;

  const arcs = d3.pie().value(d => d.amount)(data);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .attr("d", arc);

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .selectAll("tspan")
    .data(d => (d.data.amount > 100) ? [d.data.category, d.data.amount] : [])
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
}
function ring3() {
  let data = [
    { "category": "Food", "amount": 1300 },
    { "category": "Home", "amount": 2300 },
    { "category": "Entertainment", "amount": 500 },
    { "category": "Utilies", "amount": 500 },
    { "category": "Loans", "amount": 50 },
    { "category": "Gas", "amount": 50 },
  ]
  console.log(data)
  const height = 200,
    width = 200,
    innerRadius = 50,
    outerRadius = 80,
    labelRadius = 100;

  const arcs = d3.pie().value(d => d.amount)(data);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart2b")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .attr("d", arc);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);

  let categories = data.map(d => d.category);
  let swatchHTML = Swatches(d3.scaleOrdinal(categories, d3.schemeCategory10));

  d3.select("#chart2b")
    .append("div")
    .node().innerHTML = swatchHTML;
}
function legend() {
  d3.select("#chart4")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["Long title Long title Long title", "Longer title Long title", "Short title Long title", "Longest title"],
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate" }
      ));

  d3.select("#chart4b")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["Long title Long title Long title", "Longer title Long title", "Short title Long title", "Longest title"],
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate", width: 600 }
      ));
}
function multiline() {
  let height = 500,
    width = 800,
    margin = ({ top: 25, right: 70, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

  const svg = d3.select("#chart5")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  d3.csv("bls-metro-unemployment.csv").then(data => {
    let timeParse = d3.timeParse("%Y-%m-%d");

    let countries = new Set();

    for (let d of data) {
      d.Date = timeParse(d.date);
      d.Value = +d.unemployment;
      countries.add(d.division); // push unique values to Set
    }

    let x = d3.scaleTime()
      .domain(d3.extent(data, d => d.Date))
      .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.Value)]).nice() // using extent because values are less than 0
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
      let countryData = data.filter(d => d.division === country);

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
}
function multiline2() {
  let height = 500,
    width = 800,
    margin = ({ top: 25, right: 70, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

  const svg = d3.select("#chart5b")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  d3.csv("bls-metro-unemployment.csv").then(data => {
    let timeParse = d3.timeParse("%Y-%m-%d");

    let countries = new Set();

    for (let d of data) {
      d.Date = timeParse(d.date);
      d.Value = +d.unemployment;
      countries.add(d.division); // push unique values to Set
    }

    let x = d3.scaleTime()
      .domain(d3.extent(data, d => d.Date))
      .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Value)]).nice() // using extent because values are less than 0
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
      let countryData = data.filter(d => d.division === country);

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
}
function network() {
  d3.json('color-network.json').then(data => {
    let height = 300,
      width = d3.select("#chart1").style("width").slice(0, -2);
  
    const svg = d3.select("#chart1")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    let { nodes, links } = data;
  
    const radius = 25;
  
    let simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink()
        .id((d, i) => i)
        .links(links)
        .distance(100)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(radius + 4));
  
    let drag = d3.drag()
      .on("start", event => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", event => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });
  
    simulation.on("tick", () => {
      let link = svg
        .selectAll("line")
        .data(links);
  
      link
        .enter()
        .append("line")
        .style("stroke", "#aaa")
        .attr("stroke-width", 1.5)
        .merge(link)
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
  
      let node = svg
        .selectAll("circle")
        .data(nodes);
  
      node
        .enter()
        .append("circle")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("r", radius)
        // .attr("fill", "#eee")
        .attr("fill", (d) => d.color)
        .call(drag)
        .merge(node)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        // .on("mousemove", function (event, d) {
        //   tooltip
        //     .style("visibility", "visible")
        //     .html(`${d.color}`)
        //     .style("top", (event.pageY - 10) + "px")
        //     .style("left", (event.pageX + 10) + "px");
        //   d3.select(this).attr("stroke", "black");
        // })
        // .on("mouseout", function () {
        //   tooltip.style("visibility", "hidden");
        //   d3.select(this).attr("stroke", 'none');
        // });
  
    });
  
  });
}

// const tooltip = d3.select("#chart1")
//   .append("div")
//   .attr("class", "svg-tooltip")
//   .style("position", "absolute")
//   .style("visibility", "hidden");
