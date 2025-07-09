import { AvatarGroup, Box, Stack , Avatar } from "@mui/material"

const AvtarCard = ({avatar=[] , max=4}) => {
  return (
    <Stack direction={"row"} spacing={"0.5rem"}>
      <AvatarGroup max={max}>
         <Box width={"5rem"} height={"2rem"} overflow={"hidden"}>
             {
                avatar.map((item, index)=>{
                    return (
                        <Avatar 
                        key={index}
                        src={item}
                        alt={`avatar ${index}`}
                        sx={{
                            width:"2rem",
                            height:"2rem",
                            position:"absolute",
                            left:{
                                xs:`${0.5+index}rem`,
                                sm:`${0.5+index}rem`,
                            }
                        }}
                        />
                    )
                })
             }
         </Box>
      </AvatarGroup>
    </Stack>
  )
}

export default AvtarCard;
