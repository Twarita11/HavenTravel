# Haven Travel

---

## ✈️ Project Overview

**Haven Travel** is a full-stack social activity matching application designed to help users discover and connect with others for shared interests and events. Whether you're looking for a hiking buddy, a board game group, or someone to try a new restaurant with, Haven Travel aims to foster real-world connections based on common activities.

This project is built with a modern technology stack, ensuring a responsive and robust experience for users.

---

## ✨ Features

* **User Authentication:** Secure registration and login functionalities.
* **Activity Matching:** Find and connect with other users based on shared activity preferences.
* **User Profiles:** Create and manage personal profiles to showcase interests.
* **Secure Communication:** 
* **Twilio Integration:** Using Twilio for SMS notifications

---

## 🚀 Technologies Used

### Frontend

* **React:** A declarative, efficient, and flexible JavaScript library for building user interfaces.
* **Vite:** A fast build tool that provides a lightning-fast development experience for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

### Backend

* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinonated, minimalist web framework for Node.js.
* **SQLite:** A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
* **`dotenv`:** To manage environment variables securely.
* **Twilio:** For SMS capabilities (e.g., verification, notifications).

---

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Twarita11/HavenTravel.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd HavenTravel
    ```
3.  **Set up environment variables:**
    * Create a `.env` file in the `Server` directory.
    * Add your Twilio Account SID, Auth Token, and phone number:
        ```dotenv
        TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        TWILIO_AUTH_TOKEN=your_auth_token_here
        TWILIO_PHONE_NUMBER=+1234567890
        ```
    * **Replace the placeholder values** with your actual Twilio credentials.

4.  **Install backend dependencies:**
    ```bash
    cd Server
    npm install
    ```
5.  **Install frontend dependencies:**
    ```bash
    cd ../Client # Go back to the root and then into Client
    npm install
    ```

---

▶️ Running the Application

### Start the Backend Server

From the `Server` directory:
```bash
npm start
# or node server.js (if your package.json doesn't have a start script)
```
The frontend application will typically open in your browser at `http://localhost:5173` (or a similar port).

---

## 🚧 Project Status & Future Enhancements

This project is currently under active development. Future enhancements may include:

* Real-time chat functionality between matched users.
* More advanced search and filtering for activities.
* User reviews and ratings for activities/meetups.
* Integration with mapping services for event locations.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to contribute to the project, please open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

## 📧 Contact

Twarita Singh - twaritas4@gmail.com

Project Link: [https://github.com/Twarita11/HavenTravel](https://github.com/Twarita11/HavenTravel)
