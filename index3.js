
window.onload = function(){
	LinePlot();
	ScatterPlot();
	//ChoroplethPlot();
	test({ name:"" });
	BubblePlot();
	pie();
	scatter3dPlot();
	ChoroplethPlot2();
	//Test2();
}


function test(e)
{
	console.log(e.name);
	var line_xlable = "", line_ylable = "", bar_xlable = "", bar_ylable = "", pie_lable1 = "", pie_lable2 = "";
	var line_x = [], line_y = [], bar_x = [], bar_y = [];
	var color = [], r = 80, g = 20, b = 30;
	switch(e.name)
	{
		case "Recovered":
			line_xlable = 'Date';
			line_ylable = 'New recovered';
			bar_ylable = 'TotalRecovered';
			bar_xlable = 'Country/Region';	
			pie_lable1 = 'Country/Region';
			pie_lable2 = "TotalRecovered";
			break;
		
		case "Cases":
			line_xlable = 'Date';
			line_ylable = 'New cases';
			bar_ylable = 'TotalCases';
			bar_xlable = 'Country/Region';
			pie_lable1 = 'Country/Region';
			pie_lable2 = "TotalCases";
			break;

		case "Deaths":
			line_xlable = 'Date';
			line_ylable = 'New deaths';
			bar_ylable = 'TotalDeaths';
			bar_xlable = 'Country/Region';
			pie_lable1 = 'Country/Region';
			pie_lable2 = "TotalDeaths";
			break;
			
		case "Total Tests":
			line_xlable = 'Date';
			line_ylable = 'New deaths';
			bar_ylable = 'TotalTests';
			bar_xlable = 'Country/Region';
			pie_lable1 = 'Country/Region';
			pie_lable2 = "TotalTests";
			break;
		default:
			line_xlable = 'Date';
			line_ylable = 'New recovered';
			bar_ylable = 'TotalRecovered';
			bar_xlable = 'Country/Region';
			break;
	}
	
	Plotly.d3.csv("full_grouped.csv", 
		function(data)
		{
			for(var i = 0; i < data.length; i++)
			{
				var row = data[i]
				if(row['Country/Region'] == 'India')
				{					
					line_x.push( row[line_xlable] )
					line_y.push( row[line_ylable] )
				}
			}
			
			var trace1 = {
			  x: line_x,
			  y: line_y,			  
			  mode: 'lines'
			};
			
			var phases = ['2020-03-25', '2020-04-15', '2020-05-04', '2020-05-18'];
			var layout_shapes = [], layout_annotations = [];
			for(var i = 0 ; i < phases.length; i++ ){
				layout_shapes.push(
					{
						type: 'rect',						
						xref: 'x',						
						yref: 'y',
						x0: phases[i],
						y0: 0,
						x1: phases[i],
						y1: Math.max.apply(Math, line_y),
						fillcolor: '#d3d3d3',
						opacity: 0.5,
						line: {
							width: 2
						}
					});
				layout_annotations.push(
					{
					  x: phases[i],
					  y: Math.max.apply(Math, line_y),
					  xref: 'x',
					  text: 'Phase' + (i+1),
					  showarrow: true,
					  arrowhead: 7,
					  ax: -30,
					  ay: -40
					}
					
				);
			}
			var layout = { 
				title: 'comparing the /Million of Affected Countries.',
				xaxis: { title: { text: line_xlable } },
				yaxis: { title: { text: line_ylable } },
				shapes : layout_shapes, 
				annotations : layout_annotations  
			}
			Plotly.newPlot('LinePlot', [trace1], layout);
			
		});
	
	Plotly.d3.csv("worldometer_data.csv", 
		function(data)
		{
			for (var i=0; i < 10; i++) {				
				row = data[i];
				bar_x.push( row[bar_xlable] )
				bar_y.push( row[bar_ylable] )
				r+=50;
				g+=20;
				b+=10;
				color.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
			}
			var bar_Data = [{
					x: bar_x,
					y: bar_y,
					type: 'bar',
					marker: {
					  color: color
					},
				}];
			var bar_Layout = {
				title: 'comparing the ' + bar_ylable + '/Million of Affected Countries.',
				xaxis: { title: { text: bar_xlable } },
				yaxis: { title: { text: bar_ylable } },
				showlegend: false,				
			};
			Plotly.newPlot('BarPlot', bar_Data, bar_Layout);	
		}		
	);

	Plotly.d3.csv("worldometer_data.csv", 
		function(data)
		{
			var a = [],  b = []
			for (var i=0; i <20; i++) 
			{
				row = data[i];
				a.push( row[pie_lable1] );
				b.push( row[pie_lable2] );
			}
			var pie1= [{
				values: b,
				labels: a,
				type: 'pie'
			}];

			var layoutpie1 = {
				title: 'Percentange of '+ pie_lable2 +' in 20 Most affected country',
				xaxis: { title: 'x Axis' },
				yaxis: { title: 'y Axis' }
			};
			
			Plotly.newPlot('Pie1', pie1,layoutpie1);
		});
		
	
}
	

function BubblePlot()
{
	Plotly.d3.csv("worldometer_data.csv", 
		function(data)
		{ 
			var Deaths = [], Cases=[], Population=[], TextForBubble = [], Continent = [];
			
			for (var i=0; i < data.length; i++) {
				var str = '';
				row = data[i];				
				Deaths.push( row['TotalDeaths'] )
				Cases.push( row['TotalCases'] )
				Population.push( row['Population'] )
				str = row['Country/Region'] + ' </br> Continent : ' + row['Continent'] + '</br> TotalCases : ' + row['TotalCases'] + '</br> TotalDeaths : ' + row['TotalDeaths'];
				Continent.push( row['Continent'] )				
				TextForBubble.push(str)
			}
			
			var trace = {
				type: 'scatter',
				mode: 'markers',
				x: Cases,
				y: Deaths,		
				text : TextForBubble,				
				marker: {
					size: Population,					
					sizeref: 2.0 * Math.max(...Population) / (40**2),
					sizemode: 'area'
				},
				transforms: [{
					type: 'groupby',
					groups: Continent,
					styles: [
						{target: 'North America', value: {marker: {color: 'rgb(93, 164, 214)'}}},
						{target: 'South America', value: {marker: {color: 'rgb(255, 144, 14)'}}},
						{target: 'Asia', 		  value: {marker: {color: 'rgb(44, 160, 101)'}}},
						{target: 'Europe', 		  value: {marker: {color: 'rgb(255, 65, 54)'}}},
						{target: 'Africa', 		  value: {marker: {color: 'rgb(31, 119, 180)'}}}
					]
				}]
				
			};
			var layout = {
				title: 'Bubble Chart for Total Cases Vs Total Deaths of Affected Countries',
				xaxis: { title: { text: 'Total Cases' } },
				yaxis: { title: { text: 'Total Deaths' } }
			};
		
			console.log("is find")
			Plotly.newPlot('BubblePlot', [trace], layout);
		}		
	);
	
}

function ChoroplethPlot()
{
	
	Plotly.d3.csv('https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key];
        });
    }
	console.log("yes")
    var data = [{
        type: 'choropleth',
        locations: unpack(rows, 'Country'),
		locationmode : 'country names',
        z: unpack(rows, 'Confirmed'),
        text: unpack(rows, 'Country'),
        colorscale: [
            [0, 'rgb(5, 10, 172)'],
            [0.35, 'rgb(40, 60, 190)'],
            [0.5, 'rgb(70, 100, 245)'],
            [0.6, 'rgb(90, 120, 245)'],
            [0.7, 'rgb(106, 137, 247)'],
            [1, 'rgb(220, 220, 220)']
        ],
        autocolorscale: false,
        reversescale: true,
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.5
            }
        },
        tick0: 0,
        zmin: 0,
        dtick: 1000,
        colorbar: {
            autotic: false,
            tickprefix: '$',
            len: 0.8,
            x: 1,
            y: 0.6
        }
    }];

    var layout = {        
        geo: {
            showframe: false,
            showcoastlines: false,
            scope: 'europe',
            projection: {
                type: 'mercator',
            },

        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 2
        }
    };
    Plotly.plot('ChoroplethMapofWorld', data, { showLink: false });
	});	
}

function LinePlot()
{
	Plotly.d3.csv("full_grouped.csv", 
		function(data)
		{ 			
			var dates = [], NewCases = [];
			for(var i = 0; i < data.length; i++)
			{
				var row = data[i]
				if(row['Country/Region'] == 'India')
				{					
					dates.push( row['Date'] )
					NewCases.push( row['New cases'] )
				}
			}
			
			var trace1 = {
			  x: dates,
			  y: NewCases,			  
			  mode: 'lines'
			};
			
			var layout = {
				shapes: [					
					{
						type: 'rect',						
						xref: 'x',						
						yref: 'y',
						x0: '2020-03-25',
						y0: 0,
						x1: '2020-03-25',
						y1: 50000,
						fillcolor: '#d3d3d3',
						opacity: 0.5,
						line: {
							width: 2
						}
					},
					{
						type: 'rect',						
						xref: 'x',						
						yref: 'y',
						x0: '2020-04-15',
						y0: 0,
						x1: '2020-04-15',
						y1: 50000,
						fillcolor: '#d3d3d3',
						opacity: 0.5,
						line: {
							width: 2
						}
					},
					{
						type: 'rect',						
						xref: 'x',						
						yref: 'y',
						x0: '2020-05-04',
						y0: 0,
						x1: '2020-05-04',
						y1: 50000,
						fillcolor: '#d3d3d3',
						opacity: 0.5,
						line: {
							width: 2
						}
					},
					{
						type: 'rect',						
						xref: 'x',						
						yref: 'y',
						x0: '2020-05-18',
						y0: 0,
						x1: '2020-05-18',
						y1: 50000,
						fillcolor: '#d3d3d3',
						opacity: 0.5,
						line: {
							width: 2
						}
					},
					
					],				
				annotations: [
					{
					  x: '2020-03-25',	
					  y:50000,
					  xref: 'x',
					  text: 'Phase 1',
					  showarrow: true,
					  arrowhead: 7,
					  ax: -30,
					  ay: -40
					},
					{
					  x: '2020-04-15',
					  y:50000,
					  xref: 'x',					  
					  text: 'Phase 2',
					  showarrow: true,
					  arrowhead: 7,
					  ax: -30,
					  ay: -40
					},
					{
					  x: '2020-05-04',
					  y:50000,
					  xref: 'x',					  
					  text: 'Phase 3',
					  showarrow: true,
					  arrowhead: 7,
					  ax: -30,
					  ay: -40
					},
					{
					  x: '2020-05-18',
					  y:50000,
					  xref: 'x',					  
					  text: 'Phase 4',
					  showarrow: true,
					  arrowhead: 7,
					  ax: -30,
					  ay: -40
					}
				  ]
				};

			Plotly.newPlot('LinePlot', [trace1], layout);
		
		}		
	);
}

function ScatterPlot()
{
	Plotly.d3.csv("full_grouped.csv", 
		function(data)
		{ 
			var active = [], Confrimed = [], newCases = [], deaths = [], recovery = [];
			for(var i = 0; i < data.length; i++)
			{
				var row = data[i]
				if(row['Country/Region'] == 'India')
				{					
					Confrimed.push( row['Confirmed'] )
					active.push( row['Active'] )
					newCases.push( row['New cases'] )
					deaths.push( row['Deaths'] )
					recovery.push( row['Recovered'] )
				}
			}
			
			var trace1 = {
				x: Confrimed,
				y: active,
				mode: 'markers',
				type: 'scatter',
				marker: {
					color: newCases,
					colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']],
				},
				sizemode: 'area',
				showscale: true,
				colorbar: {
				  thickness: 10,
				  y: 0.5,
				  ypad: 0,
				  title: 'Tree Density',
				  titleside: 'bottom',
				  outlinewidth: 1,
				  outlinecolor: 'black',
				  tickfont: {
					family: 'Lato',
					size: 14,
					color: 'green'
				  }
				}
			};
			
			var trace2 = {
				x: deaths,
				y: recovery,
				mode: 'markers',
				type: 'scatter',
				marker: {
					color: newCases,
					colorscale: [[0, 'rgb(80, 20, 130)'], [1, 'rgb(180, 220, 0)']],
				},
				sizemode: 'area',
				showscale: true,
				colorbar: {
				  thickness: 10,
				  y: 0.5,
				  ypad: 0,
				  title: 'Tree Density',
				  titleside: 'bottom',
				  outlinewidth: 1,
				  outlinecolor: 'black',
				  tickfont: {
					family: 'Lato',
					size: 14,
					color: 'green'
				  }
				}
			};
			
			var layout1 = {
				title: 'Scatter Plot for Confirmed v Active Cases', 
				showlegend: false,
				xaxis: { title: { text: 'Confirmed' } },
				yaxis: { title: { text: 'Active Cases' } }
			};
			
			var layout2 = {
				title: 'Scatter Plot for Deaths v Recovery', 
				showlegend: false,
				xaxis: { title: { text: 'Deaths' } },
				yaxis: { title: { text: 'Recovery' } }
			};
			
			Plotly.newPlot('ScatterPlot1', [trace1], layout1);
			Plotly.newPlot('ScatterPlot2', [trace2], layout2);
		}
	);
}

function pie()
{
	Plotly.d3.csv("worldometer_data.csv", 
		function(data)
		{
			var Country_20 = [], Deaths_20 = [];
			for (var i=0; i <20; i++) 
			{
				row = data[i];
				Country_20.push( row['Country/Region'] );
				Deaths_20.push( row['TotalDeaths'] );
			}
			var pie1= [{
				values: Deaths_20,
				labels: Country_20,
				type: 'pie'
			}];

			var layoutpie1 = {
				title: 'Percentange of Total Deaths in 20 Most affected country',
				xaxis: { title: 'x Axis' },
				yaxis: { title: 'y Axis' }
			};
			
			Plotly.newPlot('Pie1', pie1,layoutpie1);
		}
	)
};

function scatter3dPlot()
{
	Plotly.d3.csv("worldometer_data.csv", 
		function(data)
		{
			var Cases_20 = [], Deaths_20 = [], Recovered_20 = [], color = [];
			var r = 10, g =120, b=70;
			for (var i=0; i <20; i++) 
			{
				row = data[i];
				Cases_20.push( row['TotalCases'] );
				Deaths_20.push( row['TotalDeaths'] );
				Recovered_20.push( row['TotalRecovered'] );
				r+=30;
				g+=10;
				b+=50;
				color.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
			}
						
			var scatter = [{
				x: Cases_20,
				y: Deaths_20,
				z: Recovered_20,
				mode: 'markers',
				colorByPoint: true,
				marker:{
					color: color
				},
				type: 'scatter3d'
			}];
  
			var layoutscatter3d = { 
				title: 'Scatter3d of TotalCases, TotalDeaths, TotalRecovered for top 20 country',
				xaxis: { title: { text: 'TotalCases' } },
				yaxis: { title: { text: 'TotalDeaths' } },
				yaxis: { title: { text: 'TotalRecovered' } }
			}
			
			
			Plotly.newPlot('scatter3dPlot', scatter,layoutscatter3d); 
		}
	)    
}


function filter_and_unpack(rows, key, date) 
{
	return rows.filter(row => row['Date'] == date).map(row => row[key])
}

function unpack(rows, key) {
        return rows.map(function(row) {
            return row[key];
        });
    }


function ChoroplethPlot2()
{
	Plotly.d3.csv('https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv', 
		function(csvdata)
		{			
			var dates = unpack(csvdata, 'Date');
			var uniqueDates = dates.filter((item, i, ar) => ar.indexOf(item) === i);
			var frames = [], slider_steps = [];
			
			for(var i = 0; i < uniqueDates.length; i++)
			{	
				var date = uniqueDates[i];		
				var locations = filter_and_unpack(csvdata, "Country", date);
				var z  = filter_and_unpack(csvdata, "Confirmed", date);
				frames.push( 
					{
						data: [{z: z, locations: locations}],
						name: date
					});
				slider_steps.push ({
					label: date.toString(),
					method: "animate",
					args: [[date], {
						mode: "immediate",
						transition: {duration: 300},
						frame: {duration: 300}
					  }
					]
				})
			}
			
			console.log(frames)
			
			var data = [{
				  type: 'choropleth',
				  locationmode : 'country names',
				  locations: frames[0].data[0].locations,
				  z: frames[0].data[0].z,
				  text: frames[0].data[0].locations,
				zauto: false,
				  zmin: 30,
				  zmax: 90
			}];
			
			var layout = {
				title: 'Confirmed case - World',
				geo:{					
					scope: 'world',
					countrycolor: 'rgb(255, 255, 255)',
					showland: true,
					landcolor: 'rgb(217, 217, 217)',
					showlakes: true,
					lakecolor: 'rgb(255, 255, 255)',
					subunitcolor: 'rgb(255, 255, 255)',
					lonaxis: {},
					lataxis: {}
				},
				updatemenus: [{
				  x: 0.1,
				  y: 0,
				  yanchor: "top",
				  xanchor: "right",
				  showactive: false,
				  direction: "left",
				  type: "buttons",
				  pad: {"t": 87, "r": 10},
				  buttons: [{
					method: "animate",
					args: [null, 
						{ 
							fromcurrent: true,
							transition: {
								duration: 200,
							},
						frame: {
							duration: 500
						}
					}],
					label: "Play"
				  }, {
					method: "animate",
					args: [
					  [null],
					  {
						mode: "immediate",
						transition: {
						  duration: 0
						},
						frame: {
						  duration: 0
						}
					  }
					],
					label: "Pause"
				  }]
				}],
				sliders: [{
				  active: 0,
				  steps: slider_steps,
				  x: 0.1,
				  len: 0.9,
				  xanchor: "left",
				  y: 0,
				  yanchor: "top",
				  pad: {t: 50, b: 10},
				  currentvalue: {
					visible: true,
					prefix: "Date:",
					xanchor: "right",
					font: {
					  size: 20,
					  color: "#666"
					}
				  },
				  transition: {
					duration: 300,
					easing: "cubic-in-out"
				  }
				}]
			};
			
			Plotly.newPlot('ChoroplethMapofWorld', data, layout).then(function() {
						Plotly.addFrames('ChoroplethMapofWorld', frames);
					  });
		}
	);
}
