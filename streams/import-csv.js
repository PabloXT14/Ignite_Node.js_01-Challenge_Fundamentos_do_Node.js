import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvFilePathTest = new URL('./tasks-example.csv', import.meta.url);

async function converteCSVToJS(csvFilePath = '') {
  // criando config do csv-parse aqui para que seja possível converter um arquivo csv toda vez que a função for chamada
  const csvParse = parse({
    delimiter: [',', ';'],
    encoding: 'utf8', // codificação do arquivo
    skipEmptyLines: true, // ignorar linhas vazias
    columns: ['title', 'description'], // indica que a primeira linha contém o cabeçalho das colunas
    fromLine: 2
  });

  const csvFileReadStream = fs.createReadStream(csvFilePath);
  const linesParse = csvFileReadStream.pipe(csvParse);


  let tasks = []; 

  for await (const line of linesParse) {
    const { title, description } = line;

    tasks.push({
      title,
      description
    });
  }

  console.log('CSV file successfully processed');

  csvParse.end(); // finalizando a stream de conversão com o csv parse 
  return tasks;
}

//converteCSVToJS(csvFilePathTest);

// # Outra maneira de executar o csvParse
// const data = [];
// csvFileReadStream
//   .pipe(csvParse)
//   .on('data', (row) => {
//     data.push(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//     console.log(data);
//   });

export { converteCSVToJS }