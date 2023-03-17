### BOOKSTORE API REFERENCE

Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.


#### Authentication

Bookstore API uses TOKEN to authenticate requests. 

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret TOKEN in publicly accessible areas such as GitHub, client-side code, and so forth.

API requests without authentication will also fail.

First, send a post request to `/user/register` with email and password.

![register](https://user-images.githubusercontent.com/86782430/225959181-5c32af35-eb76-4bd8-b087-09fe019cde80.png)

After registering, you need to login with your email address and password from '/ures/login'.

After you log in, you will be given tokens. The token is valid for 15 minutes and will expire after 15 minutes.

![login](https://user-images.githubusercontent.com/86782430/225960021-8d94fbd3-bace-478a-bced-d4b3cd5437f7.png)

The token is not required for the get requests, which you will use in the token post requests you receive.

>GET /books 

provides access to all books registered in the database


