
window.onload = function(){
  makeplot();
}
  
function makeplot() {
  Plotly.d3.csv("worldometer_data.csv", 
    function(data)
    { 
      processData(data) 
    }   
  );
};

function processData(data) {
  console.log(data);
  var Country_20 = [], TotalTests_20 = [], Deaths_20 = [], Cases_20=[], Recovered_20=[], Population_20=[] ;
  
  for (var i=0; i <20; i++) {
    row = data[i];
    Country_20.push( row['Country/Region'] )
    TotalTests_20.push( row['TotalTests'] )
    Deaths_20.push( row['TotalDeaths'] )
    Cases_20.push( row['TotalCases'] )
    Recovered_20.push( row['TotalRecovered'] )  
    Population_20.push( row['Population'] )
    
  }
  
  var Country_10 = [], TotalTests_10 = [], Deaths_10 = [], Cases_10=[], Recovered_10=[], Population_10=[] ;
  
  for (var i=0; i <10; i++) {
    row = data[i];
    Country_10.push( row['Country/Region'] )
    TotalTests_10.push( row['TotalTests'] )
    Deaths_10.push( row['TotalDeaths'] )
    Cases_10.push( row['TotalCases'] )
    Recovered_10.push( row['TotalRecovered'] )  
    Population_10.push( row['Population'] )
    
  }

  var color1 = [], r = 100, g =220, b=130;
  for(var i=0; i < 10; i++)
  {
    r+=50;
    g+=20;
    b+=10;
    color1.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
  } 
  console.log(color1)

  var bar1= [{
    x: Country_10,
    y: TotalTests_10,
    marker:{
      color: color1
    },
    type: 'bar'
    
  }];

  var layoutbar1 = {
    title: {
      text:'Comparison of Total Tests of 10 Most Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Country',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'Total Tests',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
      }
    }
  };

  var color2 = [], r = 80, g =20, b=30;
  for(var i=0; i < 10; i++)
  {
    r+=50;
    g+=20;
    b+=10;
    color2.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
  } 
  console.log(color2)
  
  var bar2 = [{
    x: Country_10,
    y: Deaths_10,
    marker: {
      color: color2
    },
    type: 'bar'
  }];
  
  var layoutbar2 = {
    title: {
      text:'Comparison of Total Deaths of 10 Most Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Country',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'Total Deaths',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
      }
    }
  };

  var color3 = [], r = 80, g =20, b=130;
  for(var i=0; i < 10; i++)
  {
    r+=10;
    g+=20;
    b+=30;
    color3.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
  } 
  console.log(color3)
  
  var bar3= [{
    x: Country_10,
    y: Cases_10,
    marker:{
      color:color3
    },
    type: 'bar'
  }];
  
  var layoutbar3 = {
    title: {
      text:'Comparison of Total Cases of 10 Most Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Country',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'Total Cases',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
      }
    }
  };

  var color4 = [], r = 10, g =120, b=70;
  for(var i=0; i < 20; i++)
  {
    r+=30;
    g+=10;
    b+=50;
    color4.push(  'rgb(' + r + ', ' + g + ", " + b + ')' );
  } 
  console.log(color4)
  var scatter = [{
    x: Cases_20,
    y: Deaths_20,
    z: Recovered_20,
    mode: 'markers',
    colorByPoint: true,
    marker:{
      color: color4
    },
    type: 'scatter3d'
  }];
  
  var layoutscatter3d = {
    title: {
      text:'3D Plot of Total Cases, Total Deaths and Total Recovered of Top 20 Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
	xaxis: {
      title: {
        text: 'TotalCases',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'TotalDeaths',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
     },
    },
	zaxis: {
      title: {
        text: 'TotalRecovered',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
     }
    }
  };
  
  var pie1= [{
    values: Deaths_20,
      labels: Country_20,
      type: 'pie'
    }];

  var layoutpie1 = {
    title: {
      text:'Percentage of Total Deaths in 20 Most Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'x Axis',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'y Axis',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
      }
    }
  };

  
  var pie2= [{
    values: Recovered_20,
      labels: Country_20,
      type: 'pie'
    }];

  var layoutpie2 = {
    title: {
      text:'Percentage of Total Recovered in 20 Most Affected Countries',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'x Axis',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
        }
      },
    },
   yaxis: {
      title: {
        text: 'y Axis',
        font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
      }
    }

  };
  
  Plotly.newPlot('TotalTests', bar1,layoutbar1);
  Plotly.newPlot('Deaths', bar2,layoutbar2);
  Plotly.newPlot('Cases', bar3,layoutbar3);
  Plotly.newPlot('Scatter', scatter,layoutscatter3d); 
  Plotly.newPlot('Pie2', pie1,layoutpie1);
  Plotly.newPlot('Pie1', pie2,layoutpie2);
} 
