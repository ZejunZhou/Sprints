# AGDev43
Updated: 4/18/2023
Version: v1.6
Authors: sjain85@wisc.edu

# Story Poker update

This is the story poker plan:
1. User creates story (storypoker-create) endpoint. Using user-email, time, and story name, a record is stored in the database
2. User submits their answer (update query to db with email + answer) ->storypoker-submit endpoint. Parameters: email, user answer (integer), 
3. User submits view results request. Flask returns time remaining (select * from SP query posted), or the output. (storypoker-result endpoint on flask). Parameters are just email.


Queries required: get t1, get full table, delete all old records, insert all new records, update each record by email
create SP : delete all records, insert new records (emails list, stories, t1, ans=null)
submit answer: [flask: compare t1, if ok then continue]: update query (single email and answer)
show results: [flask: compare t1, if ok then continue]: get full table


# Quick Start

To query the database through postman or any other service, there are two ways:
1. Get hostname and portnumber from a currently running docker container on the csl machine and send request to ngrok url
2. Send request through localhost. You will need port 5238 to be ssh'd into csl, and another localhost port to run your react app. The request url would become http://localhost:5238.

Use the postman link here to access the queries. For the queries, you NEED hostname and portnum. These two values will most likely be constant as: database, and 3306. The link below includes both types of queries: ngrok, and localhost.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/26174821-9b782b07-42d8-4943-b79b-db1195a70ad8?action=collection%2Ffork&collection-url=entityId%3D26174821-9b782b07-42d8-4943-b79b-db1195a70ad8%26entityType%3Dcollection%26workspaceId%3D140db93f-f8f8-4a48-996b-ceff646e870e)

**Remember: All request bodies and response bodies must be json, so send them and read them as such.**

# Instructions for developers

**There must be at least 2 docker containers running: "agdev-db" on 3306 -> 3306 and "flask" on 5238->5238. They must be connected via a docker network and your ssh must be localhost:5238:localhost:5238**. 

1. SSH into the team csl with port forwarding: 
`ssh -L localhost:5238:localhost:5238 cslusername@cs506-team-43.cs.wisc.edu`
Ensure port 5238 is free on your machine. Else, you will have to forward traffic to a different port. If so, change the 'from' port (localhost:from:localhost:5238)

2. Type in `http://localhost:5238` in your browser to see the world's most loved animal. 

3. If step 1 and 2 work, you are ready to perform create, read, update and delete queries on the database.

# The update

Since the database is hosted on csl, it needs an open account logged-in to the csl. I can use ngrok to publish an endpoint to a public url which also gives me a hostname and portnumber. Using these numbers, currently anyone on the web can access our database. (so don't leak the info).

# JS Code

Fork the postman collection and see the '`js code`' section.


# Description

Old: GET queries do not accept a request body. So, to retreive information from the database, you need to perform 2 queries. a 'POST' request to the 1st endpoint below with json variables hostname, portnum, and query (miniumum). Then, a 'GET' request to the **SAME** endpoint to get data response from the query you posted.

New: Since posting two queries is complicated, we will only post 1 query. Using the POST query, we query the database and get the output at the same time. All queries will route through this 'post' query.

1. /post/variables - WORKING
2. /get/select - DEPRECATED
3. /api - WORKING
4. /test/select - WORKING
5. /test/insert - WORKING but it's the same as previous query essentially.


# Problems

If the database connection fails, check the flask container logs. If there is a 'database does not have cursor' or something similar, then you need to check the connection. 

The sql file has default values to connect to the database as follows but can be specified in the /post/variables endpoint with a POST request.

"def __init__(self, hostname="agdev-db", portnum=3306, user="root", password="mc", database="AGDev43"):"

If there are still issues, the flask container log should print variables and messagss everytime something goes right or wrong. Attach to that for more info.

If you are encountering issues, clone this git repository and install the `requirements.txt` with `pip install requirements.txt`. Don't forget to create a `virtual environment` for best practices. 

Take a look at `app.py` for the endpoints and code.

# Crash course on networking

Database will run on a docker image (Casilda ran on 3306 so let's stick with that). 3306 is the portnumber of the csl localhost. 
I create another docker flask application, which runs on localhost 5238 (in app.py main function). After creatingt the flask files, in the Dockerfile I have CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
at the end. This will run flask and somehow expose it so that other docker apps can see it. Anyway, I then build an image with 
`docker build --tag flask-samyak .`
and then run it with 
`docker run -p 5238:5238 -d flask-samyak`

Then, I docker ps should show both containers running. Then I create a docker network and add the containers to the network.
Now, both containers can find each other with their names since they are on the same docker network. Hence, we do docker ps.

After naming the container and adding it to the network, I run an ngrok image with the command:
`docker run -it --link backend -e NGROK_AUTHTOKEN=token ngrok/ngrok:alpine http backend:5238`

This will give me an ngrok url which we use as our endpoint. This is  **option 1**

For explanation, refer below, plus add an ngrok container to the mix which forwards traffic to 5238.

### Option 2 explanation

We are now done. Log out of ssh and kill terminals. Now, ssh into vm again but with options: 
`ssh -L localhost:5238:localhost:5238 <login with agdevl>`
run docker ps to confirm the database and flask app are both running and the database app is on port 3306 or whatever and flask is on port 5238 probably. Then go to postman and use the localhost queries.

This is interesting. What's going on is this: csl vm is hosting a docker container on port 3306. All traffic to 3306 will be forwarded to the docker container. This is the database. 

The same is happening on port 5238 for the flask endpoint. 

Now, since we connected with -L 5238:5238, we are diverting all traffic of our laptop's 5238 port to the vm's 5238 port. 

The postman url is localhost:5238 so it sends traffic to localhost 5238 but since we diverted it, it goes to the vm localhost 5238. Now, what's on the vm localhost 5238? Our docker flask app! SO! The body of the postman request is received by the docker flask app which is connected to the other container through the docker network. 

The hostname in the postman body refers to the name of the database docker container which is ON THE DOCKER NETWORK. So, the 5238 flask application receives hostname and postnum where hostname is the host on the docker network, but portnum is the port of the csl localhost docker image. Remember when you ran docker ps? the db showed port 3306. Hence, portnum is 3306. 

Thank u and goodnight.

How to connect using react app hosted on another docker container on the docker network on the csl vm?
same thing. You will use the name and portnum of the flask docker container currently running. BOOM.

For "outside csl" access, you'll have to ssh into your terminal and do port forwarding like I mentioned above.
the syntax is: 
ssh -L "divert traffic from":"divert traffic to" host@wisc.edu 

Then we find the name of the database (pls name it something good and constant, my db is t4-db2-1). We use this name from postman or anywhere 


# Ngrok instructions (DO NOT FOLLOW UNTIL FURTHER NOTICE)

To run this yourself, download ngrok and make an account online (you need to).
Get the 'Auth token' value from the website log-in, and type:

`ngrok config add-authtoken <YOUR AUTHTOKEN>`

Once ngrok is setup, follow Casilda's instructions to spin up the csl server at port 3306. (This is the dafault port as per her instructions).
After you are ssh'd into csl, run ngrok:

`ngrok tcp 3306`

This will output some information. You will find the hostname and portnum in the 'forwarding' info. It should look something like this: `tcp://4.tcp.ngrok.io:10318 -> localhost:3306`

for the above output, 
the hostname is: '4.tcp.ngrok.io'
the portnum  is: 10318

Use this information with a get request to the endpoint
https://agdev42-sprints.herokuapp.com/selectQueries

Make sure to specify a query!
