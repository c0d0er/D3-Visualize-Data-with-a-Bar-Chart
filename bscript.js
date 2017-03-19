class Bar extends React.Component {
  componentDidMount(){
    $.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (data)=>{
      let info=data.data;
      let info1=data;
      const margin = {
        top: 60,
        right: 80,
        bottom: 80,
        left: 80
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
           .attr('fill', '#2b5797')
           .attr('stroke', '#2b5797')
      .on('mouseover', function(d){

            let year=d[0].slice(0,4);
            let month=Number(d[0].slice(5,7))-1;
            d3.select(this)
              //.transition(250)
              .attr('fill', '#b2b2b2');

div.html('<div class="tooltip1"><span class="gdp">'+dollarSign(d[1])+' Billion</span></span><br><span class="year">'
  +year+'-'+months[month]+'</span></div>')
          .style('display', 'inline')
          .style("left", (d3.event.clientX+5) + "px")
          .style("top", (d3.event.clientY-50) + "px")
          .style('position', 'absolute')
          .classed('hidden', false);
           })
           .on('mouseout', function(){
            d3.select(this)
              //.transition(250)
              .attr('fill', '#2b5797');
            d3.select('.tooltip1')
              .classed('hidden', true);

           });
           //.append('svg:title')
           //.text(d=>d[1]);

        svg
        .append('g')
         .attr('class', 'axis')
           .attr('transform', 'translate(0,'+h+')')
           .style('font-size', '15px')
           .call(d3.axisBottom(yearScale));

        svg.append("text")
        .attr("transform", "translate(" + (w / 2) + " ," + (-17) + ")")
        .style("text-anchor", "middle")
                .attr('fill', '#2d89ef')
                .style('font-size', '2.2em')
        .text("Gross Domestic Product (U.S.)");

        svg.append("text")
        .attr("transform", "translate(" + (w / 2) + " ," + (h+45) + ")")
        .style('font-size', '0.8em')
        .style("text-anchor", "middle")
        .text(info1.description.slice(0,info1.description.length/2+61));

        svg.append('a')
        .attr('xlink:href', info1.description.slice(info1.description.length/2+63, info1.description.length-1))
        .attr('target', '_blank')
        .append("text")
        .attr("transform", "translate(" + (w / 2) + " ," + (h+60) + ")")
        .style('font-size', '0.8em')
        .style("text-anchor", "middle")
        .text(info1.description.slice(info1.description.length/2+61))

         //.on('click', ()=>{
         // window.open(info1.description.slice(info1.description.length/2+63, info1.description.length-1))
       // });

        let concatFormat = (format, suffix) => 
            (d) => d3.format(format)(d) + suffix;

 
        
        svg.append('g')
        .attr('class', 'axis')
           .attr('transform', 'translate('+0+',0)')
           .style('font-size', '15px')
           .call(d3.axisLeft(yScale)
                   //.ticks(20)
                   .tickFormat(concatFormat('$,', 'B'))
                   //.tickFormat(d3.format('$,'))
                   );

         svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 )
        .attr("x",0)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("Gross Domestic Product, USA");
    })
  }

  render (){
    return (
      <div className='main'>
      <div className='chart'>
      </div>
      <div className='notes'>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<Bar/>,
  document.getElementById('app'));
