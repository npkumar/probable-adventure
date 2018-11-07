function getColor() {
    var colors = ['#fc677c', '#027b8d', '#01b7be', '#24dfdd'];
    return colors[Math.floor(Math.random() * colors.length)];
}
  
var dataset = {
    "children": [
        {"name":"Level", "level":50, "count":4319, "color": getColor()},
        {"name":"Level", "level":44, "count":3159, "color": getColor()},
        {"name":"Level", "level":22, "count":2583, "color": getColor()},
        {"name":"Level", "level":111, "count":2074, "color": getColor()},
        {"name":"Level", "level":101, "count":1894, "color": getColor()},
        {"name":"Level", "level":54, "count":1809, "color": getColor()},
        {"name":"Level", "level":49, "count":1713, "color": getColor()},
        {"name":"Level", "level":77, "count":1636, "color": getColor()},
        {"name":"Level", "level":83, "count":1566, "color": getColor()},
        {"name":"Level", "level":197, "count":1511, "color": getColor()}
    ]
};
  
var diameter = 500;
// var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
.size([diameter, diameter])
.padding(10);

var svg = d3.select("body")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
  
var nodes = d3.hierarchy(dataset)
    .sum(function(d) {
        return d.count;
    });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

// Adds a tooltip
node.append("title")
.text(function(d) {
    return d.data.name + " " + d.data.level + ": " + d.data.count;
});
  
// Add circles of set radius and fill color
node.append("circle")
.attr("r", function(d) {
    return d.r;
})
.style("fill", function(d,i) {
    // return color(i);
    return d.data.color;
});

// Top text
node.append("text")
    .attr("dy", "-1.2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.name;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
        return d.r / 4;
    })
    .attr("fill", "white");

// Middle text
node.append("text")
    .attr("dy", "0.4em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.level;
    })
        .attr("font-family",  "Arial", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", function(d){
        return d.r / 2;
    })
    .attr("fill", "white");

// Bottom text
node.append("text")
    .attr("dy", "2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.count;
    })
        .attr("font-family",  "Arial", "sans-serif")
        .attr("font-weight", "normal")
        .attr("font-size", function(d){
        return d.r / 4;
    })
    .attr("fill", "white");
  