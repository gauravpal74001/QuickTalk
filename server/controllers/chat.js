import { Chat } from "../models/chats.js";
import { TryCatch } from "../utils/features.js";
import ErrorHandler from "../utils/utility.js";
import { emitEvents } from "../utils/features.js";
import { ALERT, REFETCH_CHATS , NEW_ATTACHMENTS , NEW_MESSAGE_ALERT  } from "../constants/events.js";
import { otherMember } from "../lib/helper.js";
import { User } from "../models/user.js";
import {Message} from "../models/messages.js";
import {deleteFromCloudinary} from "../utils/features.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (!name) {
    return next(new ErrorHandler("Name is required", 400));
  }
  if (members && members.length < 2) {
    return next(new ErrorHandler("At least 2 members are required", 400));
  }

  const allMembers = [...members, req.user];
  console.log(allMembers);

  const chat = await Chat.create({
    name: name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvents(req, ALERT, allMembers, `welcome to ${name} group chat`);
  emitEvents(req, REFETCH_CHATS, allMembers);

  res.status(201).json({
    success: true,
    message: "Group chat created successfully",
    chat: chat,
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );
  const othermember = otherMember(chats.members, req.user);

  const transformedChats = chats.map((chat) => {
    return {
      _id: chat._id,
      name: chat.name,
      groupChat: chat.groupChat,
      creator: chat.creator,
      avatar: chat.groupChat
        ? chat.members &&
          chat.members.slice(0, 3).map((member) => {
            return member.avatar.url;
          })
        : [othermember.avatar.url],
      members: chat.members.reduce((prev, acc) => {
        if (acc._id.toString() !== req.user.toString()) {
          prev.push(acc.avatar.url);
        }
        return prev;
      }, []),
    };
  });

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroupChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    groupChat: true,
    members: req.user,
    creator: req.user,
  }).populate("members", "name avatar");

  const transformedChats = chats.map(
    ({ _id, name, creator, members, groupChat }) => {
      return {
        _id: _id,
        name: name,
        creator: creator,
        groupChat: groupChat,
        avatar: members.slice(0, 3).map((member) => {
          return member.avatar.url;
        }),
        members: members,
      };
    }
  );

  res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const addMemberToGroup = TryCatch(async (req, res, next) => {
  const { chatId, membersIds } = req.body;
  if(!chatId || !membersIds){ 
    return next(new ErrorHandler("Chat id and members ids are required" , 400))
  }

  if(!membersIds || membersIds.length < 1){
    return next(new ErrorHandler("Members are required", 400));
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not the creator of this group chat", 400)
    );
  }

  const UserPromise = [];
  membersIds.map((i) => {
    UserPromise.push(User.findById(i).select("name"));
  });
  const newUsers = await Promise.all(UserPromise);
  const newUsernames = newUsers.map((i) => i.name).join(","); //join the names with comma "a,b,c"
   
  const UniqueUsers = newUsers.filter((i)=>{
    return !chat.members.includes(i._id.toString());
  })
  chat.members.push(...UniqueUsers.map((i)=>i._id.toString())); 
  await chat.save();


  emitEvents(
    req,
    ALERT,
    chat.members,
    `welcome to ${chat.name} group chat ${newUsernames}`
  );
  emitEvents(req, REFETCH_CHATS, chat.members);

  res.status(200).json({
    success: true,
    message: "Member added to group successfully",
    chat: chat,
  });
});

const removeMemberGroup = TryCatch(async(req, res , next)=>{
    const {Chatid , memberId} = req.body;
    
    if(!Chatid || !memberId) return next(new ErrorHandler("Chat id and member id are required", 400));
    if(  memberId && memberId.length < 1) return next(new ErrorHandler("At least one member is required", 400));
    
    const chat = await Chat.findById(Chatid);
    if(!chat) return next(new ErrorHandler("Chat not found", 404));

    if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

    if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler("You are not the creator of this group chat", 400));

    const memberPromise =[];
    memberId.forEach((i)=>{
        memberPromise.push(User.findById(i).select("name"));
    })
    const members=await Promise.all(memberPromise);
    const memberNames=members.map((i)=>i.name).join(",");

    chat.members = chat.members.filter((i)=>{
        return i.toString() !== memberId.toString();
    })
    await chat.save();

    emitEvents(req, ALERT, chat.members, `removed ${memberNames} from ${chat.name} group chat`);
    emitEvents(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
        success:true,
        message:"Member removed from group successfully",
        chat:chat,
    })

})

const leaveGroupChat = TryCatch(async(req, res , next)=>{
     const chatId = req.params.id;
     if(!chatId) return next(new ErrorHandler("Chat id is required", 400));

     const chat= await Chat.findById(chatId);
     if(!chat) return next(new ErrorHandler("Chat not found", 404));

     if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

     if(chat.members.length <3) return next(new ErrorHandler("You cannot leave a group chat with less than 3 members", 400));
     //admin leave 
     if(chat.creator.toString() === req.user.toString()){
        const newadmin= chat.members.find((i)=>i.toString()!==req.user.toString());
        chat.creator=newadmin;
     }

     chat.members=chat.members.filter((i)=>i.toString()!==req.user.toString());
     await chat.save();

     const username = await User.findById(req.user).select("name");

     emitEvents(req, ALERT, chat.members, `${username.name} left ${chat.name} group chat`);
     emitEvents(req, REFETCH_CHATS, chat.members);

     res.status(200).json({
        success:true,
        message:"Left group chat successfully",
        chat:chat,
     })
     
})

const sendAttachments = TryCatch(async(req, res , next)=>{
    const {chatId} = req.body;
    if(!chatId ) return next(new ErrorHandler("Chat id and user id are required", 400));

    const chat = await Chat.findById(chatId);
    const userId = await User.findById(req.user);
    if(!chat) return next(new ErrorHandler("Chat not found", 404));

    const files=req.files;
    if(!files || files.length < 1) return next(new ErrorHandler("At least one file is required", 400));
    if(files.length > 5 ) return next(new ErrorHandler("You can only send up to 5 files", 400));
    
    //upload cloudinary
    const attacments=[];

    const messageforRealtime = {
      content:"",
      attacments:attacments,
       sender:{
        _id:userId,
        name:userId.name,
       },
      chat:chatId,
    };

    const messageforDB = {
       content:"",
       attacments:attacments,
       sender: userId._id,
       chat:chatId,
    };

    const message = await Message.create(messageforDB);

    emitEvents(req,NEW_ATTACHMENTS, chat.members , {
        message:messageforRealtime,
        chatId:chatId,
    })

    emitEvents(req,NEW_MESSAGE_ALERT, chat.members , {
        chatId:chatId,
    })
    
    res.status(200).json({
        success:true,
        message:"Attachments sent successfully",
        message:message,
    })
    
})

const getChatById = TryCatch(async(req , res, next)=>{
    if(req.query.populate==="true"){
        const chatId = req.params.id;
        const chat= await Chat.findById(chatId).populate("members" , "name avatar").lean(); 
        //lean() is used to convert the mongoose document to a plain javascript object
        //and we dont want to save the changes in mongoose document
        if(!chat) return next(new ErrorHandler("Chat not found", 404));

        chat.members=chat.members.map(({_id, name , avatar})=>{
            return {
                _id: _id,
                name: name,
                avatar: avatar.url,
            }
        })

        res.status(200).json({
            success:true,
            chat:chat,
        })
    }
    else{
        const chatId = req.params.id;
        const chat= await Chat.findById(chatId);
        if(!chat) return next(new ErrorHandler("Chat not found", 404));

        res.status(200).json({
            success:true,
            chat:chat,
        })
    }
})

const renameGroupChat = TryCatch(async(req , res , next)=>{
    const {chatId , name} = req.body;
    if(!chatId || !name) return next(new ErrorHandler("Chat id and name are required", 400));

    const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("Chat not found", 404));

    if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));
    if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler("You are not the creator of this group chat", 400));
    if(!chat.members.includes(req.user.toString())) return next(new ErrorHandler("You are not a member of this group chat", 400));
    
    chat.name=name;
    await chat.save();

    emitEvents(req, ALERT, chat.members, `Group chat renamed to ${name}`);
    emitEvents(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
        success:true,
        message:"Group chat renamed successfully",
        chat:chat,
    })
})

const deleteGroupChat= TryCatch(async(req, res, next)=>{
   const chatid=req.params.id;
   const chat = await Chat.findById(chatid);
   if(!chat) return next(new ErrorHandler("Chat not found", 404));

   if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));
   if(chat.creator.toString() !== req.user.toString()) return next(new ErrorHandler("You are not the creator of this group chat", 400));
   if(!chat.members.includes(req.user.toString())) return next(new ErrorHandler("You are not a member of this group chat", 400));

   //delete all the messages from the cloudinary 
   const public_url = [];
   const messageAttachments= await Message.find({chat:chatid , attachments: {
    exist:true, $ne:[]
   }} ).select("attacments");
   messageAttachments.map(({attachments})=>(
       attachments.map(({public_id})=>{
        public_url.push(public_id);
       })
   ))

   await Promise.all([
    deleteFromCloudinary(public_url),
    Message.deleteMany({chat:chatid}),
    chat.deleteOne()
   ])

   emitEvents(req, ALERT, chat.members, `Group chat deleted`);
   emitEvents(req, REFETCH_CHATS, chat.members);

   res.status(200).json({
    success:true,
    message:"Group chat deleted successfully",
   })

})

const getMessages = TryCatch(async(req, res, next)=>{
    const {chatId} = req.params;
    const {page} = req.query;
    const messagePerPage=20;
    const skip = (page-1)*messagePerPage;

    const messages = await Message.find({chat:chatId}).sort({createdAt:-1}).skip(skip).limit(limit).page(page).lean();
    const messageCount =await Message.countDocuments({chat:chatId});

    const totalPages = Math.ceil(messageCount/messagePerPage);

    res.status(200).json({
        success:true, 
        messages:messages,
        totalPages:totalPages
    })
    
})


export { newGroupChat, getMyChats, getMyGroupChats, addMemberToGroup , removeMemberGroup , leaveGroupChat , sendAttachments , getChatById , renameGroupChat , deleteGroupChat , getMessages};
 