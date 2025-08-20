import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Gradebook from "./pages/Gradebook.jsx";
import Class from "./pages/Class.jsx";
import AdminTools from "./pages/AdminTools.jsx";
import Analytics from "./pages/Analytics.jsx";
import Feedback from "./pages/Feedback.jsx";
import Calendar from "./pages/Calendar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, 
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "settings", // routes: Dashboard -> 
        element: <Settings/>,
      },
      {
        path: "gradebook", // authentication required (teacher status + class assigned status); routes: class/:id ->
        element:<Gradebook/>
      },
      {
        path:"class/:id", // authentication required (teacher status + class assigned status)
        element:<Class/>
      },
      {
        path:"adminTools", // authentication required (admin status); routes: settings ->
        element: <AdminTools/>
      },
      {
        path:"analytics", // authentication required (teacher status|| student status ? class assigned status : none)
        element: <Analytics/>
      },
      {
        path:"feedback/:id", // authentication required  (teacher status)
        element:<Feedback/>
      },
      {
        path:"calendar",
        element:<Calendar/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
