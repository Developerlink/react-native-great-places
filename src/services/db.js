import * as SQLite from "expo-sqlite";

// When this file is imported anywhere it will execute this
// which will create a db if it does not already exists.
const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

const insertPlace = async (id, title, imageUri, address, latitude, longitude) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (id, title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?);",
        [id, title, imageUri, address, latitude, longitude],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

const getPlaces = async () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, title, imageUri, address, latitude, longitude FROM places;",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

const deletePlaces = async () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM places",
            [],
            (_, result) => {
                resolve(result);
            },
            (_, error) => {
                reject(error);
            } 
            )
        })
    })

    return promise;
}

const dbAgent = {
  insertPlace,
  getPlaces,
  deletePlaces
};

export default dbAgent;
