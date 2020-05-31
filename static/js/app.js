
d3.json('samples.json').then(function(data) {
    var data = data;
    console.log(data);
    
    
    var namesList = data.names;     
    var sel = document.getElementById('selDataset');
    for(var i = 0; i < namesList.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = namesList[i];
        opt.value = namesList[i];
        sel.appendChild(opt);
    };
});

function optionChanged(choice) {

    d3.json('samples.json').then(function(data) {
        
        
        var data = data;
        
        var subjectID = choice;
        index = data.names.indexOf(subjectID);
        metadata = data.metadata[index];
        id = data.metadata[index].id;
        ethnicity = data.metadata[index].ethnicity;
        gender = data.metadata[index].gender;
        age = data.metadata[index].age;
        locale = data.metadata[index].location;
        bbtype = data.metadata[index].bbtype;
        wfreq = data.metadata[index].wfreq;
       

        var metaList = d3.select("#metadata")
        metaList.html("")
        
      
        var li1 = d3.select("#metadata").append("p");
        li1.text("id: "+ id);
        var li2 = d3.select("#metadata").append("p");
        li2.text("ethnicity: " + ethnicity);
        var li3 = d3.select("#metadata").append("p");
        li3.text("gender: " + gender);
        var li4 = d3.select("#metadata").append("p");
        li4.text("age: " + age);
        var li5 = d3.select("#metadata").append("p");
        li5.text("location: " + locale);
        var li6 = d3.select("#metadata").append("p");
        li6.text("bbtype: " + bbtype);
        var li7 = d3.select("#metadata").append("p");
        li7.text("wfreq: " + wfreq);


    
        sampleValues = data.samples[index].sample_values.slice(0,10).reverse()
        
        otuIds = data.samples[index].otu_ids.slice(0,10).reverse()
        otuIdsText = otuIds.map(otuID => ("OTU " + otuID + "  "));

        otuLabels = data.samples[index].otu_labels.slice(0,10).reverse()

        var trace1 = {
          x: sampleValues,
          y: otuIdsText,
          text: otuLabels,
          marker: {
            color: 'white',
            opacity: .5,
          },
          orientation: "h",
          type: "bar"
        };

        var chartData = [trace1];

        var layout = {
            title: "Bacteria Abundance- Top Samples",
            font: {
              color: 'white',
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
              title: {
                text: 'Relative Abundance',
              },
            },
            yaxis: {
              title: {
                text: 'Bacteria ID',
              }
            }
          };

        Plotly.newPlot("bar", chartData, layout);


     

        var traceBubble = {
            x: data.samples[index].otu_ids,
            y: data.samples[index].sample_values,
            text: data.samples[index].otu_labels,
            mode: 'markers',
            marker: {
              color: data.samples[index].otu_ids,
              size: data.samples[index].sample_values,
              sizeref: 2.2
            }
          };
          
          var dataBubble = [traceBubble];
          
          var layoutBubble = {
            title: 'Abundance by Type of Bacteria',
            font: {
              color: 'white',
            },
            showlegend: false,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
              title: {
                text: 'Bacteria ID',
              },
            },
            yaxis: {
              title: {
                text: 'Relative Abundance',
              }
            }
          };
    
          Plotly.newPlot("bubble", dataBubble, layoutBubble);


      

        var gaugeData = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Washes Per Day" },
            type: "indicator",
            mode: "gauge+number",
            
            gauge: {
              axis: { range: [0, 9] },
              steps: [
                { range: [0, 9], color: "lightgray" },
                
              ],
            }
          }
        ];
        
        var layoutGauge = {
          font: {
            color: 'white',
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        };
        Plotly.newPlot('gauge', gaugeData, layoutGauge);
    });
};