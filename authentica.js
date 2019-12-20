var auth="";


window.addEventListener('load', function(){

	document.getElementById('newAcc').addEventListener('click', showRegForm);
	document.getElementById('emi_login').addEventListener('click', loginUser);
		
});


function showRegForm(){
	
	$.get('./app/components/signup.html').then(function(r){
		document.getElementById('MidBody').innerHTML=r;
		document.getElementById('btnRegNewUser').addEventListener("click", function(){
			regUser();	
		});
	});
}

function regUser(){
	
	
	var regData=
	{
		signup_email : document.getElementById('signup_email').value,
		signup_name: document.getElementById('signup_name').value,
		signup_org: document.getElementById('signup_org').value,
		signup_pwd: document.getElementById('signup_pwd').value,
		signup_pwd_2: document.getElementById('signup_pwd_2').value,
		signup_contact_no: document.getElementById('signup_contact_no').value
		
	};
	
	reqAPI("./app/reguser", regData, "json", function(resp){
		
		if(resp.success==true)
		{
			document.getElementById('signup_form').innerHTML='<h4>Registration Successful</h4><p>Your account has been successfully created.<br />Please <a href=""><u>login</u></a> to continue </p>';
		}
		else{
			document.getElementById('signup_error').innerHTML="Sorry, we couldn't set up your account. Please try again after some time.";
		}
	});	
	
	/*$.ajax({
		url:"./app/reguser",
		type:"POST",
		data:JSON.stringify(regData),
		contentType:"application/json; charset=utf-8",
		dataType:"json",
		success: function(resp){
			 if(resp.success==true)
			{
				document.getElementById('signup_form').innerHTML='<h4>Registration Successful</h4><p>Your account has been successfully created.<br />Please <a href=""><u>login</u></a> to continue </p>';
			}
			else{
				document.getElementById('signup_error').innerHTML="Sorry, we couldn't set up your account. Please try again after some time.";
			}
		}
	});
	*/	
		
		
}


function logoutUser(){
	
	auth="";
	location.reload();
}

function loginUser(){
		
	var loginData =
	{
		login_email: document.getElementById('login_email_inp').value,
		login_pwd: document.getElementById('login_pwd_inp').value
	};
	
	reqAPI("./app/loguser", loginData, "json", function(resp){
		
		if(resp.success==true)
		{
			//console.log(resp.msg);
			auth=resp.authToken;
			var midBody = document.getElementById('MidBody');
			midBody.innerHTML="";
			reqAPI("./app/getasset", {target:"userpanel"}, "html", function(respUPanel){
				
				
				var userView = document.createElement("div");
					userView.innerHTML = respUPanel; 
					userView.id="userView";
					userView.classList.add('view');
					userView.classList.add('hidden');
					midBody.appendChild(userView);
					
				
					reqAPI("./app/getasset", {target:"app"}, "html", function(respApp){

						var appView = document.createElement("div");
							//appView.classList.add('hidden');
							appView.innerHTML = respApp; 
							appView.id="appView";
							appView.classList.add("view");
						midBody.appendChild(appView);
						
						loadApp();
					
					});
								
			});
			//document.getElementById('signup_form').innerHTML='<h4>Registration Successful</h4><p>Your account has been successfully created.<br />Please <a href=""><u>login</u></a> to continue </p>';
		}
		else{
			document.getElementById('login_error').innerHTML=resp.msg;
		}
	});	
		
}

function changePwd(){
	
	const postData =
	{
		curPwd: document.getElementById('changePwdCurrent').value,
		newPwd: document.getElementById('changePwdNew').value
	};
	
		document.getElementById('changePwdCurrent').value="";
		document.getElementById('changePwdNew').value="";
		document.getElementById('changePwdNew2').value="";
	
	reqAPI("./app/changepwd", postData, "json", function(resp){
		
		if(resp.success===true){
			showMsgBox("Updated",resp.msg);
			
		}else{
			
			showMsgBox("Failed",resp.msg);
		}
		
	});
}

function reqAPI(urlAPI, postData, cType, fnCallback){
	//TD: to add a fail handler for the ajax call;
	$.ajax({
		//url:"./app/loguser",
		url:urlAPI,
		type:"POST",
		data:JSON.stringify(postData),
		contentType:"application/json; charset=utf-8",
		//contentType:cType,
		dataType:cType,
		beforeSend: function(req){
			if(auth.length>0){
				req.setRequestHeader('X-Authentica-Token',auth);
			}
		},
		success: function(resp){
			fnCallback(resp);
		},
		error: function(){
			showMsgBox("No Internet", "Sorry, we're unable to reach the server. <br />Please check your internet connection and try again.");
		}
	});
}
