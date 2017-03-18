class Bar extends React.Component {
  componentDidMount(){
    $.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (data)=>{
      let info=data.data;
      const margin = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
      };
          let w=1000-margin.right-margin.left;
    let h=500-margin.top-margin.bottom;
    let dollarSign=d3.format('$,.2f');
    const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


console.log(info)

    /*let xScale=d3.scaleLinear()
                 .domain([0, d3.max(info, d=>d[1])])
                 //.range([padding, w-padding*2]);
                 .range([padding, w-40]);*/

    let yScale=d3.scaleLinear()
                 .domain([0, d3.max(info, d=>d[1])])
                 .range([h, 0]);

    let minTime=new Date(info[0][0]); 
    let maxTime=new Date(info[info.length-1][0]);
    let yearScale=d3.scaleTime()
                    .domain([minTime, maxTime])
                    .range([0, w]);

    let div=d3.select('.chart').append('div');
     
    let svg=d3.select('.chart')
              .append('svg')
              .attr('width', w+margin.right+margin.left)
              .attr('height', h+margin.top+margin.bottom)
              .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll('rect')
           .data(info)
           .enter()
           .append('rect')
           .attr('x', (d,i)=>i*(w/info.length))
           .attr('y', (d)=>yScale(d[1]))
           .attr('width', w/info.length)
           .attr('height', (d)=>h-yScale(d[1]))
           .attr('fill', 'red')
      .on('mouseover', function(d){

            let year=d[0].slice(0,4);
            let month=Number(d[0].slice(5,7))-1;
            d3.select(this)
              //.transition(250)

              .attr('fill', 'orange');

div.html('<div class="tooltip"><span class="gdp">'+dollarSign(d[1])+' Billion</span></span><br><span class="year">'
  +year+'-'+months[month]+'</span></div>')
          .style('display', 'inline')
          .style("left", (d3.event.clientX+5) + "px")
          .style("top", (d3.event.clientY-50) + "px")
          .style('position', 'absolute')
          .classed('hidden', false);


           })
           .on('mouseout', function(){
            d3.select(this)
              //.transition()
              .attr('fill', 'red');
            d3.select('.gdp')
            .classed('hidden', true);
            d3.select('.year')
            .classed('hidden', true);

           });
           //.append('svg:title')
           //.text(d=>d[1]);



        svg
        .append('g')
         .attr('class', 'axis')
           .attr('transform', 'translate(0,'+h+')')
           .call(d3.axisBottom(yearScale));

        svg
        .append('g')
        .attr('class', 'axis')
           .attr('transform', 'translate('+0+',0)')
           .call(d3.axisLeft(yScale));
    })
  }

  render (){
    return (
      <div className='chart'>
      </div>
    )
  }
}

ReactDOM.render(<Bar/>,
  document.getElementById('app'));


    /*.gdp:hidden{
  display: none;
};

.year:hidden{
  display: none;
};

#tooltip.hidden {
        display: none;
}

#tooltip p {
        margin: 0;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 20px;
}
*/





