# DynamoDB-Crud-operations
In these operations there is code that does the crud operations in 2 tables using node.js, each one has a unique id but also 
they connect because the second table has as a field the unique id of the first table and also another same field called company
name.The difference of the special operations as i named them is that they are using both tables in order to do a different operation 
version than the common.
The example is that in first table we have companies and in second we have the employee of the companies.The 2 tables has in common the 
unique id and the company name field of the companies table as fields in the employee table.

Delete: a normal version of a delete operation.

DeleteIn2Tables: Here we have 2 tables and before we delete an entry in table 1 we first delete all entries in table 2 that have the
same id in their field.

Get: a normal version of a get operation.

GetSpecial: In this operation we are getting all entries in table 2 that have the unique id of the first table.

PostSpecial: This is the create operation but with some changes. First there is a part in the code tha calculates the age of the person in the entry from his birthday. Also it creates the unique id and it searches the table in order to find if the company name already exists( because in this example the new entry should be in an already existing company). If the company exists it saves the table 1 unique id. Then the code does an check if the entry you want to enter already exists. Finally if the company name exists and the entry is not the same with one that already exists the code posts the entry otherwise it doesn't.

Put: a normal version of a put operation.

PutSpecial: This is the update operation but with some changes. First there is a part in the code tha calculates the age of the person in the entry from his birthday. Also searches the table in order to find if the company name already exists( because in this example the new entry should be in an already existing company). If the company exists it saves the table 1 unique id. If the company name exists the code updates the entry otherwise it doesn't.
