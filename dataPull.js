var dataPull= {
	
	pool:{},
	requestTimelogdata: function (filterData, callBack)
		{
			//var nameSelected = filterData.name;//select token
			
		  	var sql = "SELECT * FROM timelog_consolidated WHERE name ='" + filterData.name + "' AND flag = 1"; //sql query for pulling data
		  	
		  	dataPull.pool.query(sql,function(err,result)
		    {
		      if(err)
		      {
		        throw err;
		      }
		      else
		      {
		      	callBack(result);
		      }
		    });  
		},
		
	updateTimelogdata: function(load)
		{
			var totstring =[];
			header = load.data.shift();
			var headsyntax = " (`"+header.join("`, `")+"`)";
			load.data.forEach(function(v,i){
				var string = [];
				v.forEach(function(j,k){
					var rowstring = j;
					string.push("'"+rowstring+"'")
				})
				totstring.push("("+string.join(", ")+")");
			})
			var bodysyntax = totstring.join(", ");
			var SQLsyntax = "INSERT INTO "+load.tablename+headsyntax+" VALUES "+bodysyntax;	
			dataPull.pool.query(sql,function(err,result)
		    {
		      if(err)
		      {
		        throw err;
		      }
		      else
		      {
		      	return {value:result, attribute:"update timelog with new data"};
		      }
		    });
		},
		
		removeOlddata: function(argument, callBack){
			
			var dates = argument.data.map(function(v){return v[1]});
			var unqdates = argument.dates.filter((v, i, a) => a.indexOf(v) === i); 
			var	datestring = unqdates.join(", ");
				datestring = "("+datestring+")";
			var SQLsyntax = "UPDATE "+argument.table+" SET Flag = 0  where Dates in "+datestring;	
			dataPull.pool.query(sql,function(err,result)
		    {
		      if(err)
		      {
		        throw err;
		      }
		      else
		      {
		      	return {value:result, attribute:"update timelog with new data"};
		      }
		    });
			
		},

		SampleData: function()
		{
			var sqlml = [["08-04-2019","12-04-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["06-05-2019","09-05-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["03-06-2019","06-06-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",1.5],
						["17-06-2019","20-06-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",1],
						["01-07-2019","04-07-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["15-07-2019","18-07-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["01-04-2019","01-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analyst Mngt.",0.5],
						["01-04-2019","01-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",8],
						["01-04-2019","02-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.5],
						["01-04-2019","03-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",4.5],
						["01-04-2019","05-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Travel",5],
						["01-04-2019","05-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",2.5],
						["01-04-2019","05-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Deliverable Production",5.5],
						["01-04-2019","04-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",2.5],
						["01-04-2019","04-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Deliverable Production",7],
						["01-04-2019","02-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Travel",5],
						["01-04-2019","02-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",2],
						["08-04-2019","08-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.8],
						["08-04-2019","08-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1],
						["08-04-2019","08-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Deliverable Production",5.5],
						["08-04-2019","09-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",9],
						["08-04-2019","10-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["08-04-2019","10-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",10.5],
						["08-04-2019","11-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",6],
						["08-04-2019","12-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1.5],
						["08-04-2019","12-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",3],
						["08-04-2019","12-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",0.5],
						["08-04-2019","11-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Project Set-up",1.5],
						["15-04-2019","15-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",0.5],
						["15-04-2019","15-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",4.5],
						["15-04-2019","16-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["15-04-2019","16-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",4],
						["15-04-2019","15-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Project Set-up",1.5],
						["15-04-2019","16-04-2019","BLR",,,"Puneet Tomar","Minutes","Minutes",,"Minutes",1.3],
						["15-04-2019","16-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Project Set-up",1],
						["15-04-2019","16-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.5],
						["15-04-2019","16-04-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["15-04-2019","17-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",2],
						["15-04-2019","17-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",5.5],
						["15-04-2019","17-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.5],
						["22-04-2019","22-04-2019","BLR",,,"Puneet Tomar","Minutes","Minutes",,"Minutes",0.5],
						["22-04-2019","22-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",0.5],
						["22-04-2019","22-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",3],
						["22-04-2019","23-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["22-04-2019","23-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1.8],
						["22-04-2019","24-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["22-04-2019","24-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",5],
						["22-04-2019","24-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Project Set-up",1.5],
						["22-04-2019","23-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",1],
						["22-04-2019","26-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["22-04-2019","26-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1.5],
						["22-04-2019","26-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Deliverable Production",8.5],
						["22-04-2019","27-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Deliverable Production",8.5],
						["29-04-2019","29-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["29-04-2019","29-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1],
						["22-04-2019","27-04-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",0.5],
						["29-04-2019","29-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.5],
						["29-04-2019","29-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",1],
						["29-04-2019","30-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1.5],
						["29-04-2019","30-04-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",2],
						["29-04-2019","30-04-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",1.5],
						["06-05-2019","06-05-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",1],
						["29-04-2019","02-05-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",4],
						["29-04-2019","03-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",8],
						["29-04-2019","02-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",3],
						["06-05-2019","06-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",0.5],
						["06-05-2019","06-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",2.5],
						["13-05-2019","16-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",2],
						["13-05-2019","16-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1.5],
						["06-05-2019","07-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",4],
						["06-05-2019","08-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",6],
						["06-05-2019","09-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Client Relations",1],
						["06-05-2019","09-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analyst Mngt.",1],
						["06-05-2019","09-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",1],
						["06-05-2019","08-05-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",1],
						["06-05-2019","09-05-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analysis",1.5],
						["06-05-2019","10-05-2019","BLR",,,"Puneet Tomar","Training","Training",,"Training",4],
						["06-05-2019","10-05-2019","BLR",,"RPM","Puneet Tomar","CG102146","CG: Medical Device Sizing-S.E Asia",,"Analysis",3],
						["06-05-2019","10-05-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Client Relations",0.5],
						["6-05-2019","10-05-2019","BLR",,"GPM","Puneet Tomar","CG119151","CG : Optimise Channel Strategy & Growth",,"Analyst Mngt.",1]
						];

						return sqlml;
				}

		
};

module.exports = dataPull;


