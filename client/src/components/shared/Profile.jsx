import { Avatar, Stack, Typography } from "@mui/material";
import {
  Person as PersonIcon,
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack
      textAlign={"center"}
      spacing={"1rem"}
      padding={"1rem"}
      elevation={1}
      borderRadius={"1rem"}
      border={"1px solid rgba(0,0,0,0.1)"}
      textalign={"center"}
      justifyContent={"center"}
    >
       <Avatar sx={{
        width:"150px",
        height:"150px",
        color:"white",
        marginBottom:"1rem",
        objectFit: "cover",
        position:"relative",
        top:"-30px",
        left:"55%",
        transform:"translateX(-50%)",
        border:"2px solid white",
        boxShadow:"0 0 10px 0 rgba(0,0,0,0.1)",
       }} 
       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s">
        <PersonIcon/>
       </Avatar>
      <ProfileCard text={"Gaurav Pal"} Icon={PersonIcon} heading={"Name"} />
      <ProfileCard text={"Palg74005"} Icon={FaceIcon} heading={"Username"} />
      <ProfileCard
        text={moment("2025-06-07").fromNow()}
        Icon={CalendarIcon}
        heading={"joined"}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={"2rem"}
    alignItems={"center"}
    padding={"1rem"}
    textAlign={"center"}
    justifyContent={"center"}
  >
    <Icon />
    <Stack direction={"column"} spacing={"0.2rem"}>
      <Typography variant="body1" fontWeight={"bold"}>
        {text}
      </Typography>
      <Typography
        variant="caption"
        fontWeight={"bold"}
        color={"text.secondary"}
      >
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
