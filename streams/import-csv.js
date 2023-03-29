import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvFilePath = new URL('./tasks-example.csv', import.meta.url);
const csvFileReadStream = fs.createReadStream(csvFilePath);

const csvParse = parse({
  delimiter: ',',
  columns: true, // indica que a primeira linha contém o cabeçalho das colunas
  skip_empty_lines: true, // ignorar linhas vazias
});

async function createTasksOnDatabaseFromCSVFile() {
  const linesParse = csvFileReadStream.pipe(csvParse);

  for await (const line of linesParse) {
    const { title, description } = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

  console.log('CSV file successfully processed');
}

createTasksOnDatabaseFromCSVFile();

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