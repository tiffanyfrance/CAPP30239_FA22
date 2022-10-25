Promise.all([
    d3.json('climate-jan.json'),
    d3.json('climate-feb.json'),
    d3.json('climate-mar.json')
  ]).then((data) => {
  
    console.log(data)
  
    const height = 400,
      width = 600,
      margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
      padding = 1;
  
    const x = d3.scaleLinear()
      .domain([0, 70])
      .range([margin.left, width - margin.right])
      .nice();
  
    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom, margin.top])
      .nice();
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom + 5})`)
      .call(d3.axisBottom(x));
  
    const binGroups = svg.append("g");
  
    function updateChart(i) {
      const bins = d3.bin().thresholds(10).value(d => d.average)(data[i]);

      binGroups.selectAll("g")
        .data(bins, d => d.x0)
        .join(
          enter => {
            let g = enter.append("g")
  
            g.append("rect")
              .attr("x", d => x(d.x0) + padding / 2)
              .attr("y", height - margin.bottom)
              .attr("width", d => x(d.x1) - x(d.x0) - padding)
              .attr("height", 0)
              .attr("fill", "steelblue")
              .transition()
              .duration(750)
              .attr("y", d => y(d.length))
              .attr("height", d => height - margin.bottom - y(d.length));
  
            g.append("text")
              .text(d => d.length)
              .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
              .attr("y", height - margin.bottom - 5)
              .attr("text-anchor", "middle")
              .attr("fill", "#333")
              .transition()
              .duration(750)
              .attr("y", d => y(d.length) - 5);
          },
          update => {
            update.select("rect")
              .transition()
              .duration(750)
              .attr("y", d => y(d.length))
              .attr("height", d => height - margin.bottom - y(d.length));
  
            update.select("text")
              .text(d => d.length)
              .transition()
              .duration(750)
              .attr("y", d => y(d.length) - 5);
          },
          exit => {
            exit.select("rect")
              .transition()
              .duration(750)
              .attr("height", 0)
              .attr("y", height - margin.bottom);
  
            exit.select("text")
              .text("");
  
            exit.transition()
              .duration(750)
              .remove();
          }
        );
    }
  
    updateChart(0);
  
    d3.selectAll("select")
      .on("change", function (event) {
        const i = parseInt(event.target.value);
        updateChart(i);
      });
  });