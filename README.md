# 🧠 Elysian Mind – AI-Powered Mental Health Monitoring Web Application

## 📖 About the Project

**Elysian Mind** is a web application developed to help people better understand and improve their mental well-being. The main idea behind this project is to provide users with a platform where they can assess their mental health, track their daily emotions, practice mindfulness, and receive personalized suggestions powered by Google's Gemini AI.

Mental health is just as important as physical health, but many people don't have easy access to guidance or self-monitoring tools. Elysian Mind aims to bridge that gap by combining modern web technologies with Artificial Intelligence to offer users meaningful insights and practical activities that support emotional wellness.

The application is built using **React.js** for the frontend, **Node.js and Express.js** for the backend, **MongoDB** for storing user data, and the **Gemini API** for generating AI-based recommendations.

---

# ✨ Features

### User Authentication

The application allows users to create an account and securely log in. User information is protected, and each user has access to their own personal dashboard and mental health records.

### Mental Health Assessment

Users can take a mental health assessment by answering a series of questions related to stress, anxiety, emotional well-being, and overall mental health. Once the assessment is completed, the application analyzes the responses and provides personalized feedback with the help of Gemini AI.

### Mood Tracking

Users can record how they feel every day by selecting their current mood. These entries are stored so users can monitor their emotional changes over time and identify patterns in their mental well-being.

### AI-Powered Insights

One of the key features of Elysian Mind is the integration of Google's Gemini AI. Based on the user's mood, assessment results, and journal entries, the AI generates personalized recommendations, motivational messages, coping strategies, and wellness suggestions to help users improve their mental health.

### Guided Meditation

The application also includes guided meditation and relaxation activities that encourage mindfulness. These exercises are designed to reduce stress, improve concentration, and promote a calm state of mind.

### Gratitude Journal

Users can maintain a daily gratitude journal where they can write about positive experiences or things they are thankful for. Practicing gratitude helps users develop a positive mindset and improve emotional resilience.

### Personalized Activities

Instead of giving the same recommendations to every user, Gemini AI suggests activities based on the individual's emotional condition. These recommendations may include breathing exercises, meditation, journaling, listening to music, taking a walk, reading, or practicing yoga.

### Responsive User Interface

The application is fully responsive, allowing users to access it comfortably on desktops, laptops, tablets, and mobile devices.

---

# 🏗️ How the Application Works

The application follows a simple workflow.

After logging in, users can access their dashboard where they can complete a mental health assessment, record their daily mood, or write in their gratitude journal. All user data is stored securely in MongoDB. Whenever new information is added, it is sent to the Gemini API, which analyzes the data and generates personalized mental wellness recommendations. These suggestions are then displayed to the user, helping them understand their emotional state and encouraging healthy habits.

---

# 🛠️ Technologies Used

The project was developed using the following technologies:

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### AI Integration

* Google Gemini API

### Development Tools

* Git
* GitHub
* Visual Studio Code
* npm
* Postman

---

# 📁 Project Structure

The project is divided into two main parts.

The **client** folder contains the React frontend, including components, pages, styles, and API service files.

The **server** folder contains the backend code, including routes, controllers, database models, middleware, and API configurations.

This separation makes the project easy to maintain and scalable for future improvements.

---

# ⚙️ Installation

To run this project on your local system, first clone the repository using Git.

```bash
git clone https://github.com/SantoshKumar-2/Elysion-Mind.git
```

Navigate to the project folder.

```bash
cd Elysion-Mind
```

Install all frontend dependencies.

```bash
cd client
npm install
```

Install backend dependencies.

```bash
cd ../server
npm install
```

---

# 🔐 Environment Variables

Create a **.env** file inside the server folder and add the following variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

These variables are required to connect the application with MongoDB and the Gemini AI service.

---

# ▶️ Running the Project

Start the backend server.

```bash
cd server
npm start
```

or

```bash
npm run dev
```

Start the frontend.

```bash
cd client
npm start
```

After both servers are running, open your browser and visit:

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:5000
```

---

# 💾 Data Storage

MongoDB stores important user information, including:

* User accounts
* Mental health assessment records
* Daily mood entries
* Gratitude journal entries
* AI-generated recommendations
* Activity history

This allows users to access their previous records whenever they log in.

---

# 🤖 How Gemini AI Helps

Gemini AI is one of the most important parts of this project. Instead of providing generic advice, it studies the user's mood, assessment responses, and journal entries to generate personalized suggestions.

The AI helps users by:

* Providing mental wellness recommendations
* Suggesting daily self-care activities
* Motivating users with positive messages
* Offering stress management techniques
* Encouraging healthy habits
* Helping users better understand their emotional state

---

# 🚀 Future Improvements

Although the current version provides several useful features, there are many possibilities for future enhancements. Some planned improvements include:

* AI chatbot for mental health conversations
* Voice emotion analysis
* Weekly and monthly mental health reports
* Sleep monitoring
* Fitness tracker integration
* Emergency support contacts
* Push notifications and reminders
* Dark mode
* Mood analytics with charts and graphs

---

# 🧪 Testing

The application has been tested to ensure that major functionalities work correctly, including:

* User registration and login
* Mental health assessment
* Mood tracking
* Gratitude journaling
* AI recommendations
* Database operations
* API communication

---

# 📷 Screenshots

The repository can include screenshots of important pages such as:

* Home Page
* Login Page
* Dashboard
* Mental Health Assessment
* Mood Tracker
* Gratitude Journal
* Guided Meditation
* AI Insights

These screenshots help users understand the application's interface before running the project.

---

# 🎯 Conclusion

Elysian Mind is a modern AI-powered mental health monitoring application that combines web development and Artificial Intelligence to support emotional well-being. Through features such as mental health assessments, mood tracking, gratitude journaling, guided meditation, and personalized AI recommendations, the application encourages users to develop healthier habits and become more aware of their mental health.

This project also demonstrates practical implementation of the MERN stack along with Google Gemini AI, making it a valuable full-stack development project and an excellent portfolio application.
