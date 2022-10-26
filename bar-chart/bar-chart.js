//Select svg element that is our 'canvas'
const svg = d3.select('svg');

//Same thing to use parseFloat and +, makes string number
const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

// We are making a render function to later use with our data
const render = data => {
    // Here we are setting our values, margins and innerwidths
    const xValue = d => d.population
    const yValue = d => d.country
    // Margin is giving us space for labels etc,
    const margin = {top: 20, right: 40, bottom: 20, left: 100}
    /* Inner width is the space that the chart will use, 
    that says the width without the margin */
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    /* Here we are making the xScale
        which is the size of our canvas on the x-axis.
        We use domain to say, these are the values that
        we can use.
        The range then makes these values fit on the canvas.
        For example our values are between 0 and 100 000.
        Our canvas is 1000px, then the value 100 000 will be
        1000px, the value 50 000 is 500px etc
    */
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
    
    /*
        The yScale is similar but much diffrent,
        here we are mapping each bar to go  to the right
        height, also using the same technique with domain and range
        But also adding some padding between the bars
    */
    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    
    /* 
        Above we made a group element for everything to be in
        Beneth we are actually creating the labels and moving 
    */
    g.append('g').call(d3.axisLeft(yScale))
    g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${innerHeight})`)

    /* 
        Here we are creating rects that we give the data
        Then we are setting the correct y value from the yScale
        we made before
        Then we are making the correct width and height using our scales
    */

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
}

/* 
    Then we are getting our data and rendering using
    the function we made above us
*/
d3.csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000
    })
    render(data)
})