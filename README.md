# APPSync  / RDS Aurora Serverless / cognito boilerplate


1. use this format in postman
{"query":"mutation {\n  addHello(hello: {\n    message: \"hello\"\n  }) {\n    message\n  }\n}","variables":null}

2. make sure the authorisation header is sent via an Authorisation header in the request

3. Create a header using the command below
aws cognito-idp admin-initiate-auth --region us-east-1 --cli-input-json file://auth.json

4. to generate the tokens ensure that the following file auth.json exists with

{
    "UserPoolId": "",
    "ClientId": "",
    "AuthFlow": "ADMIN_NO_SRP_AUTH",
    "AuthParameters": {
        "USERNAME": "",
        "PASSWORD": ""
    }
}

Note: in order for the db to be accesible you need to modify the setting:

RDS >
Databases >
Modify cluster

then enable the Web Service Data API - Beta
