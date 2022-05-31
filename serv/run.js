/*const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('lime-cat.jpg').then((image) => {
	ctx.drawImage(image, 50, 0, 70, 70)

	console.log('<img src="' + canvas.toDataURL() + '" />')
})*/

// Import and initialize the express app
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1024, 768) 

// setup GET endpoint
app.get('/sign', (req, res) => {
	
	/**
	@TODO: this part should be replaced by actual code to randomly pick a verse/chapter combi */
	var text_ = "بسم الله الرحمن الرحيم";
		text_ += "\n";
		text_ += "In the Name of Allah, the Merciful, the Most Merciful";
	
 	var ctx = canvas.getContext('2d');
		 	ctx.font = '12px sans-serif';
		 	ctx.fillText(text_, 25, 25);
 	var w = ctx.measureText(text_).width;
 	var h = ctx.measureText(text_).height;
 	
 	fs.writeFileSync('./sign.png', canvas.toBuffer('image/png'));
// 	var image_ = canvas.toBuffer('mimeType: image/png');
// 	console.log(image_);
  
//  	res.writeHead(200, {
//		'Content-Type': 'image/png',
//		'Cache-Control': `immutable, no-transform, s-max-age=2592000, max-age=2592000` // 30 days cache
//	});
	res.sendFile(path.join(__dirname + '/sign.png'));
  	
  	//res.end(image_);
});

// Listen for requests
app.listen(port, () => {
  console.log(`app listening at ${port}`)
});