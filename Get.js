var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler

exports.handler = function (event, context, callback) {
    console.log(event);
    let paramsDB = {
        TableName: "TableName",
        Key:{
             c_id:event.id      //you insert the id of the entry you want to find
        }
    };
 
    function onGet(err, data) {
        if (err) {
            console.error("Unable to get the item !" + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Retrieved the item !" + JSON.stringify(data, null, 2));
            callback(null, data);
        }
    }
    docClient.get(paramsDB, onGet); // Get item from DB
};