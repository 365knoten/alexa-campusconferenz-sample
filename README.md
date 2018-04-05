# Simple Alexa Skill for Team Neusta's 2018 Campus Conference

## Develop locally

### Checkout
First checkout the project and install all packages
<code>
npm install
</code>


### Installation
After that create a "appid.json" file in the root folder of your project.

Insert this content and put in your skill id
<code>
{
    "APPID":"<XXXXXXX>"
}
</code>

### Server Start

Run this command to start the local server

<code>
npm start
</code>

Your Server is now available at http://localhost:3030/alexa

### HTTPs tunnel

Run this command to forward http://localhost:3030 to an internet available https endpoint 

<code>
npm start ngrok
</code>

Use the resultung https urls, append "/alexa" and use that as the skill's endpoint in the alexa developer console

## Deploy as a Lambda Function

### Checkout
First checkout the project, remove the node_modules folder if present and just install the production dependencies
<code>
npm install --production
</code>

### Installation
After that create a "appid.json" file in the root folder of your project.

Insert this content and put in your skill id
<code>
{
    "APPID":"<XXXXXXX>"
}
</code>


### Zip & Upload

Zip the entire Folder (exclude the .git folder) and upload it to a lambda function


