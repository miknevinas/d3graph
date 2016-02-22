showChart();

function showChart() {

    var barData = [{
        'x': 'DM1',
        'y': 5
    }, {
        'x': 'DM2',
        'y': 20
    },  {
        'x': 'DM3',
        'y': 50
    }, {
        'x': 'DM4',
        'y': 40
    }, {
        'x': 'DM5',
        'y': 70
    }, {
        'x': 'DM6',
        'y': 5
    }, {
        'x': 'DM7',
        'y': 60
    }, {
        'x': 'DM8',
        'y': 90
    }];

    var chart = d3.select('#chart'),
        margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        width = 1000 - margins.left - margins.right,
        height = 500 - margins.top - margins.bottom,
        xRange = d3.scale.ordinal().rangeRoundBands([margins.left, width - margins.right], 0.1).domain(barData.map(function (d) {
            return d.x;
        })),

        yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0,100]),

        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true),

        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
            .orient("left")
            .tickSubdivide(true);


    chart.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
        .call(xAxis)
        .append("text")
        .attr("x", width / 2)
        .attr("y", height - 420)
        .attr("dx", ".71em")
        .style("text-anchor", "middle")
        .text("Cohort");

    chart.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (margins.left) + ',0)')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -45)
        .attr("x",0 - (height / 2))
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Employment Rate %");

    chart.selectAll('rect')
        .data(barData)
        .enter()
        .append('rect')
        .attr('x', function (d) {
        return xRange(d.x);
    })
        .attr('y', function (d) {
        return yRange(d.y);
    })
        .attr('width', xRange.rangeBand())
        .attr('height', function (d) {
        return ((height - margins.bottom) - yRange(d.y));
    })
        .attr('fill', 'grey')
        .on('mouseover',function(d){
        d3.select(this)
            .attr('fill','orange');
    })
        .on('mouseout',function(d){
        d3.select(this)
            .attr('fill','grey');
    });

}