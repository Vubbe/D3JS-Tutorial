//Select svg element that is our 'canvas'
const svg = d3.select('svg');

//Same thing to use parseFloat and +, makes string number
const height = parseFloat(svg.attr('height'));
const width = +svg.attr('width');

const g = svg
    .append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`)

//Create and add values to the circle
const circle = g
    .append('circle')
        .attr('r', height/2)
        .attr('fill', 'yellow')
        .attr('stroke', 'black')

//Setting our variables
const eyeSpacing = 100
const eyeYOffset = -70
const eyeRadius = 30
const eyebrowWidth = 70
const eyebrowHeight = 15
const eyebrowYOffset = -70

//Making an group for the eyes and moving them to position
const eyesG = g
    .append('g')
        .attr('transform', `translate(0, ${eyeYOffset})`)

// Making the left eye and moving it to position
const leftEye = eyesG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', -eyeSpacing)

// Same for the right eye
const rightEye = eyesG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeSpacing)

/* The Eyebrow group, we're are making the group to move 
    to have less code and move both eyebrows at the sametime
    which we also did with the eyes group.
    We are also adding a transition which runs on load
*/
const eyebrowsG = eyesG
    .append('g')
        .attr('transform', `translate(0, ${eyebrowYOffset})`);

    eyebrowsG
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyebrowYOffset - 50})`)
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyebrowYOffset})`)

// Same as for the eyes 
const leftEyebrow = eyebrowsG
    .append('rect')
        .attr('x', -eyeSpacing - eyebrowWidth / 2)
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight)

const rightEyebrow = eyebrowsG
    .append('rect')
        .attr('x', eyeSpacing - eyebrowWidth / 2)
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight)

/* Here we are making the mouth which actually
    uses a path element and d3.arc which makes it
    turnt
*/
const mouth = g
    .append('path')
        .attr('d', d3.arc()({
            innerRadius: 150,
            outerRadius: 170,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3/2
        }))
