/**
 * 

 * 
 * 
 * Design decisions:
	 * do you tag the whole aya or part of it? both can be done with selection of parts, it can be inferred if whole aya
	 * does the tool allow you to save your work? yes
	 * do you come up with tags on the fly or you have to configure + reload the app? can be added on the fly, but not in v1.0, rather v2.0 or before
 */

 
function updateStats(){
	console.log('updating stats');
	console.log(stats);
	var span_stats = document.querySelector("#stats");
	span_stats.innerHTML = stats.file + " | " + stats.local + " | " + stats.draft;
}

function appendToSideWork(eventTarget, loci){
	//generating the whole thing
	var complex = document.createElement("div");
	complex.classList="tagElement";
	var tagSelect = generateTagSelect();
	complex.append(tagSelect);
	var deleter = document.createElement("button");
	deleter.classList = "btn-delete";
	deleter.innerHTML = "X";
	deleter.addEventListener("click", function(e){ 
		e.composedPath()[1].parentNode.removeChild(e.composedPath()[1]); 
	});
	complex.append(deleter);
	/*var saver = document.createElement("button");
	saver.classList = "btn-save";
	saver.innerHTML = "O";
	saver.addEventListener("click", function(e){ 
		var loci = e.composedPath()[1].dataSet;
		if("tag" in loci){
			workspace.push(loci);
			console.log(loci);
			e.target.style.display = 'none'; //we don't need to save anymore 
		} else{
			alert('اختر واجدة')
		}
	});
	complex.append(saver);*/
	var tagText = document.createElement("span");
	tagText.innerHTML = "[ " + loci.text + " ]";
	complex.append(tagText);
	//
	complex.dataSet = loci;
	//adding to the document
	eventTarget.parentNode.querySelector('.tag_space').append(complex);
	console.log();
	console.log(loci);
	
}



function generateTagSelect(){
	var tagListSelect = document.createElement("select");	
	tagListSelect.classList = "tagList"; 

	var option = document.createElement("option");
	option.innerHTML = " ";
	option.value = "";
	tagListSelect.appendChild(option); 
	
	for(var i =0; i<qtag.tagList.length; i++){
		var option = document.createElement("option");
		option.innerHTML = qtag.tagList[i].name;
		option.value = qtag.tagList[i].ename;
		tagListSelect.appendChild(option); 
	}  

	var option = document.createElement("option");
	option.innerHTML = " (جديد) ";
	option.value = "-1";
	tagListSelect.appendChild(option); 
	
	tagListSelect.addEventListener("change", function(e){
		console.log(e); 
		var isNew = 0;
		var selected = e.target.options[e.target.selectedIndex].value;
		var selectedText = e.target.options[e.target.selectedIndex].innerHTML;
		//console.log(selected);
		if (selected == -1) {
			selectedText = window.prompt("ما هو اسم الصنف بالعربية؟", "");
			selected = window.prompt("what is the tag name in english?", "");
			isNew = 1;
		}
		if(selected == "") return;
		if(isNew == 1){
			qtag.tagList.push({name:selectedText, ename:selected});
		}
		//
		var loci = e.composedPath()[1].dataSet;
		loci.tag = selected;
		e.composedPath()[1].dataSet = loci;
		workspace.push(loci);
		console.log(loci);
		stats.draft = stats.draft + 1;
		updateStats();
		//
		var span = document.createElement("span");
		span.classList = "tag";
		span.innerHTML = selectedText;
		e.target.before(span);
		e.target.style.display = "none";
		//console.log(e);  
	})
	return tagListSelect;
}



function executeDownload(target_, fileName){
	var output_ = "data:text/json;charset=utf-8,";
	output_ += encodeURIComponent( JSON.stringify(target_, null, "\t") );  
	var link = document.createElement("a");
	link.setAttribute("href", output_);
	link.setAttribute("target", "_blank");
	link.setAttribute("download", fileName);
	document.body.appendChild(link);
	link.click();
}





/**
 * LOCAL STORAGE UTILs
 */
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

function write(key, obj){
	if (storageAvailable('localStorage')) {
		localStorage.setItem(key, obj);
	}
	else {
		console.log('..storage not supported: save '+key);
	}
}

function read(key){
	if (storageAvailable('localStorage')) {
		return localStorage.getItem(key);
	}
	else {
		console.log('..storage not supported: load '+key);
	}
}

const loadJSON = (callback) => {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'qtag.json', true);
    // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback 
            // as .open() will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
 