//TD: connection pooling will be added later
var sqlConn= {
	
	
	createPool:function(){
		const sql = require('mysql');
		var pool  =  sql.createPool({
			connectionLimit : 10, //important
			host: 'indband033.euroindia.euromonitor.local',
  			user: 'ext',
  			password: 'abc123',
  			database: 'timelogsweb',
			debug    :  false
		});
		return pool;
	}

	
	/*
	connect: function(){
		const sql = require('mysql');
		var connected=false;	
		var con = sql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "",
		  database:"PriceRight"
		});
	
		con.connect(function(err) {
		  if (err) throw err;
		  //console.log("Connected!");
		  
		  connected=true;
		  //console.log(con);
		});
		
		if(connected){
			return con;
		}
	}*/
	
};

module.exports = sqlConn;


