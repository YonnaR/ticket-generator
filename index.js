const stringify =require('csv-stringify');
const fs = require('fs');
const pdf = require('template-pdf-generator');

main(750)

function main(nbr){
    let css = fs.readFileSync('./assets/style.css',{encoding:"utf-8"});
    let ids= generateId(nbr);
    let tmp = ""

    if(generateCsv(ids , nbr)){

        console.log(tmp)
        for (let i = 0; i < ids.length; i++) {
            const element = ids[i];
            tmp += parseDataToTickets(element)
        }
        generatePdf("<body>"+tmp+"</body>" , css); 
    }else{
        return "error"
    }

}

function generateCsv(ids , nbr){
    let CsvData = [];
    let columns = {
    Num: 'id',
    Nom: 'nom',
    Prenom:'prénom',
    Forfait:'Forfait'
    };
    console.log('generating CVS...')
    for (var i = 0; i < nbr; i++) {
        CsvData.push([ids[i], '....................','..................','..............']);
    }
    stringify(CsvData, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile('dist/liste-tickets.csv', output, (err) => {
        if (err) return err;
        console.log('liste-tickets.csv saved.');
    });
    });
    return true
}

function generateId(nbr){
    console.log('generating ID\'S...')
    let ids=[];
    for (let i = 0; i < nbr; i++) {
        let generatedId = Math.floor(Math.random() * (99999999) + 100000000)
        ids.push(generatedId)
    }
    return ids
}

function parseDataToTickets(ids){
    console.log('parsing Data Tickets...');
    let tmp = fs.readFileSync('./assets/ticket.html',{encoding:"utf8"});
    return tmp.split("{{ticketClient}}").join(ids);
}

function generatePdf(tmp , css ){
    console.log('generating PDF...');
    pdf([], tmp, css ,{}).pipe(fs.createWriteStream(`./dist/tickets.pdf`));        
}

