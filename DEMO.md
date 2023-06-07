# Demo + DIY details

https://uwmadison.zoom.us/rec/share/iFaoperAaj-tyHLcIWajps5Axdp2aRrRPe-7jTEe312F-QA5bl5sb3ucfX950hcw.w6tvkaVvVwKuSNKX

Passcode: i^3LgzfG

docker build -t express .
docker run -it -p 3001:3001 --name ex express

docker build -t frontend .
docker run -it -p 3000:3000 --name rf frontend

docker build -t flask-samyak .
docker run -p 5238:5238 -d --name backend flask-samyak

docker run -it --link backend -e NGROK_AUTHTOKEN=token ngrok/ngrok:alpine http backend:5238

-> missing php and flask images, but you can probably google and make your own.

# Docker structure:

phpmyadmin and mysql containers run together from Casilda's mysql docker-compose file. Once they are running, localhost 8080 should have the php image. localhost 3306 should have the mysql databse and the image should be called 'database'. 

Once database is set-up, we run the flask server on 5238. (It can be a random port but needed for ngrok). Flask container will be called 'backend'. Once this container is running, we need to connect it to the database for queries. 

We create a docker network with backend and database. Now, since the flask server calls the main function of dbservices, the main function accepts arguments hostname, password, query, database, and user. 

Current default fields: hostname="agdev-db", portnum=3306, query="select * from Task;", user="root", password="mc", database="AGDev43".

From this, mysql will find the hostname through the docker container and post the query and get responses. Now, we have a working backend + database. 

To use them, we can either publish the flask container's url or access it through localhost (i was not successful in doing this but didn't try hard enough). Essentially, we would now run the react container on localhost 3000. However, the react host has to communicate with flask. For this, it is possible to use localhost 5238 since the docker container is running there. 

So, in the config file in the front-end, replace the SERVER_URL to be http://localhost:5238
This should hopefully connect to the flask backend. You can test using postman.

One more thing. Chatroom. For the chatroom, it is necessary to run and connect the express server. I tested this locallly so I know it's pretty easy. Run the express docker container on 3001 and make sure the chatroom.js url is localhost:3001. 

And that's it. You should now have a full on working application using about 5 docker containers. Php docker container is optional. So, react + flask + sql + express = 4 containers.

An ngrok container can be added on to publish the localhost url for people to interact. Even better, create docker-compose.yml and transfer all files to aws. Then anyone can access the app. Maybe buy a domain name because why not and boom we're done. 