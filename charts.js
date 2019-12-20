   // var sqlml;
    google.charts.load('current', {'packages':['corechart','line']});
        
    function Round(value){
     return Math.round(value*100)/100;
    } ;


   
    //google.charts.setOnLoadCallback(drawChart);

    function drawSFPieChart(){

        reqAPI('./app/getdata',{target:"timelogs", name:"Puneet Tomar"},"json",function(r){
                sqlml = r;

              var temp = sqlml.map(function(v){return v.activity});
              var uniqueLabels = temp.filter((v, i, a) => a.indexOf(v) === i); 
              var temp2 = sqlml.map(function(v){return v.week});
              var uniqueweeks = temp2.filter((v, i, a) => a.indexOf(v) === i); 

              var lineData =[];

              uniqueweeks.forEach(function(x){
                  
                  var push_data = [x];

                  //var fldata = sqlml.filter((v,i,a) => v[0]===x);
                  var fldata = sqlml.filter((v,i,a) => v.week===x);
                  uniqueLabels.forEach(function(z){
                      //var label_data = fldata.filter((p,q,r) => p[9]===z);
                      //var hrs = label_data.reduce(function(acc,val){ return acc + val[10]} ,0);
                      var label_data = fldata.filter((p,q,r) => p.activity===z);
                      var hrs = label_data.reduce(function(acc,val){ return acc + val.hours} ,0);
                      push_data.push(hrs);

                  });
                  
                  lineData.push(push_data);
                });

              var sfData =[];
                uniqueLabels.forEach(function(z){
                //var label_data = fldata.filter((p,q,r) => p[9]===z);
                //var hrs = label_data.reduce(function(acc,val){ return acc + val[10]} ,0);
                var label_data = sqlml.filter((p,q,r) => p.activity===z);
                var hrs = label_data.reduce(function(acc,val){ return acc + val.hours} ,0);
                sfData.push([z,Round(hrs),"",Round(hrs/8)]);

              });
                var total = sfData.map(function(v){return v[1]});
                var sfTotalData = total.reduce(function(acc,val){ return acc + val},0);
                sfData.forEach(function(v,i){
                  v[2] = Round((v[1]/sfTotalData)*100) + "%";
                });
                //console.log(sfTotalData);
                var totalArray = ["Total", Round(sfTotalData), "100%", Round(sfTotalData/8)];

                sfData.push(totalArray);

                var HOT = document.getElementById("handsOnTable");
                 var hot = new Handsontable(HOT, {
                          data: sfData,
                          rowHeaders: true,
                          colHeaders: ["Activity","Hours","Hours(%)","Days"],
                        });

              //var label = uniqueLabels;
              //uniqueLabels.shift();
              var dynamicData =[];
              var colorScheme = ['#ff6a13','#34657f','#a4123f','#a83d72','#653279','#1e22aa','#43b02a','#008578','#685bc7','#e24585','#ff9e1b','#00aed9','#cacac8','#a4a6a8','#818387'];

              uniqueLabels.forEach(function(x){
                  //var temp_fdata = sqlml.filter((v,i,a) => v[9]===x);
                  //dynamicData.push(temp_fdata.reduce(function(acc,val){ return acc + val[10]} ,0));
                  var temp_fdata = sqlml.filter((v,i,a) => v.activity===x);
                  dynamicData.push(temp_fdata.reduce(function(acc,val){ return acc + val.hours} ,0));
                });


              var chartArray = [["Legends","Hours"]];

              uniqueLabels.forEach(function(v,i){
                  chartArray.push([uniqueLabels[i] , dynamicData[i]]);
              });

                  var pieData = new google.visualization.arrayToDataTable(chartArray);

                  var piechart_options = {

                  			   title:'Activity Analysis:',
                                 width:600,
                                 height:400,
                                 colors: colorScheme,
                                 animation:{
                                              duration:1500,
                                              startup: true,
                                              easing: 'in'   
                                           }
                  };
                  var piechart = new google.visualization.PieChart(document.getElementById('PieChartHolder'));
                  piechart.draw(pieData, piechart_options); 

                  var barchart_options = {title:'Activity Analysis:',
                       width:600,
                       height:400,
                       colors: colorScheme,
                       legend: 'none',
                       vAxis:{
                                   gridlines:{
                                    color: 'transparent'
                                  }
                        },
                      hAxis:{
                                  gridlines:{
                                    color: 'transparent'
                                  }
                      },
                       animation:{
                                    duration:1500,
                                    startup: true,
                                    easing: 'in'   
                                  }

                  };
                  var barchart = new google.visualization.BarChart(document.getElementById('barChart'));
        
                  var tdata = chartArray;
                  tdata.forEach(function(v,i){ 
                      var index = i>colorScheme.length?i-1-colorScheme.length:i-1;

                      v[2] = colorScheme[index];
                  });
                  tdata[0][2] = {role: 'style'};

                  var bardata = new google.visualization.arrayToDataTable(tdata);

                  barchart.draw(bardata, barchart_options);

                  var lineChartData = new google.visualization.DataTable();
                  lineChartData.addColumn('string', 'Week');
                  uniqueLabels.forEach((v) => lineChartData.addColumn('number',v));
                  lineChartData.addRows(lineData);
      
                   var options = {
                      chart: {
                        title: 'Analysis Over Time',
                             },
                      hAxis: {
                                title: 'Week',
                                titleTextStyle: {
                                  color: "#000",
                                  fontName: "sans-serif",
                                  fontSize: 15,
                                  italic: false
                                },
                                gridlines:{
                                  color: 'transparent'
                                }
                             },
                      vAxis: {
                                title: 'Hours',
                                titleTextStyle: {
                                  color: "#000",
                                  fontName: "sans-serif",
                                  fontSize: 15,
                                  italic: false
                                },
                                gridlines:{
                                  color: 'transparent'
                                }
                             },       
                      width: 1100,
                      height: 400,
                      
                      pointSize: 8,
                      pointShape: 'triangle',
                      animation:{
                          duration:1500,
                          startup: true,
                          easing: 'in'   
                      }

                  };

                  var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));

                  chart.draw(lineChartData, options);
              
          });
      	}
       
      
      	