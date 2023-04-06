import fs from 'node:fs/promises';

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

  async #persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(tableName, data) {
    if (Array.isArray(this.#database[tableName])) {
      this.#database[tableName].unshift(data);
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
          if (!value) return true;

          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  find(tableName, id) {
    const task = this.#database[tableName].find(task => task.id === id);

    return task;
  }

  update(tableName, id, data) {
    const taskIndex = this.#database[tableName].findIndex(task => task.id === id);

    this.#database[tableName][taskIndex] = {
      ...this.#database[tableName][taskIndex],
      ...data,
      updated_at: new Date(),
    }

    this.#persist();
  }

  delete(tableName, id) {
    const taskIndex = this.#database[tableName].findIndex(task => task.id === id);

    this.#database[tableName].splice(taskIndex, 1);

    this.#persist();
  }
}