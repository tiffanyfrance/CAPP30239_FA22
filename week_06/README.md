## Parts of a Whole
Studying the composition and part-to-whole relationships within data gets much easier with the chart types collected in this section. The main rule here is that a total, taken as 100%, occupies the whole chart.Each constituent part (segment) of the chart represents data points that contribute to the whole and amount to 100% in total. - <a href="https://www.anychart.com/chartopedia/usage-type/chart-to-show-part-of-the-whole/">Read more</a>

### See also
- <a href="https://observablehq.com/@d3/stacked-bar-chart">Stacked Bar Chart</a>
- <a href="https://observablehq.com/@d3/stacked-normalized-horizontal-bar">Stacked Bar Chart Horizontal, Normalized
- <a href="https://observablehq.com/@d3/stacked-area-chart">Stacked Area Chart</a>
- <a href="https://observablehq.com/@d3/normalized-stacked-area-chart">Stacked Area Chart, Normalized</a>
- <a href="https://observablehq.com/@d3/streamgraph">Streamgraph</a>


### Documentation
- <a href="https://www.d3indepth.com/shapes/">D3 In Depth - Shapes</a>
- <a href="https://github.com/d3/d3-shape">D3 Shapes API</a>
    - <a href="https://github.com/d3/d3-shape#arcs">d3.arc()</a>
    - <a href="https://github.com/d3/d3-shape#arcs">d3.pie()</a>
- <a href="https://observablehq.com/@d3/selection-join">Data Joins</a> 

### Pie Chart Label Overlapping Solutions
There are several solutions for dealing with overlapping
labels on a pie chart. Below are a few, but feel free to 
browse the web for other solutions. <b>Note:</b> if your labels are overlapping
it may be better to consider a different chart type than a pie/ring. 
The pie/ring can be hard to read and compare when the pieces are small.
- <a href="https://observablehq.com/@mast4461/d3-donut-chart-labels">Labels on lines</a>
```
/* ------- TEXT LABELS -------*/

    const text = g
      .select(".labels")
      .selectAll("text")
      .data(pie(data), key);

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function(d) {
        return d.data.label;
      })
      .merge(text)
      .transition()
      .duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start" : "end";
        };
      });

    text.exit().remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    const polyline = g
      .select(".lines")
      .selectAll("polyline")
      .data(pie(data), key);

    polyline
      .join("polyline")
      .transition()
      .duration(1000)
      .attrTween("points", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit().remove();
```
- <a href="http://jsfiddle.net/2uT7F/">Rotate labels</a>
```
var getAngle = function (d) {
      return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
  };
  
  g.append("text")
      .attr("transform", function(d) { 
              return "translate(" + pos.centroid(d) + ") " +
                      "rotate(" + getAngle(d) + ")"; }) 
      .attr("dy", 5) 
      .style("text-anchor", "start")
      .text(function(d) { return d.data.label; });
```
- <a href="https://stackoverflow.com/a/19801529">Hide overlapping labels</a>

### Concepts
- symbols
- voronoi
- data joins
- multiple charts on a page
- loading multiple data sets
- voronoi
- ring chart
- reusable functions
- small multiples