****FreelanceHub - MERN Stack Freelancing Platform****

FreelanceHub is a full-featured freelancing web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This platform allows Clients to post projects, Freelancers to bid and work on them, and Admins to manage users and projects efficiently.

🌟 **Features**

- User Authentication (Client, Freelancer, Admin roles)
- Clients can post, view, and manage projects
- Freelancers can view projects, apply, and track assigned work
- Admin dashboard for managing users, projects, and applications
- Real-time Chat System using Socket.io between client and assigned freelancer
- Glassmorphism-inspired professional UI with animations
- Dark theme interface for modern UX

🛠️ **Tech Stack**

- Frontend: React.js, Bootstrap, CSS3
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Real-time Communication: Socket.io
- Hosting: (Suggest Vercel/Render for frontend, Cyclic/Render for backend)

📁 **Folder Structure**

- /client — React frontend
- /server — Node.js & Express backend
- /context — Global state using React Context API
- /styles — Modular CSS files per component

🚀 **Getting Started**

1. Clone the repository:
   git clone https://github.com/Patan-Munaf/FreelanceFinder-Discovering-Opportunities-Unlocking-Potential

2. Install dependencies for both client and server:
   cd client && npm install
   cd ../server && npm install

3. Create a `.env` file in /server with your MongoDB URI and PORT

4. Start both servers:
   cd server && npm run dev
   cd client && npm start

Make sure MongoDB is running locally or through MongoDB Atlas.

🙌 **Credits**
Developed with ❤️ by Munaf Patan


