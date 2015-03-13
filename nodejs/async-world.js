var fs = require("fs");
console.log("Vou ler", Date.now());
console.time("leitura");

// var file = fs.readFileSync("file.zip");
fs.readFile('file.zip', function(err, data){
    console.log(data);
});

console.timeEnd("leitura");
console.log("Ja li", Date.now());
￼

// assincrono não trava o processo, porque ele lê o file.zip e continua os processos..