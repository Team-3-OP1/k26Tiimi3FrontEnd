import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ManufacturerPage from "./pages/ManufacturerPage";
import LoginDialog from "./pages/LoginDialog";
import RegisterDialog from "./pages/RegisterDialog";
import MyReservations from "./pages/MyReservations";
import ProfilePage from "./pages/ProfilePage";
import "./css/index.css";
import App from "./App.tsx";
import AppThemeProvider from "./theme/AppThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "manufacturers/:id/products",
        element: <ManufacturerPage />,
      },
      {
        path: "login",
        element: <LoginDialog />,
      },
      {
        path: "register",
        element: <RegisterDialog />,
      },
      {
        path: "omat-varaukset",
        element: <MyReservations />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </StrictMode>,
);
