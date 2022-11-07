/* Bar chart totals by gender */

d3.json("a3cleanedonly2015.json").then(data => {
    // Always start by console.logging the data
    console.log(data);

    // Create a new object to transform data
    let newData = [
        { "Gender": "Male", "Totals": 0 },
        { "Gender": "Female", "Totals": 0 },
        { "Gender": "Other", "Totals": 0 },
    ]

    for (let d of data) {
        if (d.Gender === "Male") {
            newData[0].Totals += 1; // newData[0] is Male (line 6)
        } else if (d.Gender === "Female") {
            newData[1].Totals += 1; // newData[1] is Female (line 10)
        } else {
            newData[2].Totals += 1; // newData[2] is Other (line 14)
        }
    };

    console.log(newData); // view transformed data

    /* Note: if you are matching on a more complex data point
       like race, you can also use the find function in js
       which is more condensed. See below */
    
    // let newData = [
    //     { race: "", count: 0 },
    //     { race: "Asian", count: 0 },
    //     { race: "Black", count: 0 },
    //     { race: "Hispanic", count: 0 },
    //     { race: "Native", count: 0 },
    //     { race: "Other", count: 0 },
    //     { race: "White", count: 0 },
    // ];

    // for(var d of data) {
    //      let nd = newData.find(nd => nd.race == d["Race"]);
    //      nd.count += 1;
    // }
    // console.log(newData)

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 
    
    let x = d3.scaleBand()
        .domain(newData.map(d => d.Gender)) // Use array from line 8 (newData) and Gender from newData
        .range([margin.left, width - margin.right]) 
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(newData, d => d.Totals)]).nice() // uses newData as data and Totals from newData
        .range([height - margin.bottom, margin.top]); 
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar")
        .append("g")
        .data(newData) // Update data to newData
        .join("g")
        .attr("class", "bar");

    bar.append("rect") 
        .attr("fill", "steelblue")
        .attr("x", d => x(d.Gender)) // Gender
        .attr("width", x.bandwidth()) 
        .attr("y", d => y(d.Totals)) // Totals
        .attr("height", d => y(0) - y(d.Totals)); // Totals
    
    bar.append('text') 
        .text(d => d.Totals) // Totals
        .attr('x', d => x(d.Gender) + (x.bandwidth()/2)) // Gender
        .attr('y', d => y(d.Totals) + 15) // Totals
        .attr('text-anchor', 'middle')
        .style('fill', 'white');

});