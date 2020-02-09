var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler

exports.handler = function (event, context, callback) {
    let date_ob = new Date();                                   // in this part of the code i calculate the entries age(the user inserts the birthday year,month and day)
    var current_year = date_ob.getFullYear();
    var wanted_age = (event.birthdate).split(/[.,\/ -]/);
    var date_i_want;
    var IdOfTable1 ;
    for(var i=0; i< wanted_age.length; i++){
      if(wanted_age[i].length == 4){
        date_i_want = wanted_age[i];
      }
    }                                                           // here the code for the age ends
    
    let params_accounts = {
        TableName: "Table1Name",                         
        Limit: 1000
        };
        
    docClient.scan(params_accounts, function(err, data){
        if(err){
            callback(err,null);
        }
        else{
            var not_found_company = true;                           // i search the first table and if the company name exists then i save the id 
            for(var i=0; i < data.Items.length; i++){
                if(event.company_name == data.Items[i].company_name){           // the user will insert the entry he wants to update but the company name should exist
                    IdOfTable1 = data.Items[i].a_id;                           // in the table 1 so that it works, otherwise it doesn't change anything
                    console.log('found' + data.Items[i].a_id);
                    not_found_company = false;
                }
            }
            if(not_found_company){
                console.log("The company name you want to update does not exist.");
            }
            else{
                let paramsDB = {
                TableName: "Table2Name",                
                Key:{ 
                    c_id:event.id
                },
                UpdateExpression: "SET a_id= :a_id, first_name= :first_name,last_name= :last_name, company_name= :company_name, email= :email, phone1= :phone1, birthdate= :birthdate, age= :age",
                    ExpressionAttributeValues:{
                    ":a_id": IdOfTable1,
                    ":first_name": event.first_name,
                    ":last_name": event.last_name,                  //here i have some fields for example
                    ":company_name": event.company_name,            //here you see that i already have the a_id saved in the IdOfTable1 and also i found the age 
                    ":email": event.email,
                    ":phone1": event.phone1,
                    ":birthdate": event.birthdate,
                    ":age": current_year - date_i_want
                },
                        ReturnValues:"UPDATED_NEW"
            };

                docClient.update(paramsDB, onPost); // Update the item from DB
            }
        }
    
    });
 
    function onPost(err, data) {
        if (err) {
            console.error("Unable to update the item !" + JSON.stringify(err, null, 2));
        }
        else {
            console.log("Update the item !" + JSON.stringify(data, null, 2));
            callback(null, data);
        }
    }
};       