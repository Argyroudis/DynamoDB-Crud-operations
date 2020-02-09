var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient(); // DB connection handler
var docClient1 = new AWS.DynamoDB.DocumentClient(); 
var uuid = require('uuid');

exports.handler = function (event, context, callback) {
    var generated_id=uuid.v1();                                 //we  need these 2 lines to create a unique id
    var c_id=generated_id.substring(0,8);                       //we  need these 2 lines to create a unique id

    let date_ob = new Date();                                   // in this part of the code i calculate the entries age(the user inserts the birthday year,month and day)
    var current_year = date_ob.getFullYear();
    var wanted_age = (event.birthdate).split(/[.,\/ -]/);
    var date_i_want;
    for(var i=0; i< wanted_age.length; i++){
        if(wanted_age[i].length == 4){
          date_i_want = wanted_age[i];
        }
    }                                                           //here the code for the age stops

    var id2;    // here is the code that searchs for the company name
    let scanningParameters = {
        TableName: "Table1Name",                                             
        Limit: 500
    };
    
    docClient1.scan(scanningParameters,function(err, data){
        if(err){
            callback(err,null);
        }else{
            var not_found_company = true;
            data.Items.forEach((item) => {
                if (item.company_name == event.company_name) {      //if the company name exists ti saves the unique id for the company 
                    id2= item.a_id;  
                    not_found_company = false;  
                }                                              
            });
            if(not_found_company){
                console.log("The company name you insert does not exists");         //if it doesn't exists the code doesn't post
            }
            else{
                var params = {
                    TableName: "Table2Name",                                    
                    Key: {
                        "c_id": c_id.toString()
                    },
                    UpdateExpression: "SET  a_id= :id3, age= :ag, birthdate= :bth, company_name= :cn, email= :ml, first_name= :fn",  //here you insert the fields you want to
                    ExpressionAttributeValues:{
                        ":id3":id2,
                        ":ag":current_year - date_i_want,
                        ":bth":event.birthdate,
                        ":cn":event.company_name,                   //here you insert the fields you want to 
                        ":ml":event.email,
                        ":fn":event.first_name
                    },
                   
                };
                //here the code for the new entry stops and i begin the search in table 2 so that if the entry already exists to not re-entry it
               let scanningParameters2 = {
                    TableName: "Table2Name",
                    Limit: 200
                };
               
               docClient.scan(scanningParameters2,function(err, data){
                    if(err){
                        callback(err,null);
                    }
                    else{  //here i search if it exists
                      var contactexistsmaybe = true;  
                      for(var i=0; i < data.Items.length; i++){
                        if(event.first_name == data.Items[i].first_name){           // you can use as many fields you want to do the check using && 
                            contactexistsmaybe=false;
                        }
                      }//the search ends
                      if(contactexistsmaybe){ 
                      //here i insert my new entry if it doesn't already exists
                      docClient.update(params, function(err, data) {
                      if (err) {
                        console.log("Error", err);
                      }
                      else {
                        console.log("Successfully created.", params);
                      }
                      });
                      }else{
                        console.log("The contact already exists");
                      }
                    }
                });

            }

        }
    });

};