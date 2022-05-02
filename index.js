// Initalize MongoDB
const MongoClient = require("mongodb").MongoClient;

// Set default database information
let url = '';
let database = '';
let collection = '';

// Setters for database information
export function setURL(inp_url) {
  url = inp_url;
}

export function setDatabase(inp_db) {
  database = inp_db;
}

export function setCollection(inp_collect) {
  collection = inp_collect;
}



// Databases
export function addDatabase(inpDatabase = database, inpCollection = collection, inpURL = url) {
  databaseCheck('createDatabase', inpDatabase);
  collectionCheck('createDatabase', inpCollection);
  urlCheck('createDatabase', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      db.createCollection(inpCollection, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while inserting into collection."})}
        resolve({
          "created": true,
          "database": inpDatabase
        });
      });
    });
  });
}

export function removeDatabase(inpDatabase = database, inpURL = url) {
  databaseCheck('createDatabase', inpDatabase);
  urlCheck('createDatabase', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      db.dropDatabase((err, res) => {
        resolve({
          "database": inpDatabase
        });
      });
    });
  });
}



// Collections
export function addCollection(inpCollection = collection, inpDatabase = database, inpURL = url) {
  collectionCheck('createCollection', inpCollection);
  databaseCheck('createCollection', inpDatabase);
  urlCheck('createCollection', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      db.createCollection(inpCollection);
      resolve({
        "created": true,
        "database": inpDatabase,
        "collection": inpCollection
      });
    });
  });
}

export function removeCollection(inpCollection = collection, inpDatabase = database, inpURL = url) {
  collectionCheck('createCollection', inpCollection);
  databaseCheck('createCollection', inpDatabase);
  urlCheck('createCollection', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.drop((err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while removing the collection."})}
        resolve({
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}



// Documents
export function addDocument(document = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  documentCheck('addDocument', document);
  collectionCheck('addDocument', inpCollection);
  databaseCheck('addDocument', inpDatabase);
  urlCheck('addDocument', inpURL);
  return new Promise(resolve => {
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
  documentsCheck('addDocuments', documents);
  collectionCheck('addDocuments', inpCollection);
  databaseCheck('addDocuments', inpDatabase);
  urlCheck('addDocuments', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.insertMany(documents, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while inserting into collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "documents": documents,
          "database": inpDatabase,
          "collection": inpCollection
        });
      });
    });
  });
}

export function updateDocument(query = {}, newValues = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('removeDocument', query);
  documentCheck('addDocument', newValues);
  collectionCheck('removeDocument', inpCollection);
  databaseCheck('removeDocument', inpDatabase);
  urlCheck('removeDocument', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      newValues = {$set: newValues};
      collect.updateOne(query, newValues, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while updating documents inside collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "document": res,
          "query": query,
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}

export function updateDocuments(query = {}, newValues = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('removeDocument', query);
  documentCheck('addDocument', newValues);
  collectionCheck('removeDocument', inpCollection);
  databaseCheck('removeDocument', inpDatabase);
  urlCheck('removeDocument', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      newValues = {$set: newValues};
      collect.updateMany(query, newValues, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while updating documents inside collection."})}
        resolve({
          "query": query,
          "document": res,
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}

export function removeDocument(query = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('removeDocument', query);
  collectionCheck('removeDocument', inpCollection);
  databaseCheck('removeDocument', inpDatabase);
  urlCheck('removeDocument', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.deleteOne(query, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while removing documents inside collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "query": query,
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}

export function removeDocuments(query = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('removeDocument', query);
  collectionCheck('removeDocument', inpCollection);
  databaseCheck('removeDocument', inpDatabase);
  urlCheck('removeDocument', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDBs."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);
      collect.deleteMany(query, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while removing documents inside collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "query": query,
          "database": inpDatabase,
          "collection": inpCollection
        })
      });
    });
  });
}



// Finding (Sorting / Limits / Joining)
export function findOne(query = {}, projection = {}, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('findOne', query);
  collectionCheck('findOne', inpCollection);
  databaseCheck('findOne', inpDatabase);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);

      collect.findOne(query, projection, (err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while finding documents in collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "database": inpDatabase,
          "collection": inpCollection,
          "result": res
        });
      });
    });
  });
}

export function findAll(query = {}, projection = {}, limit = 1000, inpCollection = collection, inpDatabase = database, inpURL = url) {
  queryCheck('findAll', query);
  collectionCheck('findAll', inpCollection);
  databaseCheck('findAll', inpDatabase);
  urlCheck('findAll', inpURL);
  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(inpCollection);

      collect.find(query, projection).limit(limit).toArray((err, res) => {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while finding documents in collection."})}
        resolve({
          "acknowledged": res.acknowledged,
          "database": inpDatabase,
          "collection": inpCollection,
          "results": res
        });
      });
    });
  });
}

export function join(joinCollectionInfo, foreignJoinCollectionInfo, inpDatabase = database, inpURL = url) {
  const joinCheck = (info) => {
    if (info) { throw new Error(`Mongo info: ${(info == joinCollectionInfo) ? 'mainjoinCollectionInfo' : 'joinjoinCollectionInfo'} cannot be blank`) }
    if (info.database) { throw new Error(`Mongo info: ${(info == joinCollectionInfo) ? 'mainjoinCollectionInfo' : 'joinjoinCollectionInfo'}.database cannot be blank`) }
    if (typeof info.database != 'string') { throw new Error(`Mongo info: ${(info == joinCollectionInfo) ? 'mainjoinCollectionInfo' : 'joinjoinCollectionInfo'}.database must be a string`) }
    if (info.field) { throw new Error(`Mongo info: ${(info == joinCollectionInfo) ? 'mainjoinCollectionInfo' : 'joinjoinCollectionInfo'}.field cannot be blank`) }
    if (typeof info.field != 'string') { throw new Error(`Mongo info: ${(info == joinCollectionInfo) ? 'mainjoinCollectionInfo' : 'joinjoinCollectionInfo'}.field must be a string`) }
    if (info == joinCollectionInfo) {
      if (info.joiningField) { throw new Error(`Mongo info: mainjoinCollectionInfo.joiningField cannot be blank`) }
      if (typeof info.joiningField != 'string') { throw new Error(`Mongo info: mainjoinCollectionInfo.joiningField must be a string`) }
    }
  }

  joinCheck(joinCollectionInfo);
  joinCheck(foreignJoinCollectionInfo);
  databaseCheck('join', inpDatabase);
  urlCheck('join', inpURL);

  return new Promise(resolve => {
    MongoClient.connect(inpURL, (err, client) => {
      if (err) {resolve({"error":err,"error_info":"Error while connecting to MongoDB."})}
      const db = client.db(inpDatabase);
      const collect = db.collection(joinCollectionInfo);
      collect.aggregate([{
        $lookup: {
          from: foreignJoinCollectionInfo.database,
          localField: joinCollectionInfo.field,
          foreignField: foreignJoinCollectionInfo.field,
          as: joinCollectionInfo.joinField
        }
      }]).toArray(function(err, res) {
        client.close();
        if (err) {resolve({"error":err,"error_info":"Error while finding join collections."})}
        resolve(res);
      });
    });
  });
}

export function sort(results, sort = { _id: -1 }) {
  if (results && results.result) {throw new Error(`Mongo sort: results must be an array`)}
  if (Array.isArray(results.result))  {throw new Error(`Mongo sort: results must be an array`)}
  if (results.result.length === 0)  {throw new Error(`Mongo sort: results cannot be blank`)}

  return results.result.sort(sort);
}





/* Error Checking */
function urlCheck(funcName = 'Function', inpURL = url) {
  if (typeof inpURL != 'string')  {throw new Error(`Mongo ${funcName}: url must be a string`)}
  if (inpURL == '')  {throw new Error(`Mongo ${funcName}: url cannot be blank`)}
}

function databaseCheck(funcName = 'Function', inpDatabase = database) {
  if (typeof inpDatabase != 'string')  {throw new Error(`Mongo ${funcName}: database must be a string`)}
  if (inpDatabase == '')  {throw new Error(`Mongo ${funcName}: database cannot be blank`)}
}

function collectionCheck(funcName = 'Function', inpCollection = collection) {
  if (typeof inpCollection != 'string')  {throw new Error(`Mongo ${funcName}: collection must be a string`)}
  if (inpCollection == '')  {throw new Error(`Mongo ${funcName}: collection cannot be blank`)}
}

function documentCheck(funcName = 'Function', inpDocument = {}) {
  if (typeof inpDocument != 'object')  {throw new Error(`Mongo ${funcName}: document must be an object`)}
  if (inpDocument == {})  {throw new Error(`Mongo ${funcName}: document cannot be blank`)}
}

function documentsCheck(funcName = 'Function', inpDocuments = [{}]) {
  if (!Array.isArray(inpDocuments)) {throw new Error(`Mongo ${funcName}: documents must be an array`)}
  if (inpDocuments.length === 0)  {throw new Error(`Mongo ${funcName}: documents cannot be blank`)}
  inpDocuments.forEach((inpDocument) => {
    if (typeof inpDocument != 'object') {throw new Error(`Mongo ${funcName}: every document must be an object`)}
    if (inpDocument == {}) {throw new Error(`Mongo ${funcName}: every document must have content`)}
  });
}


function queryCheck(funcName = 'Function', query = {}) {
  if (typeof query != 'object') {throw new Error(`Mongo ${funcName}: every document must be an object`)}
}

function limitCheck(funcName = 'Function', inpLimit = 1000) {
  if (typeof inpLimit != 'number')  {throw new Error(`Mongo ${funcName}: limit must be a number`)}
}