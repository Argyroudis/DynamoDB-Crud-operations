var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler
var docClient1 = new AWS.DynamoDB.DocumentClient(); // we need 2 because we will scan and delete entries from 2 tables
 
exports.handler = function(event, context, callback) {
    
    let paramsDB = {
      TableName: "Table1Name",       // insert the first table name here       accounts
      Key:{
            a_id:event.a_id          //the user will insert an id which is unique for every entry in the table
      }
    };
    
    let scanningParameters = {
        TableName: "Table2Name",     // insert the second table name here   contacts
        Limit: 50                    // the correlation between the 2 tables is that an entry in table 1 has many entries in table 2(same a_id) so when deleting an 
        };                           // entry in the forst table you need to first delete all the entries in table 2
    
    docClient1.scan(scanningParameters,function(err, data){
        if(err){                   
            callback(err,null);
        }else{
            data.Items.forEach((item) => { 
                if (item.a_id == paramsDB.Key.a_id) {    //searching in table 2 if the a_id exists
                    let z = item.c_id;
                        let paramsDB = {
                          TableName: "Table2Name",
                          Key:{
                          	c_id:z                      // we delete entries in the table 2 with their unique key so we need to find it for every entry
                      	  }
                        };
                        
                        docClient.delete(paramsDB,  function (err, data) {          //here we delete the entries in table 2 
                            if (err) {
                                console.log("print the unable to delete! " + JSON.stringify(data, null, 2));
                                console.error("Unable to delete the item !" + JSON.stringify(err, null, 2));
                            }
                            else {
                                console.log("Delete the item ! " + JSON.stringify(data, null, 2));
                                callback(null, "Data have been deleted");
                            }
                        });
                }
            });   
        }      
    });
    
    docClient.delete(paramsDB,  function (err, data) {                             // here we delete the entry we want from table 1
        if (err) {
            console.error("Unable to delete the item !" + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Delete the item ! " + JSON.stringify(data, null, 2));
            callback(null, "Data have been deleted");
        }
    }); 
};