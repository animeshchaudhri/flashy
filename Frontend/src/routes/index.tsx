import UserDashboard from "../pages/User/UserDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProtectedRoute from "../components/auth/Protectedroute";

import { Roles } from "../types/globals";
import HomePage from "../pages/Home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/Signup";
import Signout from "../pages/Signout";
import CardPage from "../pages/User/CardPage";
import ResultPage from "../pages/User/ResultPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-out",
    element: <Signout />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"] as Roles[]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cards",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"] as Roles[]}>
        <CardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/result",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"] as Roles[]}>
        <ResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"] as Roles[]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
];
