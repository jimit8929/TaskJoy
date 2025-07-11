import { createBrowserRouter } from 'react-router-dom' 
import RootLayout from "@/layouts/RootLayout";
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';

import type { RouteObject } from 'react-router';
import RootErrorBoundary from '@/pages/RootErrorBoundary';
import AuthSyncPage from '@/pages/AuthSyncPage';
import AppLayout from '@/layouts/AppLayout';
import appAction from "@/routes/actions/appActions";

import InboxPage from '@/pages/InboxPage';
import inboxTaskLoader from './loaders/inboxLoader';

import TodayTaskPage from '@/pages/TodayTaskPage';
import todayTaskLoader from './loaders/todayTaskLoader';
import UpcomingTaskLoader from './loaders/UpcomingTaskLoader';
import UpcomingTaskPage from '@/pages/UpcomingTaskPage';
import CompletedTaskPage from '@/pages/CompletedTaskPage';
import completedTaskLoader from './loaders/completedLoader';
import projectAction from './actions/projectAction';
import ProjectsPage from '@/pages/ProjectsPage';
import projectsLoader from './loaders/projectsLoader';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import projectDetailLoader from './loaders/projectDetailLoader';
import appLoader from './loaders/appLoader';
import ProjectErrorBoundary from '@/pages/ProjectErrorBoundary';

const rootRouteChildren:RouteObject[] = [
      {
        index:true,
        element: <HomePage/>
      },
      {
        path: 'register',
        element: <RegisterPage/>
      },
      {
        path: "Login",
        element: <LoginPage/>
      },
      {
        path: "auth-sync",
        element: <AuthSyncPage/>
      }
    ];

const appRouteChildren:RouteObject[] = [
  {
    path: "inbox",
    element: <InboxPage/>,
    loader:inboxTaskLoader,
  },
  {
    path:"today",
    element: <TodayTaskPage/>,
    loader: todayTaskLoader
  },
    {
    path:"upcoming",
    element: <UpcomingTaskPage/>,
    loader: UpcomingTaskLoader
  },
   {
    path:"completed",
    element: <CompletedTaskPage/>,
    loader: completedTaskLoader
  },
  {
    path: "projects",
    element: <ProjectsPage/>,
    action: projectAction,
    loader: projectsLoader,
  },
  {
    path: "projects/:projectId",
    element: <ProjectDetailPage/>,
    loader: projectDetailLoader,
    errorElement: <ProjectErrorBoundary/>
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary/>,
    children: rootRouteChildren,
  },
  {
    path: "/app",
    element: <AppLayout/>,
    children: appRouteChildren,
    action: appAction,
    loader: appLoader,
  }
])


export default router;