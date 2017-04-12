var saltpack = require("saltpack");
var fs = require("fs")
var mt = require("microtime")

var alice, bob;
({alice, bob} = saltpack.lowlevel.util.alice_and_bob());

var es = new saltpack.stream.EncryptStream({
    encryptor: alice,
    do_armoring: true,
    recipients: [bob.publicKey]
})
var ds = new saltpack.stream.DecryptStream({decryptor: bob, do_armoring: true})

es.on('error', function (err) { throw err; })
ds.on('error', function (err) { throw err; })

var time;

es.once('data', () => time = mt.now() );
ds.once('close', () => time = mt.now() - time );

process.stdin.pipe(es)
es.pipe(ds.first_stream);
ds.pipe(process.stdout);
