import fs from 'node:fs/promises';
import { Task } from '../models/Task.js';

const databasePath = new URL('./db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(error => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(tableName, data = new Task) {
    if (Array.isArray(this.#database[tableName])) {
      this.#database[tableName].push(data);
    } else {
      this.#database[tableName] = [data];
    }

    this.#persist();
  }

  select(tableName, search) {
    let data = this.#database[tableName] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  update(tableName, id, data) {
    const taskIndex = this.#database[tableName].findIndex(task => task.id === id);

    const taskExists = taskIndex !== -1;

    if (!taskExists)
      throw new Error(`Task with id not found`);

    this.#database[tableName][taskIndex] = {
      ...this.#database[tableName][taskIndex],
      ...data,
      updated_at: new Date(),
    }

    this.#persist();
  }

  delete(tableName, id) {
    const taskIndex = this.#database[tableName].findIndex(task => task.id === id);

    const taskExists = taskIndex !== -1;

    if (!taskExists) throw new Error(`Task with id not found`);

    this.#database[tableName].splice(taskIndex, 1);

    this.#persist();
  }

  complete(tableName, id) {
    const taskIndex = this.#database[tableName].findIndex(task => task.id === id);

    const taskExists = taskIndex !== -1;

    if (!taskExists) throw new Error(`Task with id not found`);

    this.#database[tableName][taskIndex].completed_at = new Date();

    this.#persist();
  }
}