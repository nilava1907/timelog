var sqlml;

    reqAPI('./app/getdata',{target:"timelogs"},"json",function(r){
      sqlml = r;
    });


var temp = sqlml.map(function(v){return v.activity});
    var uniqueLabels = temp.filter((v, i, a) => a.indexOf(v) === i); 
    var temp2 = sqlml.map(function(v){return v.week});
    var uniqueweeks = temp2.filter((v, i, a) => a.indexOf(v) === i); 

    var lineData =[];

    uniqueweeks.forEach(function(x){
        
        var push_data = [x];

        var fldata = sqlml.filter((v,i,a) => v.week===x);
        uniqueLabels.forEach(function(z){
            var label_data = fldata.filter((p,q,r) => p.activity===z);
            var hrs = label_data.reduce(function(acc,val){ return acc + val.hours} ,0);
            push_data.push(hrs);

        })

        lineData.push(push_data);
    })


 var label = uniqueLabels;
    label.unshift("Week");

    var container = $("div.card:contains('Salesforce Charts & Data') .CardBody");
        var hot = new Handsontable(container[0], {
          data: lineData,
          rowHeaders: true,
          colHeaders: uniqueLabels,
        });
        