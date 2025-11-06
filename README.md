# StudyBot - Your Personal Study Assistant 📚

StudyBot is an intelligent AI-powered educational chatbot designed to help Class 10 and Class 12 students in India with academic questions, study tips, and career guidance. Powered by Google's Gemini API, it provides personalized learning support in a friendly and interactive environment.

## Features ✨

- **Personalized Learning**: Tailored responses based on student's class level
- **Multi-Subject Support**: Help with Math, Science, English, History, Geography, and more
- **Study Tips**: Get expert advice on exam preparation and effective learning strategies
- **Career Guidance**: Explore educational pathways and career options
- **Topic Filtering**: Smart filtering to keep conversations focused on academics and career
- **Real-time Chat Interface**: Beautiful, responsive chat UI with smooth animations
- **Typing Indicators**: Visual feedback while waiting for AI responses

## Tech Stack 🛠️

- **Frontend**: React 19.2.0
- **UI Library**: React Bootstrap 2.10.10 & Bootstrap 5.3.8
- **Icons**: Lucide React
- **Routing**: React Router DOM 7.9.5
- **Real-time Communication**: Socket.IO Client
- **AI Model**: Google Gemini 2.0 Flash API
- **Styling**: Custom CSS with Tailwind-inspired utilities

## Project Structure 📁

```
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── HomePage.js          # Student info input
│   │   ├── WelcomePage.js       # Welcome screen
│   │   ├── ChatBox.js           # Main chat interface
│   │   └── styles/
│   │       └── style.css        # Component styles
│   ├── App.js                   # Main app component
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md
```

## Installation & Setup 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Google Gemini API key

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/studybot.git
cd studybot
```

2. **Install dependencies**
```bash
npm install
```

3. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key

4. **Add API Key**
   - Open `src/components/ChatBox.js`
   - Find the line: `const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key
   ```javascript
   const GEMINI_API_KEY = 'your-actual-api-key-here';
   ```

5. **Start the development server**
```bash
npm start
```

6. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL

## How to Use 💬

1. **Enter Your Details**: Start by entering your name and class (10 or 12)
2. **Click Continue**: Proceed to the welcome screen
3. **Start Chatting**: Click "Start Asking Questions" to begin
4. **Ask Questions**: Type your academic or career-related questions
5. **Get Answers**: Receive AI-powered responses tailored to your class level

### Example Questions
- "Explain photosynthesis"
- "How do I prepare for my board exams?"
- "What are the career options after Class 12?"
- "Solve this quadratic equation: x² + 5x + 6 = 0"
- "What's the difference between mitosis and meiosis?"

## Allowed Topics 📖

The chatbot is programmed to help with:

**Academic Subjects**
- Mathematics, Science (Physics, Chemistry, Biology)
- Languages (English, Hindi)
- History, Geography
- Social Studies, Economics, Commerce
- Computer Science, Programming

**Study-Related**
- Exam preparation, Tests, Assignments
- Homework help, Projects
- Study tips, Revision strategies

**Career-Related**
- University/College information
- Course selection guidance
- Engineering, Medical, UPSC preparation
- Scholarships, Admissions, Internships

## Blocked Topics 🚫

The chatbot will decline requests about:
- Movies, Games, Songs
- Jokes, Entertainment
- Weather, Sports
- Recipes, Cooking
- Politics, Religion
- Dating, Relationships
- Cryptocurrency, Gambling
- And other non-educational topics

## API Response Handling 🔌

The app includes robust error handling for:
- Network connectivity issues
- Invalid API keys
- Rate limiting (too many requests)
- Server errors
- Malformed requests

All errors are displayed in a user-friendly format with actionable suggestions.

## Environment Variables 🔐

Create a `.env.local` file in the project root (optional for additional config):

```env
REACT_APP_API_KEY=your-gemini-api-key
```

## Customization 🎨

### Change Colors
- Edit gradient colors in `src/components/styles/style.css`
- Look for `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

### Modify Allowed Topics
- Edit `ALLOWED_TOPICS` array in `src/components/ChatBox.js`
- Add new keywords or subject areas as needed

### Update System Prompt
- Modify the system prompt in the `callGeminiAPI` function
- Adjust tone, length, or guidance as needed

## Available Scripts 📝

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## Deployment 🌐

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add `REACT_APP_API_KEY` in environment variables
5. Deploy

### Deploy to Netlify
1. Build your project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Add environment variables in Netlify settings
4. Deploy
