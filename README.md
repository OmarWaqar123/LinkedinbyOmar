# LinkedIn Clone


This project is a clone of the popular social networking platform LinkedIn. It is built using React and Firebase, providing a seamless and interactive user experience. The website allows users to create an account, log in, update their profile information, connect with other users, create posts with text and pictures, search for other users, like and comment on posts, and more.

The project is currently hosted on Netlify. You can access the live version of the website [here](https://linkedinbyomar.netlify.app/).

## Features

- User authentication: Sign up and log in to the website, ensuring a personalized experience.
- Profile customization: Update your profile data, including username, skills, education, company, location, and profile picture.
- Post creation: Share your thoughts and ideas by creating posts with text and images.
- Social interactions: Connect with other users, view their posts, like them, and leave comments.
- Post management: Edit or delete your own posts.
- User search: Find other users on the website.
- Responsive design: Enjoy a seamless experience across different devices.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 
- npm 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OmarWaqar123/LinkedinbyOmar.git

2. Navigate to the project directory:

   cd linkedin-clone

3. Create FirebaseConfig.js file
   
   create FirebaseConfig.js file inside src folder , this file will contain all of your firebse's necessary 
   information like this. 

 ```javascript
  
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your authdomain",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {app,auth,firestore, storage}

```

4. Install the dependencies:

   npm install

5. Start the development server:

   npm start

6. Open your browser and visit http://localhost:5173 to view the website.




### Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request.



