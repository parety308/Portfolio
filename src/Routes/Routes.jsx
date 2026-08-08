import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home";
import ProjectDetails from "../components/ProjectDetails/ProjectDetails";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "projects/:id", Component: ProjectDetails },
      { path: "*", Component: NotFound },
    ],
  },
]);
