
let width = 1000,
  height = 500,
  gWidth = width/3;

let svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let rScale = d3.scaleLinear()
  .range([5,25]);

d3.csv("data.csv").then(data => {
  let colors = ['#B42F90', '#16B1AC', '#FF0909', '#6985DD', '#0BE304', '#9A303D', '#979883', '#FF09D3', '#FF7C09', '#EFE71F', '#7FA25A', '#7A57C7', '#804C13', '#C2C757', '#1F52EF'];
  
  // console.log(data)
  
  let result = d3.group(data, d => d.period);

  // console.log(result)

  rScale.domain(d3.extent(data, d => d.rating));

  let i = 0;
  for (let [a, b] of result) {
    console.log(a)
  
    let items = [];

    for (let j = 0; j < b.length; j++) {
      let newObj = {
        x: (gWidth * (0.5 + i)),
        y: height/2,
      }
      newObj.node = b[j].author;
      newObj.rating = b[j].rating;
      items.push(newObj);
    }

    let color = colors[i];

    buildChart(a, i, color, items);

    i++;
  }
});

const tooltip = d3.select("body").append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

function buildChart(a, i, color, nodes) {
  let simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(100)) //strength
    .force('x', d3.forceX().x(gWidth * (0.5 + i)))
    .force('y', d3.forceY().y(nodes[i].y)) 
    .force("collision", d3.forceCollide().radius(d => (rScale(d.rating))));

  let g = svg.append("g");

  simulation.on("tick", () => {
    g.selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("r", d => (rScale(d.rating)))
      .attr("fill", color)
      .attr("opacity", 0.75)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 1);
        tooltip
          .style("visibility", "visible")
          .html(`${d.node}<br />${d.rating}`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 0.75);
        tooltip.style("visibility", "hidden");
      })
  })

  g.append("text")
    .text(a)
    .attr("x",gWidth * (0.5 + i))
    .attr("y", 100)
    .attr("text-anchor","middle")
    .style("text-transform","capitalize")
    .style("font-weight","bold");

  for (let i = 0; i < 20; i++) {
    simulation.tick()
  }

};
