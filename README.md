
Scenario:
Development of a web application called "Piquante" in which users can add their favorite sauces and like or dislike the sauces proposed by other users. The goal is to create the backend of the application, the frontend being already coded and provided.

Goals:
Backend development in JavaScript

IT technologies :
Node.js Server
Framework Express
MongoDB database
Hosting on MongoDB Atlas
DB operations performed with mongoose
REST-APIs
OWASP and GDPR security

Security measures put in place :
User password hash with bcrypt
Secure database manipulation with mongoose
Checking that the user email is unique in the database with mongoose-unique-validator
Using environment variables for sensitive data with dotenv
User authentication by token with jsonwebtoken
Header protection with helmet
---

For this backend project, it is necessary to create an external Mongo-like database (https://www.mongodb.com/cloud/atlas/register).

Installation :
go to "Piiquante_back" folder (backend folder),
create folder "images"
then you have to create a new file according to the same model ".env.EXAMPLE",
the ".env" file and customize it like this:

MONGODB_CONNECTION = "mongodb+srv://admin:<password>@cluster0.xsyfk3f.mongodb.net/test"

    Replace with your own Mongo database connection

    There is also a customization of the token value to do: JWT_TOKEN

    There is also a customization of the connection ports value if you need to change :
    PORT=3000
    MY_PORT=3001

From terminal on backend folder :
and run command "npm install"
then run command "npm start" OR "nodemon server"

Front Address : http://localhost:3000
---

For the frontend project, the deposit is present at this address :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

From terminal on Frontend folder :

npm install -g @angular/cli

npm run start

Account creation :
it is necessary to have:

- a valid email
- a valid password (lowercase/uppercase + 2 numbers = at least 8 characters) : example "A12bcdef"

Back Address : http://localhost:4200