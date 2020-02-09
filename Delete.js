var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler

exports.handler = function(event, context, callback) {
    let paramsDB = {
      TableName: "the_table_name",        // insert the table name here
      Key:{
      	c_id:event.id                   //when calling the lambda you should insert the c_id so that the code will find which entry to delete
  	  }
 
    };
    
    docClient.delete(paramsDB,  function (err, data) {
        if (err) {
            console.log("print the unable to delete! " + JSON.stringify(data, null, 2));
            console.error("Unable to delete the item !" + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Delete the item ! " + JSON.stringify(data, null, 2));
            callback(null, "Data have been deleted");
        }
    }); 
};