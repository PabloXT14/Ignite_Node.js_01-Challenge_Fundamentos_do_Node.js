import { parse } from 'csv-parse';
import fs from 'node:fs';
const csvFilePath = new URL('./tasks-example.csv', import.meta.url);
const csvFile = fs.createReadStream(csvFilePath);

const data = [];

const csvParse = parse({
  delimiter: ',',
  columns: true, // indica que a primeira linha contém o cabeçalho das colunas
})

csvFile
  .pipe(csvParse)
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(data);
  })
