# DynamoDB-Crud-operations
In these operations there is code that does the crud operations in 2 tables using node.js, each one has a unique id but also 
they connect because the second table has as a field the unique id of the first table and also another same field called company
name.The difference of the special operations as i named them is that they are using both tables in order to do a different operation 
version than the common.
The example is that in first table we have companies and in second we have the employee of the companies.The 2 tables has in common the 
unique id and the company name field of the companies table as fields in the employee table.

Delete: a normal version of a delete operation
DeleteIn2Tables: Here we have 2 tables and before we delete an entry in table 1 we first delete all entries in table 2 that have the
same id in their field.
Get: 
