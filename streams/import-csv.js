import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvFilePathTest = new URL('./tasks-example.csv', import.meta.url);

const csvParse = parse({
  delimiter: ',',
  columns: true, // indica que a primeira linha contém o cabeçalho das colunas
  skip_empty_lines: true, // ignorar linhas vazias
});

async function createTasksOnDatabaseFromCSVFile(csvFilePath = '') {
  const csvFileReadStream = fs.createReadStream(csvFilePath);
  const linesParse = csvFileReadStream.pipe(csvParse);

  let tasks = []; 

  for await (const line of linesParse) {
    const { title, description } = line;

    tasks.push({
      title,
      description
    });

    // await fetch('http://localhost:3333/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title,
    //     description,
    //   })
    // })
  }

  console.log('CSV file successfully processed');

  return tasks;
}

createTasksOnDatabaseFromCSVFile(csvFilePathTest);

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

export { createTasksOnDatabaseFromCSVFile }