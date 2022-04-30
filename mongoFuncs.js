// Initalize MongoDB
const MongoClient = require("mongodb").MongoClient;

// Set default database information
let url = '';
let database = '';
let collection = '';

// setters for database information
export function setURL(inp_url) {
  url = inp_url;
}

export function setDatabase(inp_db) {
  database = inp_db;
}

export function setCollection(inp_collect) {
  collection = inp_collect;
}

// Database
export function createDatabase(inpDatabase = '', inpURL = url) {
  let dbURL = `${inpURL}/${inpDatabase}`;
  return new Promise(resolve => {
    MongoClient.connect(dbURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      resolve({
        "created": true,
        "database": inpDatabase
      });
      client.close();
    });
  });
}

// Collections
export function createCollection(inpCollection = '', inpDatabase = database, inpURL = url) {
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      db.createCollection(inpCollection)
    });
  });
}

// Insert
export function addDocument(document = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  return new Promise(resolve => {
    if (typeof document != 'object') {resolve({"error":"document isn't an object!"})}
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.insertOne(document, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while inserting into collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "document": document,
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}

export function addDocuments(documents = [{}], inpCollection = collection, inpDatabase = database, inpURL = url) {
  return new Promise(resolve => {
    if (!Array.isArray(documents)) {resolve({"error":"documents isn't an array!"})}
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.insertMany(documents, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while inserting into collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "document": document,
          "database": inpDatabase,
          "collection": inpCollection
        });
      });
    });
  });
}

// Find

export function findOne(query = {}, projection = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);

      collect.findOne(query, projection, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while inserting into collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "document": document,
          "database": inpDatabase,
          "collection": inpCollection
        });
      });
    });
  });
}

export function findAll() {}