# TaskJoy : AI Powered Task Management App

> **Create your entire to-do list with just one prompt!**

TaskJoy is a smart, AI-powered task manager that transforms how you organize your life. No more manual entries—just type what you need, and AI handles the rest. Whether you're organizing your day, managing a project, or brainstorming ideas, TaskJoy makes productivity effortless.

![TaskJoy Banner](/TaskJoy/src/assets/TaskJoy_Dashboard.png)

## ✨ Features

- **🤖 AI-Powered Task Generation** - Generate comprehensive task lists from simple prompts
- **🎨 Modern UI/UX** - Beautiful, responsive interface built with ShadCN components
- **🔐 Secure Authentication** - Seamless sign-up and login flows with Clerk
- **☁️ Cloud Storage** - Efficient data management with Appwrite backend
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🎯 Smart Organization** - AI helps categorize and prioritize your tasks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jimit8929/TaskJoy.git
   cd TaskJoy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Appwrite Configuration
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   
   # AI Service (OpenAI/Gemini/etc.)
   VITE_AI_API_KEY=your_ai_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: ShadCN/UI + Tailwind CSS
- **Authentication**: Clerk
- **Backend**: Appwrite
- **AI Integration**: Google Gemini
- **State Management**: Zustand / Context API
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier

## 🎯 How It Works

1. **Sign In** - Create an account or log in with Clerk authentication
2. **Describe Your Goals** - Type a simple prompt like "Plan my week" or "Organize my project"
3. **AI Magic** - TaskJoy's AI generates a comprehensive task list
4. **Manage & Track** - Edit, prioritize, and check off tasks as you complete them
5. **Stay Organized** - All your tasks are securely stored and synced across devices

## 📸 Screenshots


### Task Management
![Task Management](/TaskJoy/src/assets/Front_Page_Image.png)

### AI Task Generation
![AI Generation](/TaskJoy/src/assets/TaskJoy_AI_Creation.png)

### All Projects
![All Project Section](/TaskJoy/src/assets/TaskJoy_ALLProjects.png)

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📚 Development

### Project Structure
```
TaskJoy/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── lib/                # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── store/              # State management
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking

## 🔧 Configuration

### Clerk Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Add them to your `.env.local` file

### Appwrite Setup
1. Create an Appwrite account at [appwrite.io](https://appwrite.io)
2. Create a new project
3. Set up a database and collection for tasks
4. Configure your API keys and endpoints

## 🐛 Known Issues

- [ ] Task drag-and-drop reordering
- [ ] Offline mode support
- [ ] Task templates and categories

## 📈 Future Roadmap

- [ ] **Mobile App** - Native iOS and Android apps
- [ ] **Team Collaboration** - Share tasks with team members
- [ ] **Advanced AI** - More sophisticated task generation
- [ ] **Calendar Integration** - Sync with Google Calendar, Outlook
- [ ] **Voice Commands** - Create tasks with voice input
- [ ] **Analytics** - Productivity insights and reports

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful component library
- [Clerk](https://clerk.com/) for seamless authentication
- [Appwrite](https://appwrite.io/) for backend services
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## 📞 Support

If you have any questions or need help:

- 📧 Email: [jimit8929@gmai.com](mailto:jimit8929@gmail.com)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/jimit8929">Jimit</a></p>
  <p>⭐ Don't forget to star this repository if you found it helpful!</p>
</div>

## 🔗 Links

- [Live Demo](https://taskjoy-demo.vercel.app) *(Coming Soon)*

---

*Transform your productivity with AI-powered task management. Start using TaskJoy today!*