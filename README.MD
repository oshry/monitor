
MONITOR USERS ON THE WEBSITE

TECH EXPLAINED
1. stuck - why selected
    - js(client) - no other choice
    - Nodejs(server) - small server side app
    - MongoDB(db) - fast saving insert and flexibility
    - SocketIO - calls to server should be hidden from network overview
2. file structure -
    /server/
        /dist/main.bundle.js - frontend bundle js,
                               this js is part of the snippet that will send to the client for embed
        index.js - main server will get SocketIO
        storage.js - store data in mongoDB
    /src/
        js/main.js - frontend script source file
        index.html - simple implementation, contain js script that control monitoring
    webpack.config.js - run dev server for faster development

INSTALL
npm install -S

RUN SERVER
npm run server

RUN CLIENT
npm start

DEVELOPING CLIENT
webpack --watch

NOTE
make sure you have mongod up and running