CMS = content management system => like P3

students
M -> N
courses
M -> N
teachers

create a server contains above resources:
terminal command:

npm init -y                        => create empty package.json
npm i express morgan dotenv cors   => install multiple packages, can add more later

#
Morgan is a HTTP request logger middleware for Node.js

#
Dotenv is a module that we will use to access environment variables in our application.


mkdir src     => vscode terminal accept linux command lol
cd src
touch app.js  => add new file but windows didnt recognize this...
mkdir routes
mkdir controllers
mkdir middleware
mkdir modles
mkdir utils

write code into app.js

npm i -D nodemon

#
nodemon is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected.

add "dev" to package.json into "scripts"

add index.js into routes folder



after create basic frame of server, install mongoose




CONNECTION_STRING=mongodb://localhost:27017/jr-cms-13
DB_HOST
DB_PORT
DB_DATABASE

