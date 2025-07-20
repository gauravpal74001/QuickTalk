import express from "express";
import {
  newGroupChat,
  getMyChats,
  getMyGroupChats,
  addMemberToGroup,
  removeMemberGroup,
  leaveGroupChat,
  sendAttachments,
  getChatById,
  renameGroupChat,
  deleteGroupChat, 
  getMessages
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { multipleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", isAuthenticated, newGroupChat);
app.get("/my", isAuthenticated, getMyChats);
app.get("/my/group", isAuthenticated, getMyGroupChats);
app.put("/addmember", isAuthenticated, addMemberToGroup);
app.put("/removemember", isAuthenticated, removeMemberGroup);
app.delete("/leave/:id", isAuthenticated, leaveGroupChat);
app.post("/attachments", isAuthenticated, multipleUpload, sendAttachments);
app.get("/messages", isAuthenticated, getMessages);

app.route("/:id")
.get(isAuthenticated, getChatById)
.put(isAuthenticated, renameGroupChat)
.delete(isAuthenticated , deleteGroupChat)

export default app;
