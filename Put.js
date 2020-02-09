var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler

exports.handler = function (event, context, callback) {
    console.log(event);
    let paramsDB = {
        TableName: "TableName",
        Key:{
            a_id:event.id //i point the item with the unique id value which i want to update
        },
        UpdateExpression: "SET company_name= :cn, zipcode= :zc",
        //with the set expression I can decide how many attributes and which i want to change
        ExpressionAttributeValues:{
            ":cn":event.company_name,       //i have put some fields for example 
            ":zc":event.zipcode,
        },
                ReturnValues:"UPDATED_NEW"
    };

    function onPost(err, data) {
        if (err) {
            console.error("Unable to update the item !" + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Update the item !" + JSON.stringify(data, null, 2));
            callback(null, data);
        }
    }

    docClient.update(paramsDB, onPost); // Update the item from DB
};