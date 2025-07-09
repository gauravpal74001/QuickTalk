import { Menu } from "@mui/material"

const FileComponent = ({AnchorEl}) => {
  return (
    <Menu anchorEl={AnchorEl} open={Boolean(AnchorEl)} >
       <div style={{width:"10rem"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
       </div>
    </Menu>
  )
}

export default FileComponent;
