# Simple Alexa Skill for Team Neusta's 2018 Campus Conference


## Installation
After Checkout create a "appid.json" file in the lambda folder of your project.

Insert this content and put in your skill id
<code>
{
    "APPID":"<XXXXXXX>"
}
</code>

## Server Start

Run this command to start the local server

<code>
npm start
</code>

Your Server is now available at http://localhost:3030/alexa

## HTTPs tunnel

Run this command to forward http://localhost:3030 to an internet available https endpoint 

<code>
npm start ngrok
</code>


