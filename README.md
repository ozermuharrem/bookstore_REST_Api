### BOOKSTORE API REFERENCE

Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.


#### Authentication

Bookstore API uses TOKEN to authenticate requests. 

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret TOKEN in publicly accessible areas such as GitHub, client-side code, and so forth.

API requests without authentication will also fail.

First, send a post request to `/user/register` with email and password

