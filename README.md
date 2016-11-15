# Public Transportation App: nd802-P2

This app was built to meet the [rubric requirements](https://review.udacity.com/#!/rubrics/116/view) of Udacity's second project of the nd802 Nanodegree. The app was built using [Meteor](https://www.meteor.com/). 

## In order to deploy this app you can follow the following steps:

### Install Meteor
`curl https://install.meteor.com/ | sh`

Should install at the same time MongoDB and Node.js.

### Clone App

Clone from Github or download files from project submission. 

### Locate terminal on the right folder and deploy

Once in the right directory, type the `meteor run --production` command, your app will be deployed on http://localhost:3000/. You can visualize the flow in [this example](https://www.meteor.com/tutorials/blaze/creating-an-app). Note that running `meteor run --production` (instead of simply `meteor` ) minimizes and concatenates JS and CSS assests as required in the rubric. 


## Notes on deployment 

- Meteor's build process fairly simplistic. According to the [docs](https://guide.meteor.com/build-tool.html): 

> The Meteor build tool is what compiles, runs, deploys, and publishes all of your Meteor apps and packages. It’s Meteor’s built-in solution to the problems also solved by tools like Grunt, Gulp, Webpack, Browserify, Nodemon, and many others, and uses many popular Node.js tools like Babel and UglifyJS internally to enable a seamless experience.

- Special thanks to [NitroBAY](https://github.com/NitroBAY/meteor-service-worker) for insight regarding Service Workers in Meteor.