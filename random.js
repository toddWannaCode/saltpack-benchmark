var fs = require('fs');
rand = n => {
	o='';
	for(i=0;i<n;i++)o+=String.fromCharCode(~~(222*Math.random()) + 32); 
	return o
}; 
let f = fs.createWriteStream('file.txt');
f.write(rand(512));
f.close();
