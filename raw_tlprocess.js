var ofc = "";
ofc ='Catalyst'; //This will be pulled from the login information.
var namespace=[];

var activities = {
		single:[
			{CGBD:["Receiving training","CSR","Travel","F2F Client time","Legal","Needs assessment preparation","Needs assessment calls","Writing proposals","Proposal follow up","Post win follow up","Proactive sales work","Consulting meetings","Admin","CSR"]},
			{CGBDManager:["Team development/Training","CSR","BD work","Recruitment","Legal","Strategy/ Best  Practice Development","Oversight work","Admin","CSR"]},
			{Manager:["Admmin","Minutes","CSR","Training","Recruitment","Strategy","Project support","Commercial"]},
			{Catalyst: ["Minutes","Training","CSR"]},
			{GlobalConsulting:["Minutes","Training","CSR"]}
		],
		multiple:[
			{SpecializationsList: ["Survey","Innovation","Sustainability","First Step (Via)","Analytics","Investor Services","Partnerships/NextGen","Food & Nutrition","Fashion & Beauty","Services & Payments (E-commerce)","Home & Tech","Drinks & Tobacco","Illicit","Government","B2B","Marketing","Competitive Intelligence","Knowledge & Insight","Efficiency"]},
			{CGBD:[]},
			{CGBDManager:[]},
			{Manager:["Travel"]},
			{Catalyst: ["Analysis","Project Set-up","Collaboration/ Ideation"]},
			{GlobalConsulting: ["Analysis","Project Set-up","Collaboration/ Ideation"]}
		]
};
var CatalystList=["Data","Content","Tech"];
var CGCode =["Internal"];
/*cdata[0] = ["Start Date","Start Time","Start Timestamp","End Date","End Time","End Timestamp","Categories","Time Spent"];
edata[0] =["Activity Start Time","Categories","Errors"];
*/

//handlefiles starting point has to be defined in the html file

function handleFiles(files)
{	
	Array.from(files).forEach(function(v){
		if (window.FileReader){
			getAsText(v);
		}
		else{
			alert('The file format is not supported in this browser, check if you have selected the right file format');
			
		}
	})
		
}

function getAsText(filetoread)
{
	namespace = [];
	var reader = new FileReader();
	reader.readAsText(filetoread);
	namespace = filetoread.name.split("_")
	reader.onload = loadhandler;
	reader.onerror = errorhandler;
}


function loadhandler(event)
{
	var csv = event.target.result;
	var parsedData =[];
	parsedData = CSV.parse(csv); 
	processrows(parsedData);
}


function errorhandler(evt)
{
	if(evt.target.error.name == "NotReadableError")
	{
		alert('Cannot read the file!');
	}
}

function processrows(arr){
	
	var data =[];
	var index =[];
	data = arr[0];
	//Index the required columns only
	//TD: what exactly are we trying to do here?
	
	data.forEach(function(v,i){
		
		switch(v){
			case 'Start Date':
				index[0]=i;
				break;
			case 'Start Time':
				index[1]=i;
				break;
			case 'End Date':
				index[2]=i;
				break;
			case 'End Time':
				index[3]=i;
				break;
			case 'Categories':
				index[4]=i;
				break;
			default:
				break;
		}
	});

	data = [];

	data[0] = ["Start Date","Start Time","Start Timestamp","End Date","End Time","End Timestamp","Categories","Time Spent"];
   
    //pick up relevant columns based on index
    for (i=1; i<arr.length;i++){
        var x,y,a,b ="";
        if(arr[i][index[0]]!= undefined){
            x=arr[i][index[0]].replace(/\"/g, "") ;
        }else {x=0;}   
        if(arr[i][index[1]]!= undefined){
            y=arr[i][index[1]].replace(/\"/g, "") ;
        }else {y=0;}
        if(arr[i][index[2]]!= undefined){
            a=arr[i][index[2]].replace(/\"/g, "") ;
        }else {a=0;}
        if(arr[i][index[3]]!= undefined){
            b=arr[i][index[3]].replace(/\"/g, "") ;
        }else {b=0;}
        data[i] = [x,y,x+" "+y,a,b,a+" "+b,arr[i][index[4]]];
        var temp =(new Date(data[i][5]).getTime())-(new Date(data[i][2]).getTime());
        data[i][7] =temp/1000/3600;
    }
	cleandata(data);
	
}

function cleandata(arr){
	
	var filterdata_spaces = arr.filter((arr) =>
	{
		return arr[6] != null;
	}); 
	
	var filterdata_time = filterdata_spaces.filter((filterdata_spaces) =>
	{
		return filterdata_spaces[7] > 0;
	})
	
	var d = new Date()
	var filterdata_future = filterdata_time.filter((filterdata_time) =>
	{
	
		return new Date(filterdata_time[2]).getTime() < d.getTime();
	})
	
	categoryprocess(filterdata_future);
}


function categoryprocess(arr){
	
	var singleactivity=[];
	var multipleactivity=[];
	var categories =[];
	
	arr.forEach(function(v){
    	var temp = v[6].split(";");
        if(temp.length>1)
        {
            multipleactivity.push(v);
        }
        else
        {
            singleactivity.push(v);
        }
    })
	//TD: as discussed, let's avoid global variable as much as possible. let's try to return the output in the form of a json.
	
	categories.push(singleactivity);
	categories.push(multipleactivity);
	
	errorcheck(categories);
	
}


function errorcheck(data){
	
	var sng = singleactivity(data[0]);
	var mup = multipleactivity(data[1]);
	var cdata = [];
	cdata[0] = ["Start Date","Start Time","Start Timestamp","End Date","End Time","End Timestamp","Categories","Time Spent"];
	cdata = cdata.concat(sng[0], mup[0]);
	var edata =[];
	edata[0] = ["User Name","Error Time", "Error category", "Error"]
	edata = edata.concat(sng[1], mup[1]);
	if(edata.length>0){
		//downloadfile(edata);
	}
	/*$.post("./postdata", JSON.stringify(cdata)).then(function(resp){
		console.log("Server Response: "+ resp);
	})
	*/
	
	$.ajax({
	  url:"./app/correctdata",
	  type:"POST",
	  data:JSON.stringify(cdata),
	  contentType:"application/json; charset=utf-8",
	  dataType:"json",
	  success: function(r){console.log(r)}
	});
	
	$.ajax({
	  url:"./app/errrordata",
	  type:"POST",
	  data:JSON.stringify(edata),
	  contentType:"application/json; charset=utf-8",
	  dataType:"json",
	  success: function(r){console.log(r)}
	});
	
	populatetable(edata,["Name","Timestamp","Activities","Error"]);
	
	//console.log(JSON.stringify(cdata));
	
}

function singleactivity(data){
	var officeactivitylist = activities["single"].filter(function(v){return Object.keys(v)[0]==ofc})[0][ofc];
	var cdata =[];
	var edata = [];
	var act=[];
	data.forEach(function(v){
			
		var item = officeactivitylist.includes(v[6].replace(/\"/g, ""));
		if(item)
		{
			//TD: we can make a single push, however, this is neat too.	
			var a = [];
			a[0] = "";
			a[1] = v[0];
			a[2] = namespace[0];
			a[3] = "";
			a[4] = "";
			a[5] = namespace[1].replace("."," ");
			a[6] = ""; //v[6]
			a[7] = "";
			a[8] = "";
			a[9] = v[6];
			a[10] = v[7];
			cdata.push(a);
		}
		else{
			var error =[];
			error[0] = namespace[1].replace("."," ");
			error[1] = v[2];
			error[2] = v[6];
			error[3] = "Single activity has incorrect data."
			edata.push(error);

		}	
	});
			act.push(cdata);
			act.push(edata);
			return act;

};

function multipleactivity(data){
	
	var cdata =[];
	var edata=[];
	var act = [];
	var multiple = activities["multiple"].filter(function(v){return Object.keys(v)[0]==ofc})[0][ofc];
	if(ofc=="Catalyst"){
		CGCode.push("Syndicated Catalyst");
	}

	data.forEach(function(v)
	{
		
		v[6]=v[6].replace(/\"/g, "");
		var cats = v[6].split(';');
		var CGCode_check =[];
		var timelog_check =[];
		var catalyst_check = [];
		if(cats.includes('Specializations'))
		{
			specializations(v);
		}
		else
		{
			cats.forEach(function(k)
			{
				if(k.indexOf("CG")==0)   //k[0] == 'c' k[1] == 'g'
				{
					k = k.substring(0,7)
				}
				if(CGCode.includes(k))
				{
					CGCode_check.push(k);
				}
				if(multiple.includes(k))
				{
					timelog_check.push(k);
				}
				if(ofc=="Catalyst")
				{
					if(CatalystList.includes(k))
					{
						catalyst_check.push(k)
					}
				}
			});
			
			if (CGCode_check.length == 1)
			{
				if (timelog_check.length == 1)
				{
					if (ofc == "Catalyst")
					{
						if(catalyst_check.length == 1)
						{
							
							var a = [];
							a[0] = "";
							a[1] = v[0];
							a[2] = namespace[0];
							a[3] = "";
							a[4] = "";
							a[5] = namespace[1].replace("."," ");
							a[6] = CGCode[0];
							a[7] = "";
							a[8] = catalyst_check[0];
							a[9] = timelog_check[0];
							a[10] = v[7];
							cdata.push(a);
						}
						else
						{
							
							var error =[];
							error[0] = namespace[1].replace("."," ");
							error[1] = v[2];
							error[2] = v[6];
							error[3] = "Catalyst activity is incorrect."
							edata.push(error);
						}
					}
					else
					{
						var a = [];
						a[0] = "";
						a[1] = v[0];
						a[2] = namespace[0];
						a[3] = "";
						a[4] = "";
						a[5] = namespace[1].replace("."," ");
						a[6] = CGCode[0];
						a[7] = "";
						a[8] = "";
						a[9] = timelog_check[0];
						a[10] = v[7];
						cdata.push(a);
					}
				}
				else
				{
					
					var error =[];
					error[0] = namespace[1].replace("."," ");
					error[1] = v[2];
					error[2] = v[6];
					error[3] = "Incorrect timelog activity."
					edata.push(error);
				}
			}
			else
			{
				
				var error =[];
				error[0] = namespace[1].replace("."," ");
				error[1] = v[2];
				error[2] = v[6];
				error[3] = "Incorrect CG code entry."
				edata.push(error);
			}
         
		}
		
	})
	
	act.push(cdata);
	act.push(edata);
	return act;

	if(ofc=="Catalyst"){
		CGCode.pop();
	}
	

}

function specializations(data){
	
	var cats = data[6].split(';');
	var specs = false;
	var cdata = [];
	var edata = [];
	cats.forEach(function(k)
		{
			var check = specializations_list.includes(k);
			if (check)
			{
				specs = true;

			}
		})
		if(specs){
			var a = [];
			a[0] = "";
			a[1] = data[0];
			a[2] = namespace[0];
			a[3] = "";
			a[4] = "";
			a[5] = namespace[1].replace("."," ");
			a[6] = "Specialization";
			a[7] = "";
			a[8] = "";
			a[9] = k;
			a[10] = data[7];
			cdata.push(a);
		}else{
			var error =[];
			error[0] = namespace[1].replace("."," ");
			error[1] = v[2];
			error[2] = v[6];
			error[3] = "Specializations activity is incorrect."
			edata.push(error);
		};
	
}




function populatetable(cdata,header){
	var tdata = cdata;
	var htContainer = document.getElementById('htcontainer');
	tdata.shift();
	var hot = new Handsontable(htContainer, {
	  data: tdata,
	  rowHeaders: true,
	  colHeaders:header
	  //colHeaders:["Name","Timestamp","Activities","Error"]
	  //colHeaders: ["Week","Start Date","Office","Title","Role","Name","Code","Project Name","Catalyst Activity","Timelog Activity","Hours"],
	});
}


function downloadfile(data){
	var csvContent = '';
	data.forEach(function(infoArray, index) {
	  dataString = infoArray.join(', ');
	  csvContent += index < data.length ? dataString + '\n' : dataString;
	});


	var download = function(content, fileName, mimeType) {
	  var a = document.createElement('a');
	  mimeType = mimeType || 'application/octet-stream';
	
	  if (navigator.msSaveBlob) { 
	    navigator.msSaveBlob(new Blob([content], {
	      type: mimeType
	    }), fileName);
	  } else if (URL && 'download' in a) {
	    a.href = URL.createObjectURL(new Blob([content], {
	      type: mimeType
	    }));
	    a.setAttribute('download', fileName);
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	  } else {
	    location.href = 'data:application/octet-stream,' + encodeURIComponent(content); 
	  }
	}
	
	if(data.length>1){
		download(csvContent, 'Timelog_ErrorSheet.csv', 'text/csv;encoding:utf-8');
	}
	
}
