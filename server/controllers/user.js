import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { emitEvents, sendToken, TryCatch } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";
import { Chat } from "../models/chats.js";
import { NEW_REQUEST } from "../constants/events.js";
import { Request } from "../models/request.js";


const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password } = req.body;
  if (!name) {
    return next(new ErrorHandler("Name is required", 400));
  }
  if (!username) {
    return next(new ErrorHandler("Username is required", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }

  const avatar = {
    public_id: "samplepublicid",
    url: "sampleurl",
  };

  const user = await User.create({ name, username, password, avatar });

  sendToken(res, user, 201, "User created successfully");
});

const loginUser = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return next(new ErrorHandler("Username is required", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }

  const user = await User.findOne({ username }).select("+password"); //select is used to select the password field
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    return next(new ErrorHandler("Invalid password", 400));
  }

  sendToken(res, user, 200, `${user.name} logged in successfully`);
});

const myprofile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user: user,
  });
});

const logoutUser = TryCatch(async (req, res, next) => {
  res
    .status(200)
    .cookie("Quick-talk-token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({ groupChat: false, members: req.user });
  const myChatMembers = myChats.map((chat) => chat.members).flat(); // .flat() is used to flatten the array [[.],[..],[..]]--->[....]
  const allusersExceptMeFriend = await User.find({
    _id: { $nin: myChatMembers },
    name: { $regex: name, $options: "i" },
  });

  const modUsers = allusersExceptMeFriend.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  res.status(200).json({
    success: true,
    users: modUsers,
  });
});

const sendRequest = TryCatch(async (req, res, next) => {
  const { recieverId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, reciever: recieverId },
      { sender: recieverId, reciever: req.user },
    ],
  });
  if (request) return next(new ErrorHandler("Request already sent", 400));

  const newRequest = await Request.create({
    sender: req.user,
    reciever: recieverId,
  });

  emitEvents(req, NEW_REQUEST, recieverId, "New Request");

  res.status(201).json({
    success: true,
    message: "Request sent successfully",
    request: newRequest,
  });
});

const acceptRequest = TryCatch(async (req, res, next) => {
  const { senderId, accept } = req.body;
  const request = await Request.findOne({
    sender: senderId,
    reciever: req.user,
  })
    .populate("sender", "name")
    .populate("reciever", "name");
  if (!request) return next(new ErrorHandler("Request not found", 404));

  if (request.reciever._id.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorized to accept this request", 403)
    );

  if (!accept) {
    await request.deleteOne();
    res.status(200).json({
      success: true,
      message: "Request rejected successfully",
    });
  }

  const members = [senderId, req.user];
  const chat = await Chat.create({
    name: `${request.sender.name} and ${request.reciever.name}`,
    members,
    groupChat: false,
  });

  await request.deleteOne();

  emitEvents(req, NEW_REQUEST, senderId, "Request Accepted");

  res.status(200).json({
    success: true,
    message: "Request accepted successfully",
    chat,
  });
});

const getMyNotifications = TryCatch(async (req, res, next) => {
  const notifications = await Request.find({
    reciever: req.user,
  })
    .populate("sender", "name avatar")
    .sort({ createdAt: -1 });

  const allnoti = notifications.map(({ _id, sender }) => {
    return {
      _id,
      sender: {
        _id: sender._id,
        name: sender_name,
        avatar: sender.avatar.url,
      },
    };
  });

  res.status(200).json({
    success: true,
    notifications: allnoti,
  });
});

const getMyFriends = TryCatch(async (req, res, next) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");
  
  if(!chats) return next(new ErrorHandler("No chats found", 404));

  const friends = chats.map(({members}) => {
    // Filter out the current user and get the other member
    const [otherMember] = members.filter(member => 
      member._id.toString() !== req.user.toString()
    );

    // Return formatted friend object
    return {
      _id: otherMember._id,
      name: otherMember.name,
      avatar: otherMember.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } 
  
    res.status(200).json({
      success: true,
      friends,
    });
  
});

export {
  newUser,
  loginUser,
  myprofile,
  logoutUser,
  searchUser,
  sendRequest,
  acceptRequest,
  getMyNotifications,
  getMyFriends,
};
