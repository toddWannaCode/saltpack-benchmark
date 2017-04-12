const fs = require('fs');
rand = n => {
	o='';
	for(let i=0;i<n;i++)
		o+=String.fromCharCode(~~(62*Math.random()) + 65); 
	return o
}; 
let f = fs.createWriteStream('file.txt');
f.write(rand(512));
f.close();
