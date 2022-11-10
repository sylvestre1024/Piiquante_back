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

    And to finish, there is also a customization of the value of the encryption token to do : CRYPTOJS_SECRET_KEY

From terminal on backend folder :
and run command "npm install"
then run command "npm start"

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
