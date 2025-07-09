

export const chats = [
    {
        _id:"1",
        name:"John Doe",
        avatar:[    
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        ],
        groupChat:false,
        isOnline:true,
        sameSender:false,
        newMessageAlert:[],
        index:0,
    },
    {
        _id:"2",
        name:"Parik Doe",
        avatar:[    
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        ],
        groupChat:false,
        isOnline:true,
        sameSender:false,
        newMessageAlert:[],
        index:0,
    },

];

export const sampleUser = [{
    _id:"1",
    name:"John Doe",
    avatar:[    
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s", ]
},
{
    _id:"2",
    name:"Parik Doe",
    avatar:[    
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s", ]
},
{
    _id:"3",
    name:"Parik Doe",
    avatar:[    
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s", ]   
}
];

export const sampleNotification = [
    {
        _id:"1",
        sender:{
            name: "John Doe",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        },
     },
     {
        _id:"2",
        sender:{
            name: "Parik Doe",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
        },
     }
]

export const sampleMesages = [
    {
        attachments:[{
            public_id:"1",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s"
,

           
        }],
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        sender:{
            _id:"1",
            name:"John Doe",
        },
        chats:"chatId",
        createdAt:new Date(),
        _id:"1",
    }
]