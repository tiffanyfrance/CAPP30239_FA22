// Chord diagram
function chord() {
  const height = 600,
    width = 600,
    margin = 20,
    innerRadius = (Math.min(width, height) / 2) - margin,
    outerRadius = innerRadius + 6;

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("transform", "rotate(-90)")
    .attr("style", "max-width: 100%; height: auto;");

  d3.csv("../degrees.csv").then((data) => {

    for (let d of data) {
      d.value = +d.value;
    }
    console.log(data)
    // This code returns ["Males", "Females", "Associate", "Bachelors", "Masters", "Doctors"];
    let arr1 = d3.map(data, d => d.source),
      arr2 = d3.map(data, d => d.target);

    console.log(arr1, arr2)
    let names = arr1.concat(arr2);
    // console.log(names)
    names = [...new Set(names)]; //spread syntax
    console.log(names)

    // This is an alternative way to do the same thing
    // let names = [
    //   ...new Set(data.map(d => d.source)),
    //   ...new Set(data.map(d => d.target))
    // ]; //spread syntax
    // console.log(names)

    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));

    for (const { source, target, value } of data) {
      matrix[index.get(source)][index.get(target)] = value;
    }

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    // const ribbon = d3.ribbonArrow()
    const ribbon = d3.ribbon()
      .radius(innerRadius - 0.5)
      .padAngle(1 / innerRadius);

    const chords = d3.chordDirected()
      .padAngle(12 / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)(matrix);

    // console.log(chords) //radian system
    // console.log(matrix)

    const color = d3.scaleOrdinal(names, [d3.schemeTableau10[4], d3.schemeTableau10[6], "#333", "#333", "#333", "#333"]);

    // svg.append("path")
    //   .attr("id", "text-id")
    //   .attr("fill", "none")
    //   .attr("d", d3.arc()({ outerRadius, startAngle: 0, endAngle: 2 * Math.PI }));

    // svg.append("g")
    //   .selectAll("g")
    //   .data(chords)
    //   .join("path")
    //   .attr("d", ribbon)
    //   .attr("fill", d => color(names[d.source.index]))
    //   .attr("fill-opacity", 0.75)
    //   .style("mix-blend-mode", "multiply")
    //   .on("mouseover", function() {
    //     d3.select(this)
    //       .attr("fill-opacity", 1);
    //   })
    //   .on("mouseout", function() {
    //     d3.select(this)
    //       .attr("fill-opacity", 0.75);
    //   })
    //   .on("click", function(e, d) {
    //     let str = `${names[d.source.index]} earned 
    //       ${d.source.value.toLocaleString()} ${names[d.target.index]} Degrees`;
    //     d3.select("h2")
    //       .html(str);
    //   })
    //   .append("title")
    //   .text(d => `${names[d.source.index]} earned ${d.source.value.toLocaleString()} ${names[d.target.index]} Degrees`);

    // svg.append("g")
    //   .selectAll("g")
    //   .data(chords.groups)
    //   .join("g")
    //   .call(g => g.append("path")
    //     .attr("d", arc)
    //     .attr("fill", d => color(names[d.index]))
    //     .attr("stroke", "#fff"))
    //   .call(g => g.append("text")
    //     .attr("dy", -3)
    //     .append("textPath")
    //     .attr("href", "#text-id")
    //     .attr("startOffset", d => d.startAngle * outerRadius)
    //     .text(d => names[d.index]))
    //     .attr("fill", d => color(names[d.index]) != "#ccc" ? color(names[d.index]) : "#666");
  });
}