class Bar extends React.Component {
  componentDidMount(){
    $.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (data)=>{
      let info=data.data;
      let info1=data;
      let prev;//to set up different color of gdp bar;
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
let duration = 500, delay = 50;

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
           //.attr('x', (d,i)=>i*(w/info.length))//without chart animation/grows to bottom;
           .attr('x', 0)//make chart grow to top and from left
           //.attr('y', (d) => yScale(d[1]))//without chart animation/grows to bottom;
           .attr('y', h)//make chart grows to top;//make chart grow to top and from left
           .attr('width', w/info.length)
           //.attr('height', (d)=>h-yScale(d[1]))//without chart animation;
           .attr('height', 0)//make chart grows to bottom;
           //.attr('height', 0)//make chart grow to top and from left
           //.attr('fill', '#2b5797')
           .attr('fill', d=>{
            if(prev>d[1]){
              prev=d[1]; return '#ee1111';
            } else {
              prev=d[1]; return '#00a300';
            }
           })
           .attr('stroke', '#2b5797')
           
      .on('mouseover', function(d){

            let year=d[0].slice(0,4);
            let month=Number(d[0].slice(5,7))-1;
            d3.select(this)
              //.attr('fill', '#b2b2b2');
              .style('opacity', '0.3')

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
            .style('opacity', '1')
             // .attr('fill', '#2b5797');
            d3.select('.tooltip1')
              .classed('hidden', true);
           })
           .transition()
           .duration( function () { return duration += 25; })
        //.ease(d3.easeElasticInOut)//cause height errors in console;
        .ease((...args) => {
          let ease = d3.easeElasticInOut(...args);
          return ease < 0 ? 0 : ease;
        })
        //.ease(d3.easeBounceOut)
       .delay( function () { return delay += 3; })
      //.duration(10000)
      //.ease(d3.easeExpOut)
      //.delay(500)
      //.attr("x", (d,i)=>i*(w/info.length))//make chart grows to bottom;
      .attr("x", (d,i)=>i*(w/info.length))//make chart grows to top and bottom;
     // .attr("y", (d)=>yScale(d[1]))//make chart grows to top;
     .attr("y", (d)=>yScale(d[1]))//make chart grow to top and from left
      .attr("height", (d)=>h-yScale(d[1]));//make chart grows to top and bottom;
           //.append('svg:title')//simple tooltip
           //.text(d=>d[1]);//simple tooltip

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
      <div className='chart'>
      </div>     
    )
  }
}

ReactDOM.render(<Bar/>,
  document.getElementById('app'));
