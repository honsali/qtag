
const fs = require('fs'); 
const path = require('path'); 
const { createCanvas } = require('canvas')
 
var file = fs.readFileSync('../_data/quran-simple-clean.txt', 'utf8');
var raw = file.split('\n');


var en = fs.readFileSync('../_data/en.qaribullah.txt', 'utf8');
en = en.replaceAll('"', '\'');
var raw_en = en.split('\n');

var metrics = [];

const maxLine = 6235; 
const maxWidth = 1024;
const maxHeight = 384;

var m = "chapter, verse, ar-txt-len, ar-m, en-txt-len, en-m";
metrics.push (m);

for(var i = 0; i < maxLine ; i++){
	
	m = "";
	
	var line_ar = raw[i].split('|');
	var line_en = raw_en[i].split('|');
	
	var c = line_ar[0];
	var v = line_ar[1];
	
	var txt_ar = line_ar[2];
	var txt_en = line_en[2];
	 
	
	var header = '['+ c + '['+ v +']'+']'
	
	const canvas = createCanvas(maxWidth, maxHeight);

	
 	var ctx = canvas.getContext('2d');
		 	ctx.font = '12px sans-serif';
		 	ctx.textAlign = 'center;';
	
	ctx.strokeRect(0, 0, maxWidth, maxHeight);
	var m, h, mar, men;
	m = ctx.measureText(header);
	h = m.emHeightAscent + m.emHeightDescent + 5;
	ctx.fillText(header, (maxWidth + m.width)/2,  h);
	
	
	mar = ctx.measureText(txt_ar); 
	men = ctx.measureText(txt_en);
	console.log("printing metrics for arabic");
	console.log(mar);
	 
	if( (mar.width / maxWidth) < 1 && (men.width / maxWidth) < 1){			// case both fit
		ctx.fillText(txt_ar, maxWidth - mar.width - 25, h * 2);
		ctx.fillText(txt_en, 0 + 25, h * 3);
	}else{
		console.log('branching into long text');
		
		var arLines = getLines(ctx, txt_ar, maxWidth, 50);
		for(var l=0; l < arLines.length; l++){
			var tmp = ctx.measureText(arLines[l]);
			ctx.fillText(arLines[l], maxWidth - tmp.width - 25, h * (2+l)); 
		}
			
		var enLines = getLines(ctx, txt_en, maxWidth, 30);
		for(var ll=0; ll < enLines.length; ll++)
			ctx.fillText(enLines[ll], 0 + 25, h * (2 + l + ll));
	}
	
	
	var fileName = '../_data/img/'+c+'-'+v+'-sign.png';
	
 	fs.writeFileSync(fileName, canvas.toBuffer('image/png'));
 	
 	
	console.log('generated ' + fileName);
	
	
	m = c + ',' + v + ',' + txt_ar.length + ',' + mar.width + ',' + txt_en.length + ',' + men.width + '\n';
	metrics.push(m);
	
}

fs.writeFileSync('../_data/img/report.csv', metrics.toString());
	
function getLines(ctx, text, maxWidth, adj = 0) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
       // console.log("DEBUG: " + word + " >> (" + width + ") >> " + currentLine + " ")
        if (width + adj < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    console.log(lines);
    return lines;
}
 	
// 	var image_ = canvas.toBuffer('mimeType: image/png');
// 	console.log(image_);
  
//  	res.writeHead(200, {
//		'Content-Type': 'image/png',
//		'Cache-Control': `immutable, no-transform, s-max-age=2592000, max-age=2592000` // 30 days cache
//	}); 
  	 