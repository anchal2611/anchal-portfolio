import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import HomePage from "../pages/HomePage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ProjectsPage from "../pages/ProjectsPage";
import AchievementsPage from "../pages/AchievementsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "projects", Component: ProjectsPage },
      { path: "projects/:id", Component: ProjectDetailPage },
      { path: "achievements", Component: AchievementsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
