//Select svg element that is our 'canvas'
const svg = d3.select('svg');

//Same thing to use parseFloat and +, makes string number
const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

// This document is kind of the same as Bar Chart but with some tweaks
const render = data => {
    const xValue = d => d.population
    const yValue = d => d.country
    const margin = {top: 50, right: 40, bottom: 77, left: 180}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
    
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    
    /* 
        Here we are making a tick format which makes
        our number go from 800,000,000 to 800M
        We also replace G which is the standard letter
        for billion with B
    */
    const xAxisTickFormat = number => 
        d3.format('.3s')(number)
            .replace('G', 'B')

    /* 
        Then we apply the tickformat and also making
        the ticks go all the way up, making the lines that
        appear over the numbers
        This makes for much easier readability
    */
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)
    /* 
        On the Y-axis we actually remove the tick lines
        because it makes it look cleaner
    */
    g.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')
            .remove()

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)

    /*
        We remove the domain to make it look cleaner
        The domain is the line that separates the
        number lables from the chart
    */
    xAxisG.select('.domain').remove()

    // Here we make the poulation label
    // We style it in CSS
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 60)
        .attr('x', innerWidth/2)
        .text('Population')

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())

    // Here we make the title
    // Also styled in CSS
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text('Top 10 Most Populous Countries')
}

d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000
    })
    render(data)
})