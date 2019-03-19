# Project Description

Mailchimp v3 customized implementation in nodeJS to send custom emails to individuals.

# Project Setup

Run `git clone https://github.com/noumanwaheed/mailchimp-v3-nodejs.git`

Run `npm install`

Copy `.env.example` as `.env` and set all environment variables.

# How to get environment variables from Mailchimp

**1- Get API Key**

Go to `Account`. Click `Extras > API Keys`. If you don't have any API key yet then create one otherwise copy API key.

**2- Get List ID**

Go to `Lists`. Click on any subscribers list you want to use. Click `Settings > List name and defaults`. Copy 10 digit list id.

**3- Get Template ID**

Go to `Templates`. Click on `Create Template > Import HTML`. Select file `mailchimp-example-template.html` and save it. Click on saved template and copy template id from url.

**4- Set Company Logo**

Go to `Photos`. Upload any photo of your company logo and mark it as `Set My Logo` from dropdown menu.
