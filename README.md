## Spoilerphobia
Live at https://www.spoilerphobia.com

A web application for spoiler free discussion of TV shows. Built with React, JavaScript, TailwindCSS, Firebase, and HTML.
&nbsp;  
&nbsp;
 

![Imgur](https://i.imgur.com/dA1KJDP.png)


![Imgur](https://i.imgur.com/ZPcUGCW.png)


![Imgur](https://i.imgur.com/hkOBhXY.png)


![Imgur](https://i.imgur.com/FnAVDnw.png)


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:\
`npm install`   

Setup TMDB API:\
`get API key from themoviedb.org`
`update index.js with your API key`

Setup Firebase:\
`Create a firebase account`
`Activate auth`
`Create a firestore database with two root level collections: comments and users`
`update index.js with your firebase information`

To Start Server:\
`npm start`  

To Build Project:\
`npm run build`  

To Visit App:\
`localhost:3000`  


## Reflection 

I started this as a side project with the goal of increasing my knowledge of React and TailwindCSS. I chose television shows because TMDB has a free api to get information on most television shows that exist.

Quickly upon starting the project, I realized that I would also need to incorporate a routing solution. I wanted users to be able to link directly to discussion posts. I incorporated react-router v6 into the project and learned how to create routes that achieved my goals.

A major challenge involved routing in a way that allowed for direct links to posts, but also kept the API requests to a minimum. I did so by having the following structure.

-Page
   -Show
      -ShowInfo
      -Discussion
      
The page component is the main component. All other pages are placed in the Outlet component of Page. This acts similar to inheritance in OOP languages. The Show component queries the api for all information about the show, and also queries the firebase database for the discussion information. It then passes these along as props to ShowInfo and Discussion. This allows a user to freely switch between ShowInfo and Discussion pages without requerying all of the information.

Another challenge was figuring out how to use firebase/auth in a way that allowed the user instance to be shared by all components. I solved this by using the onAuthStateChanged hook in my Page component and passing the user instance as a prop to other components. 
