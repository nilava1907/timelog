const navContextMap=[
[ "link1", "cardContext1"],
[ "link2", "cardContext2"],
[ "link3", "cardContext3"],
[ "link4", "cardContext4"],
[ "link5", "cardContext5"],
[ "link6", "cardContext6"],
[ "link7", "cardContext7"],
];
	


function loadApp(){
			
	$('.label').on('click', showHideCard);
	
	document.getElementById('goBack').addEventListener('click',showAppView );
	
	document.getElementById('UserPanel').classList.toggle("active");
	
	document.getElementById('UserSignOut').addEventListener('click', logoutUser);
	//document.getElementById('UserUpdateDetails').addEventListener('click', showUserView);
	document.getElementById('UserChangePwd').addEventListener('click', showUserView);
	
	attachNavListeners();
	loadPriceHot();
	//newProject();
}


function attachNavListeners(){
	
	navContextMap.forEach(function(v){
		//console.log(v);
		document.getElementById(v[0]).addEventListener("click", function(){
			removeNavSelections();
			document.getElementById(v[0]).classList.add('selected');
			switchContexts(v[1]);
			
		});
		
	});
}

function showUserView(){
	switchViews('userView');
	
}

function showAppView(){
	
	switchViews('appView');
}

function switchViews(viewId){
	var views = document.getElementsByClassName('view');
	for(var vu of views){
		vu.classList.add('hidden');
	}
	var curView = document.getElementById(viewId);
	curView.classList.remove('hidden');
}

function hideAllContexts(){
	var contexts = document.getElementsByClassName('card-context');
	for(var con of contexts){
		con.classList.add('hidden');
	}
}


function switchContexts(contextId){
	hideAllContexts();
	console.log(contextId);
	document.getElementById(contextId).classList.remove('hidden');
	
}

function removeNavSelections(){
	var navs = document.getElementsByClassName('nav-link');
	for(var nav of navs){
		nav.classList.remove('selected');
	}
}


function showHideCard(){
	$(this).parent().toggleClass('collapsed');
}

function loadPriceHot(){
	var valSalesHotCont = document.getElementById('ValueSales'); 
	//var salesData=handsontable.he
	salesHOT = new Handsontable(valSalesHotCont ,{
		
			data : Handsontable.helper.createEmptySpreadsheetData(35,6),
			manualColumnResize: true,
			manualRowResize: true,
			//renderAllRows: true,
			renderAllColumns: true,
			autoRowSize: false,
			rowHeights: 25,
			autoColumnSize: true,
			colHeaders:["Product Category", "Geography", "2017", "2018", "2019", "Notes"],
			rowHeaders:true,
			colWidths:[100, 100, 50, 50, 50, 200],
			selectionMode: 'ranges',
			copyPaste: {pasteMode: '', rowsLimit: 10, columnsLimit: 5},
			stretchH:'all',
			autoWrapCol: true,
			outsideClickDeselects: true
		});
	salesHOT.render();
	
}



//Application declarations
"use strict";

