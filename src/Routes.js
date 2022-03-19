import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import PrivateRoute from "./Auth/helper/PrivateRoute";
import Main from "./Core/Main";
import Home from "./Student/Pages/Home";
import Notification from "./Student/Pages/Notification";
import EditorPage from "./Student/Pages/Editor";
import Profile from "./Student/Pages/Profile.js";
import AdminRoute from "./Auth/helper/AdminRoute";
import AdminHome from "./Staff/Pages/AdminHome";
import Forms from "./Staff/Pages/Forms";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact element={<Main />} />
          <Route path="/student" element={<PrivateRoute />}>
            <Route path="Profile" exact element={<Profile />} />
            <Route path="Home" exact element={<Home />} />
            <Route path="Notification" exact element={<Notification />} />
          </Route>
          <Route path="/editor" exact element={<EditorPage />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="Home" exact element={<AdminHome />} />
            <Route path="Forms" exact element={<Forms />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
