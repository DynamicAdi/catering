import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routers/App.jsx";
import ErrorPage from "./routers/error.jsx";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import "./components/sass/universal.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "./routers/Update.jsx";
import Menu from "./routers/Menu.jsx";
import { ArrayProvider } from "./components/funcs/context.jsx";
import Items from "./routers/Items.jsx";
import Login from "./components/pages/Login.jsx";
import Admin from "./components/pages/Admin.jsx";

const URL = import.meta.env.VITE_BACKEND_URL
// console.log(BACKEND);

// const URL = "https://catering-axn8.onrender.com"

// console.log(URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ArrayProvider>
        <Routes>
          <Route errorElement={<ErrorPage />} path="/" element={<App backend={URL}/>} />
          <Route path="/menu" element={<Menu backend={URL} />} errorElement={<ErrorPage />} />
          <Route
            path="/menu/:category"
            element={<Menu backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard"
            element={<Admin backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/edit"
            element={<Update backend={URL} />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/dashboard/items"
            element={<Items />}
            errorElement={<ErrorPage />}
          />

          <Route
            path="/admin/login"
            element={<Login backend={URL} />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </ArrayProvider>
    </BrowserRouter>
  </StrictMode>
);
