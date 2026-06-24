# InterviewHub 🚀

InterviewHub is an AI-powered coding interview preparation platform designed to help students track their DSA progress, practice company-specific questions, and prepare efficiently for software engineering interviews.

## Features (Planned)

* User Authentication (Signup/Login)
* DSA Problem Sheets
* Company-wise Question Lists
* Progress Dashboard and Analytics
* Notes for Each Problem
* Personalized Learning Roadmaps
* AI Assistant for Explanations and Hints
* Mock Interview Mode
* Search and Filtering

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Redux Toolkit
* React Query

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JWT
* bcrypt

### Real-time Features

* Socket.IO

### AI Integration

* Gemini API / OpenAI API

## High-Level System Design

### Architecture

```text
Frontend (React)
        |
        v
REST APIs (Node.js + Express)
        |
        v
Authentication Layer (JWT)
        |
        v
MongoDB Database
        |
        +------> Analytics Service
        |
        +------> AI Assistant Service (Gemini/OpenAI)
        |
        +------> Real-time Mock Interviews (Socket.IO)
```

### Core Modules

1. Authentication Service
   - Signup/Login
   - JWT-based authorization
   - Password hashing using bcrypt

2. Problem Management Service
   - Store coding questions
   - Company tags and topic tags
   - Difficulty-based filtering

3. Progress Tracking Service
   - Track solved problems
   - Generate streaks
   - Topic-wise analytics

4. AI Assistant Service
   - Explain concepts
   - Provide hints
   - Recommend learning paths

5. Real-time Interview Service
   - Timed mock interviews
   - Live session management
   - Performance tracking

### Database Collections

Users
- id
- name
- email
- streak
- problemsSolved

Problems
- id
- title
- difficulty
- tags
- companyTags

Submissions
- userId
- problemId
- status
- notes
- timeSpent


## Project Structure

```text
interviewhub/
├── client/
├── server/
├── README.md
└── .gitignore
```

## Current Status

✅ Project initialized
✅ GitHub repository created
✅ Node.js and Express setup completed
✅ First backend server running on localhost:3001

---

Built with ❤️ while preparing for software engineering interviews.
