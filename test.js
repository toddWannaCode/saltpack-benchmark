var saltpack = require('saltpack')
var mt = require("microtime")

var alice, bob;
({alice, bob} = saltpack.lowlevel.util.alice_and_bob());
let es = new saltpack.stream.EncryptStream({
    encryptor: alice,
    do_armoring: true,
    recipients: [bob.publicKey]
})
let ds = new saltpack.stream.DecryptStream({
    decryptor: bob, 
    do_armoring: true
})
//Simply to avoid confusing decodes
A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';A+=A.toLowerCase();
rand=n=>{o='';for(i=0;i<n;i++)o+=A[~~(A.length*Math.random())]; return o};
err = l=>e=>console.dir({from:l,err:e})
es.on('error', err('es'))
ds.on('error', err('ds'))
es.pipe(ds.first_stream);

out='';

ds.on('end',end);
ds.on('data',o=>{out+=''+o})
data=rand(1024);

start=mt.now();
es.write(data);es.end();

function end(){
    end=mt.now();
    if(data!=(out+'')){
        console.log('Invalid output!');
        console.dir({data,out})
    }
  console.log(`${data.length} chars in ${end-start}uS`)
  require("fs").appendFile('data.txt', end-start + "\n")
}