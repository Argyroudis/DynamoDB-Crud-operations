
var AWS = require("aws-sdk");
var docClient1 = new AWS.DynamoDB.DocumentClient();   // DB connection handler

exports.handler = function(event, context, callback) {
 
    let paramsDB = {            // we are going to get all the entries in table 2 that has the a_id we want
      TableName: "Table1Name",         
      Key:{
            a_id:event.a_id
      }                                 
    };

    let scanningParameters = {
        TableName: "Table2Name",  
        Limit: 50
    };
    
    docClient1.scan(scanningParameters,function(err, data){
        if(err){
            callback(err,null);
        }else{
            var AllEntries = new Array();
            for(var i=0; i < data.Items.length; i++){           // searching the second table if the a_id is the one we search for
                if(event.a_id == data.Items[i].a_id){
                    console.log("Add a item.")
                    AllEntries.push(data.Items[i]);     //if yes we save it in AllEntries
                }
            }
            console.log(AllEntries);
            callback(null, AllEntries);
        }
    });
};