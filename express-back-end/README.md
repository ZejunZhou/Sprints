# Express server for chatroom
This folder houses the code to build an express server to run the chatroom function. 

# Quickstart
To locally run the chatroom, clone this repository and in the folder containing the dockerfile, type in:
`docker build -t express-agdev43 .`
This will build the docker image. Verify the image is build with `docker images` command.
Run it with:
`docker run -d -p 3001:3001 express-agdev43`

This will run the container in -d (detatched) state. Now, in a new terminal, cd into the front end repository and type in npm start. This will start the react server. Now you should be able to go to the chatroom and use it.


# Production
When in production, this express file will be in a docker container exposed using ngrok so chatroom is accessible to all servers. Here's the basic idea behind it:

React app will run on docker container 1, on port 3000. This port will be exposed to the web by one ngrok container.

To use the chatroom, we need to run another container, container 2 which holds the express server. This runs on port 3001 which we will expose with another ngrok container. The ngrok url from this container will need to be input into the chatroom.js file in the react fron-end code. Port will be 3001.

The backend flask server will run on another docker container 3, exposed with... you guessed it, ngrok. This is on port 5238. The ngrok url will need to be input into the react app where we are making queries to the database.

And that's it folks. This ends the docker and ngrok madness. (I think).


# Additions

I might try to create a function on this server that also allows story poker to run. I'd rather SP run on express rather than SQL database since that's slow and clunky and difficult to access with CSL lol.