# feedback-application
### About
A simple feedback application that allows users to submit feedback and lets an admin view all received feedback in a clean, minimal UI.
### Use Cases
##### User
- Submit feedback with: Name , Email , Message
##### Admin
- View all feedback submissions
- Toggle feedback visibility using a button
### Tech Stack
- Frontend: React + Vite
- Backend:	Netlify Functions
- Database	Supabase
### Installation
git clone ```<repo-url>```<br>
cd client <br>
```npm install```
### Run Locally
```npm run dev```
### Environment Setup
You need a Supabase project. Create a .env file inside client/ or configure Netlify environment variables.<br>
Refer to .env.exp for required keys:<br>
```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key

```
### Features
- Simple and clean user interface.
- Serverless backend using Netlify Functions.
- Real-time feedback storing in Supabase.
- Admin-only feedback viewing with toggle control.
### Note:
When accessing the Admin Panel, you will be prompted for a password. Please use admin123 to view the feedbacks.