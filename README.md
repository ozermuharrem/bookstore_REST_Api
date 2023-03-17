While developing this project.

💽 BackEnd;
 * NodeJs
 * ExpressJS
 
🖥️ FrontEnd;
 - Template (https://html.design/)
 - JavaScript
 - Html
 - Css
 - Boostrap

☁️ Database;
 - MongoDb

🖧 Deployment
 - AWS Route53
 - DigitalOceans
 - Nginx
 - PM2

### BOOKSTORE API REFERENCE

Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.


#### Authentication

Bookstore API uses TOKEN to authenticate requests. 

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret TOKEN in publicly accessible areas such as GitHub, client-side code, and so forth.

API requests without authentication will also fail.

First, send a post request to `/user/register` with email and password.

![user-register](https://user-images.githubusercontent.com/86782430/225988674-3adf460c-9345-45ba-8a41-418c320c8e1d.png)


After registering, you need to login with your email address and password from `/user/login`

After you log in, you will be given tokens. The token is valid for 15 minutes and will expire after 15 minutes.

![user-login](https://user-images.githubusercontent.com/86782430/225988706-dcbe20c0-7ea4-4f84-b728-881ee80e1538.png)


The token is not required for the get requests, which you will use in the token post requests you receive.

>GET /books 

provides access to all books registered in the database

![all-books](https://user-images.githubusercontent.com/86782430/225986460-e1795c37-9607-4c4a-9ead-7c520bb1deae.png)

>POST /books 

It is the stopping point used to add new books. You will need tokens to add new books. You need to use the token returned after the `user/login` request. For requests made through Postmen, you should write the token in the input that opens after selecting the Type section as Bearer Token in the Authorization tab.

![tokenInit](https://user-images.githubusercontent.com/86782430/225987387-7a334e43-297a-4329-a504-eecc46b518e4.png)

Each book should have the following attributes:
+ title (string, required)
+ description (string, required) 
+ author (string, required)
+ year (number, required)
+ cover (string, optional)

##### Constraints

+ The book titles can be up to 255 characters long.
+ The book descriptions can be up to 2000 characters long.
+ The book authors can be up to 255 characters long.
+ The book year must be a positive integer between 0 and the current year.
+ The book cover can be a URL string of up to 1000 characters.

![create-book](https://user-images.githubusercontent.com/86782430/225988491-b3c5b0ac-a6ff-4ec6-9b53-c152c910f2f6.png)

>GET /books/:id 

To send a single book request, you need to send the request with the book id to the `/books/:id` endpoint. No token is needed for this operation.

![books-id-singlebook](https://user-images.githubusercontent.com/86782430/225989717-3e0cd474-4917-4eef-abdc-8435448f175c.png)

>PUT /books/:id

 Update a specific book by ID

To update the existing book, you need to send a request to the `/books/:id` endpoint. To do this, you need tokens.

![update-book](https://user-images.githubusercontent.com/86782430/225998197-f1acef1a-ae7d-4eb1-8dba-e98d39f35186.png)


> DELETE /books/:id 

Delete a specific book by ID

To delete the existing book, you need to send a request to the `/books/:id` endpoint. To do this, you need tokens.

![delete-book](https://user-images.githubusercontent.com/86782430/225998595-faa8809c-8997-42d0-ad85-c9b7a8013de1.png)

<hr>

# Unit Test

To run the test, simply enter the `npm test` command at root.


![unit test](https://user-images.githubusercontent.com/86782430/226000498-d2e546a0-ef0a-46bf-b73e-a649cb338b40.png)


# Memorial Real Test And Use Api 

I wrote the [memorial](https://memorial.ozermuharrem.com) project to use and test the APIs I wrote with this project. In this project, the bookstore api was tested and used. You can reach the project by clicking the [GitHub](https://github.com/ozermuharrem/memorial) link.

