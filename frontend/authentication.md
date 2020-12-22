# Frontend Authentication

While auth may require slightly different setup depending on the environment after setup the flow is the same across environments.

There are two main methods for authenticating with PlaceOS from user frontends:
+ Local Authentication - Logging in using a account local to the PlaceOS environment.
+ SSO Authentication - Loggin in using the clients user account service.

Local authentication is always available but all clients have their own SSO which ends up being the default method of authentication.

## Deployed Environment

When SSO isn't setup in the environment you should automatically be redirected to the local login page for authentication. If SSO is enable and you have an account you can login through SSO otherwise you will manually need to redirect to the local login page so that you can use the local account. The login page is located at `https://<my.domain>/login/`.

## Remote Environment

Once the proxy is setup for the remote environment this operates the same way as the deployed environment. SSO doesn't work across remote environments so you'll need to use a local account when authenticating.

## Mocked Environment 

Auth is handled automatically when `ts-client` is in mock mode.
