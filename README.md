For this backend project, it is necessary to create an external Mongo-like database (https://cloud.mongodb.com/).
Then you have to create a new file according to the same model ".env.EXAMPLE",
 the ".env" file and customize it like this:

# MONGODB
MONGODB_USER = "yourInfo"
MONGODB_PASSWORD = "yourInfo"
MONGODB_CLUSTER_NAME = "yourInfo"
MONGODB_DATABASE_NAME = "yourInfo"

on a Mongo database your connection string usually looks like

"mongodb+srv://admin:<password>@cluster0.xtpck2n.mongodb.net/mydatabase1" (example)

it is transformed, after personalization by breaking down your information like this:

mongodb+srv://<MONGODB_USER>:<MONGODB_PASSWORD>@<MONGODB_CLUSTER_NAME>.mongodb.net/<MONGODB_DATABASE_NAME>

There is also a customization of the token value to do: JWT_TOKEN

There is also a customization of the connection ports value if you need to change :
PORT=3000
MY_PORT=3001

And to finish, there is also a customization of the value of the encryption token to do : CRYPTOJS_SECRET_KEY


Installation : 
go to "Piiquante_back" folder, 
and run command "npm install"
then run command "npm start"

_________________________________________________________________________________________________________

For the frontend project, the deposit is present at this address :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6