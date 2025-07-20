
export const otherMember = (members , user)=>{
    if(members) return members.find(member=>member._id.toString() !== user._id.toString());
};



