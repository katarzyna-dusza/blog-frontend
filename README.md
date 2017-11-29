# Frontend for a blog application

## Overview
This repo contains an example of template for a blog application. 
Backend can be found [here](https://github.com/katarzyna-dusza/blog-backend).

It's still in progress (see _Roadmap_ section).

## Technologies
- **AngularJS 1.5**
- **SASS**
- **Grunt**

## Prepare backend
To have a full functionality of this application, you have to set up a proper backend like [this one](https://github.com/katarzyna-dusza/blog-backend). 

## Run server
1. Go to the project directory

1. Install all dependencies
    ```shell
    npm install
    bower install
    ```

1. Run
    ```shell
    grunt serve
    ```
The application should appear under localhost (port 9000 is set by default).

## Roadmap

There is a couple of things, which need to be improved:
* RWD for navigation
* progressive (or other) jpgs to prevent dirty loading of posts' images
* login / logout (creating new users, which can comment a post)
* admin panel for creating new posts
