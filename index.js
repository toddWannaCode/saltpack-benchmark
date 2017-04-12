const saltpack = require("saltpack"),
	  fs = require("fs"),
	  mt = require("microtime");

var time, alice, bob;

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

es.on('error', function (err) { throw err; })
ds.on('error', function (err) { throw err; })

es.once('data', () => {time = mt.now()});
ds.once('end', () => { time = mt.now() - time; fs.appendFile('data.txt', time + "\n");});

fs.createReadStream("file.txt").pipe(es)
es.pipe(ds.first_stream);
ds.pipe(fs.createWriteStream("file.out.txt"));
