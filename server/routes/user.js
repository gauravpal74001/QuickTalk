import express from "express";
import {
  newUser,
  loginUser,
  myprofile,
  logoutUser,
  searchUser,
  sendRequest,
  acceptRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleUpload, newUser);
app.post("/login", loginUser);

app.use(isAuthenticated); //middleware to check if the user is authenticated
app.get("/me", myprofile);
app.get("/logout", logoutUser);
app.get("/search", searchUser);
app.post("/send", sendRequest);
app.put("/accept", acceptRequest);
app.get("/notifications", getMyNotifications);
app.get("/friends" , getMyFriends);
export default app;
