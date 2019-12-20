const appRoot="timelogs";

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlConn = require('./core/sqlConn.js');
//const auth = require('./core/auth.js');
const dataPull = require('./core/dataPull.js');
var sqlPool = sqlConn.createPool();
dataPull.pool= sqlPool;

//auth.pool = sqlPool;
//auth.bcrypt = bcrypt;

/*var options = {
  key: fs.readFileSync('ssl/catalyst.key'),
  cert: fs.readFileSync('ssl/catalyst.crt')
};
*/

// Create a service (the app object is just a callback).
//TD: need to add code for ddos protection
//TD: need to enforce stict same-origin policy;

const appV = express();

//This will be changed and will be authenticated access only.
appV.use('/'+appRoot+'/app', express.static(path.join(__dirname, 'appStatic')));
appV.use(bodyParser.urlencoded({extended:false}));
appV.use(bodyParser.json());

appV.use('/'+appRoot+'/app/data', express.static(path.join(__dirname, 'appStatic/data')));
appV.use('/'+appRoot+'/app/components/', express.static(path.join(__dirname, 'appStatic/components/')));

appV.get('/'+appRoot+'/', function(req, res){
	res.sendFile(path.join(__dirname, 'appStatic', 'index.html')); 
});


///// Authentication Block - START

/*appV.post('/'+appRoot+'/app/reguser', function(req, res){
	console.log(req.body);
	auth.addNewUser(req.body, function(result){
		if(result.success===true){
			res.json({success:true});
		}else {
			res.json({success:false, msg:"We're unable to register you on our platform. Please try again after sometime or reach out to us"});
		}
		
	});
	
});
*/

appV.post('/'+appRoot+'/app/loguser', function(req, res){
	
	//auth.loginUser(req.body, function(result){
		res.json({success:true, authToken:"Testing"});
	
	//});
	
});

appV.post('/'+appRoot+'/app/correctdata', function(req, res){
	
	//dataPull.removeOlddata({tablename:"correctData", data: req.body})
	dataPull.updateTimelogdata({tablename: "correctData",data:req.body})/*, function(resp){
		res.json({success:true, authToken:"Testing", data:"correctdata"});
	});*/
	
});

appV.post('/'+appRoot+'/app/errrordata', function(req, res){
	
	dataPull.updateTimelogdata({tablename: "errorData",data:req.body}, function(resp){
		res.json({success:true, authToken:"Testing", data:"errordata"});
	});
	
});

/*appV.post('/'+appRoot+'/app/changepwd', function(req, res){
	
	if(req.header('X-Authentica-Token')){
		//res.json({success:false, msg:"Unauthorized access"});
		auth.validateToken(req.header('X-Authentica-Token'), function(result){
			if(result.success===true){
				auth.updatePassword(result.uid, req.body.curPwd, req.body.newPwd, function(changeRes){
					if(changeRes.success===true){
						res.json({success:true, msg:"Password has been successfully udpated"});
					}else{
						
						console.log(changeRes.msg);
						res.json({success:false, msg:changeRes.msg});
					}
				});

			} else{
				res.json({success:false, msg:"Unauthorized access"});
			}
			
		});
		
	}else{
		res.json({success:false, msg:"Unauthorized access"});
	}	
	
});
*/

///// Authentication Block - END


appV.post('/'+appRoot+'/app/getdata', function(req, res){
	console.log(req.body);
	if(req.body.target == 'timelogs')
	{
		console.log("checkpoint1");

		dataPull.requestTimelogdata({name: req.body.name}, function(resp){

			res.json(resp);
			//reqAPI()
		});
	
		//res.json(dataPull.SampleData());
	}





	/*if(req.header('X-Authentica-Token')){
		
		auth.validateToken(req.header('X-Authentica-Token'), function(result){
			//console.log(result);
			if(result.success===true){
				auth.updateTokenStamp(req.header('X-Authentica-Token'),function(resStamp){
				
					if(resStamp.success===true){
						
						res.json({success:true, msg:"Here's your data"});
						
					}else{
						res.json({success:false, msg:"We're experiencing technical difficulties. Please try again after sometime"});	
					}
					
				});
				
			} else{
				res.json({success:false, msg:"Unauthorized access"});
			}
		});
		
	}else{
		res.json({success:false, msg:"Unauthorized access"});
	}	
	*/
	//Fresh code should get here
	
});

appV.post('/'+appRoot+'/app/getasset', function(req, res){
	
	/*if(req.header('X-Authentica-Token')){
		
		auth.validateToken(req.header('X-Authentica-Token'), function(result){
			
			if(result.success===true){
				auth.updateTokenStamp(req.header('X-Authentica-Token'),function(resStamp){
				
					if(resStamp.success===true){
						
						customRoute(req.body.target, res);
												
					}else{
						
						res.json({success:false, msg:"We're experiencing technical difficulties. Please try again after sometime"});	
					}
					
				});
				
			} else{
				res.json({success:false, msg:"Unauthorized access"});
			}
		});
		
	}else{
		res.json({success:false, msg:"Unauthorized access"});
	}
*/	
	customRoute(req.body.target, res);	
});



appV.get('/'+appRoot+'/sw.js', function(req, res){
	res.sendFile(path.join(__dirname, 'appStatic', 'sw.js')); 
});

//https://stackoverflow.com/questions/22584268/node-js-https-pem-error-routinespem-read-biono-start-line



//BEGIN Custom router

function validateInput(inp){
//TD: to add more validation here
	var val = true
	if(inp.length>20){
		val = false;
	}
	
	return val;
}

function customRoute(inp, res){
	
	if(validateInput(inp)===true){
		
		switch(inp){
			case "app":
			res.sendFile(path.join(__dirname, 'secure', 'app.html')); 
			break;
			
			case "userpanel":
			res.sendFile(path.join(__dirname, 'secure', 'userpanel.html')); 
			break;
			
			default:
			//console.log("breakpoint 1 ");
			//res.json({success:"false", msg:"Invalid request");
			res.status(400);
			res.send("Invalid Request");
			break;
		}	
		
	}else{
		console.log("breakpoint 2");
		res.status(400);
		res.send("Invalid Request");
	}
	
}


//END Custom router



// Create an HTTP service.
console.log('Starting '+appRoot+' server...');
 //http.createServer(appV).listen(3000, '192.168.148.112');
// Create an HTTPS service identical to the HTTP service.

http.createServer(appV).listen(3000, '0.0.0.0');
//https.createServer(options, appV).listen(443, '0.0.0.0');

