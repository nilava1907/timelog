const navContextMap=[
[ "link1", "cardContext1"],
[ "link2", "cardContext2"],
[ "link3", "cardContext3"],
[ "link4", "cardContext4"],
[ "link5", "cardContext5"],
[ "link6", "cardContext6"],
[ "link7", "cardContext7"],
];
	
$(window).resize(function(){
	//alert("window resized");
	globalHOTs.forEach(function(v, i){
		v.render();
		
	});
});
	
function showMsgBox(header, body){
	
	document.getElementById('popFrame').classList.remove("hidden");
	document.getElementById('popHeader').innerText=header;
	document.getElementById('popBody').innerHTML= body;
	
}	
	
	
function hidePopBox(){
	document.getElementById('popFrame').classList.add("hidden");
	
}	

var globalHOTs = [];

function loadApp(){
	drawSFPieChart();
	$('.label').on('click', showHideCard);
	
	document.getElementById('goBack').addEventListener('click',showAppView );
	
	document.getElementById('UserPanel').classList.toggle("active");
	
	document.getElementById('UserSignOut').addEventListener('click', logoutUser);
	//document.getElementById('UserUpdateDetails').addEventListener('click', showUserView);
	document.getElementById('UserChangePwd').addEventListener('click', showUserView);
	
	attachNavListeners();
	//loadPriceHot();
	
	document.getElementById('btnChangePassword').addEventListener('click', changePwd);
	
	
	
	//var HOTConfig =  [{"ID":"ValueSalesCategory","noOfCol":6,"colHead":["Product Category", "Product Name", "2017", "2018", "2019", "Notes"],"colWidth":["100","100","50","50","50","200"]},{"ID":"ValueSalesCountry","noOfCol":6,"colHead":["Product Category", "Geography", "2017", "2018", "2019","Notes"],"colWidth":["100","100","50","50","50","200"]},{"ID":"VolumeSalesCategory","noOfCol":6,"colHead":["Product Category", "Product Name", "2017", "2018", "2019", "Notes"],"colWidth":["100","100","50","50","50","200"]},{"ID":"VolumeSalesCountry","noOfCol":6,"colHead":["Product Category", "Geography", "2017", "2018", "2019", "Notes"],"colWidth":["100","100","50","50","50","200\"]"}];
	
	//HOTConfig.forEach(i,v){
	//	loadHOT(HOTConfig);
	//};
	
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

function openLocal(){
	
	var fDialog= document.createElement('input');
		fDialog.setAttribute('type', 'file');
		fDialog.addEventListener('change', openFile);
		fDialog.click();
}

function openFile(){
	
	alert("File will be uploaded in production app");
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
	globalHOTs.forEach(function(v, i){
		v.render();
		
	});
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

/*function loadPriceHot(){
	var valSalesHotCont = document.getElementById("ProductPortfolio"); 
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

*/


function loadHOT(ID, noOfCol, colHead, colWidth){
		
		var IDHotContainer = document.getElementById(ID);
		
		IDHot = new Handsontable( IDHotContainer, {
			
				data : Handsontable.helper.createEmptySpreadsheetData(35,noOfCol),
				manualColumnResize: true,
				manualRowResize: true,
				//renderAllRows: true,
				renderAllColumns: false,
				autoRowSize: false,
				rowHeights: 25,
				autoColumnSize: true,
				colHeaders: colHead,
				rowHeaders:true,
				colWidths: colWidth,
				selectionMode: 'ranges',
				allowInsertColumn:false,
				minSpareCols:0,
				copyPaste: {pasteMode: '', rowsLimit: 10, columnsLimit: 5},
				stretchH:'all',
				autoWrapCol: true,
				outsideClickDeselects: true
			});
		IDHot.render();	
		globalHOTs.push(IDHot);
}

/*function loadHOT(HOTConfig){
		
		var IDHotContainer = document.getElementById(HOTConfig.ID);
		
		IDHot = new Handsontable( IDHotContainer, {
			
				data : Handsontable.helper.createEmptySpreadsheetData(35,HOTConfig.noOfCol),
				manualColumnResize: true,
				manualRowResize: true,
				//renderAllRows: true,
				renderAllColumns: true,
				autoRowSize: false,
				rowHeights: 25,
				autoColumnSize: true,
				colHeaders: HOTConfig.colHead,
				rowHeaders:true,
				colWidths: HOTConfig.colWidth,
				selectionMode: 'ranges',
				copyPaste: {pasteMode: '', rowsLimit: 10, columnsLimit: 5},
				stretchH:'all',
				autoWrapCol: true,
				outsideClickDeselects: true
			});
		IDHot.render();	
		globalHOTs.push(IDHot);
}*/
//Application declarations
"use strict";

