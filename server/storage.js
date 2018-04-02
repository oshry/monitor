const MongoClient = require('mongodb').MongoClient;
//var dateFormat = require('dateformat');
const url = 'mongodb://localhost:27017';
const dbName = 'monitor_log';
//Storage data to db
class Storage{
    constructor() {}
    save(data){
            // Separate the query parameters before you save them
            var query = {};
            query = JSON.parse(data.query);
            data = Object.assign(data, query);
            delete data.query;
            console.log(data);
            MongoClient.connect(url, (err, client) => {
                const db = client.db(dbName);
                db.collection(dbName).insertOne(data).then((result) => {
                    client.close(result);
                });
            });
    }
    isUnique(data){
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            var test ={};
            test = db.collection(dbName).find(
                { action : data.action }
            );
            console.log(test);
        });

    }
}
module.exports = Storage