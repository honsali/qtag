"use strict";


$(document).ready(function () {
	initialize(ui_init); 
});

var workspace = [];
var qtag = {};
var stats = {};
stats.file=0; stats.local=0; stats.draft=0;

function initialize(callBack_){
    
	if (storageAvailable('localStorage')) {
		workspace = JSON.parse( read("qtag") );
		console.log("loaded localStorage qtag successfully")
		if(workspace === "undefined" || workspace == null || workspace === "null")
			workspace = [];
		console.debug(workspace);
		stats.local = workspace.length;
		
	}else
		alert('some functionality missing, local storage not available');
	//loads the local file
    loadJSON((response) => {
        // Parse JSON string into object
        qtag = JSON.parse(response);
        stats.file = qtag.data.length;
        console.log("loaded qtag.json successfully");
        console.log(qtag);
        console.log(qtag.tagList);
        callBack_();
    });
    
    updateStats();
}

function ui_init(){ 
	   //count();
	   // none(); //default choice
	   // for (var i = 0; i < allFilters.length; i++) {//
		generateFilterList();

	    $("#filterList").on("change", filterChanged);
	    $("#suraList").on("change", suraSelected);
	    $("#query").on("change", queryChanged);
	    initSuraList();
	    $("#suraList").hide();
	    $("#query").hide();
	    $(".aya_text").mouseup(getSelectionText);
	   // filterBy(allFilters[0].data);
}

function generateFilterList(){
	 for (var i = 0; i < qtag.tagList.length; i++) {//
	        $("#filterList").append('<option value="' + (i+4) + '">' + qtag.tagList[i].name + '</option');
	    }
}

function filterChanged() {
	console.log("filter changed");
	console.log(allFilters);
    $("#suraList").hide();
    $("#query").hide();
    var val = $("#filterList").val();
    switch (val) {
        case "1":
            showSuraList();
            break;
        case "2":
            all();
            break;
        case "3":
            showQuery();
            break;
        default:
            //filterBy(allFilters[val - 4].data);
        	filterBy(qtag.tagList[val-4].ename, qtag.data);
    }
}

function showSuraList() {
    $("#suraList").show();

}

function showQuery() {
    $("#query").val("");
    $("#query").show();
}


function initSuraList() {
    $("#suraList").empty();
    for (var i = 0; i < surat.length; i++) {//
        $("#suraList").append('<option value="' + i + '">' + surat[i] + '</option');
    }
}

function initFilters(){
	for(let i = 0 ; i < qtag.taglist.length; i++){
		allFilters.push(qtag.tagList[i].name);
	}
}
function i2ename(i){
	return qtag.tagList[i].ename;
}
function generateRow(data_, evenodd){
    var html = '' +
			    '<div class="row ' + evenodd + '">' +
			    '<div class="col-md-4 tag_space text-right">' + '' + '</div>' +
			    '<div class="col-md-6 aya_text text-right" >' + data_.text + '</div>' +
			    '<div class="col-xs-1 aya_number text-right" >' + data_.aya + '</div>' +
			    '<div class="col-md-1 sura_text text-right" suraId="' + data_.sura + '">' + surat[data_.sura] + '</div>' +
			    '</div>';
    return html;
}

function all() {
    $("#rowList").empty();
    for (var i = 0; i < data.length; i++) {//
        var evenodd = i % 2 == 0 ? "even" : "odd";
        var html = generateRow(data[i], evenodd);
        $("#rowList").append(html);
    }
    $(".aya_text").mouseup(getSelectionText);
}

function none() {
    $("#rowList").empty();
    $("#sidework").empty();
}

function suraSelected() {
	$("#rowList").empty();
    var id = $("#suraList").val();
    var suraId = parseInt(id); 
    for (var i = 0; i < data.length; i++) {//data.length
        if (data[i].sura === suraId) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            var html = generateRow(data[i], evenodd);
            $("#rowList").append(html);
        }
    }
    $(".aya_text").mouseup(getSelectionText);
}

function queryChanged() {
    var q = $("#query").val();
    if (q && q.length > 2) {
        $("#rowList").empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].text.indexOf(q) > -1) {
                var evenodd = i % 2 == 0 ? "even" : "odd";
                var html = generateRow(data[i], evenodd);
                $("#rowList").append(html);
            }
        }
    } else if (!q || q === '') {
        $("#rowList").empty();
    }

    $(".aya_text").mouseup(getSelectionText);
}

/*function filterBy(filterList) {
    $("#rowList").empty();
    for (var i = 0; i < filterList.length; i++) {//data.length
        var x = filterList[i];
        console.log(x);
        console.log(x.sura);
        console.log(x.aya);
        var y = _.find(data, {sura: x.sura, aya: x.aya});
        console.log(y);
        if (y) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            var html = generateRow(i, data, evenodd); 
            $("#rowList").append(html);
        }
    }
    $(".aya_text").mouseup(getSelectionText);
}*/
//since v0.2
function filterBy(tag, dataList) {
    console.log("filterBy: "+tag); 
    $("#rowList").empty();
    //first get the subset of the qtag.json by tag 
    var tagDataList = _.filter(dataList, function(myObject){
        return myObject.tag === tag;
    });
    console.log(tagDataList);
    for (var i = 0; i < tagDataList.length; i++) {//data.length
        var x = tagDataList[i]; 
        console.log(x); 
        var y = _.find(data, {sura: x.sura, aya: x.aya});
        console.log(y);
        if (y) {
            var evenodd = i % 2 == 0 ? "even" : "odd";
            var html = generateRow(y, evenodd); 
            $("#rowList").append(html);
        }
    }
    $(".aya_text").mouseup(getSelectionText);
}

function getSelectionText(e) {
	//console.log(e);
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    var all = $(this).text();
    var nn = $(this).next().next().attr("suraId");
    var n = $(this).next().text();
    var i = all.indexOf(text);
    if(i == text.length){
    	console.log( "aborted, useless selection");
    	return null;
	}
    console.log("{sura:"+nn+", aya:"+n+", from:"+i+",to:"+text.length+"},"); 
    //v1.0
    var loci = {};
	    loci.sura 	= parseInt(nn);
	    loci.aya 	= parseInt(n);
	    loci.from 	= i;
	    loci.to 	= text.length; 
	    if(text.length == all.length){
	    	loci.fullAya = 1;
	    	loci.text = "كل الأية";
	    }else
		    loci.text = text;
    	//loci.id = loci.sura+"."+loci.aya+"."+loci.from+"."+loci.to;
    
    appendToSideWork(e.target, loci);
}


function save(){ 
	write("qtag", JSON.stringify(workspace));
	stats.draft = 0;
	stats.local = workspace.length;
	updateStats();
}

function download(){
	console.log("preparing download");
	//console.debug(workspace);
	console.debug(qtag.data);
//	var mem = JSON.parse( read("qtag"));
//	console.debug(mem);
	qtag.data = [ ...qtag.data, ...JSON.parse( read("qtag")) ];
//	console.debug(newData);
//	qtag.data = newData;
	console.debug("printing output");
	console.debug(qtag);
	executeDownload(qtag, "qtag.json");
}


/**
 *************************************************************************************		deprecated
 */
/*
function count(){
    var allChar = 0;
    var selectedChar=0;

    for (var i = 0; i < allFilters.length; i++) {
        for (var j = 0; j < allFilters[i].data.length; j++) {
            selectedChar = selectedChar +allFilters[i].data[j].to;
        }
    }
    for (var i = 0; i < data.length; i++) {
        allChar = allChar +data[i].text.length;
    }

    console.log(selectedChar * 100 / allChar);
}*/
