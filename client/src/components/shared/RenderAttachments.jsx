import { Typography  } from "@mui/material";
// import {  tansformImage } from "../../lib/features";
import { AttachFile } from "@mui/icons-material";


export const RenderAttachments = ({file , url}) => {
    
    if(file==="image"){
        return <img src={url} alt="attachment" style={{width:"100px" , height:"100px"}} />
    }
    if(file==="video"){
        return <video src={url} width={100} height={100} controls download/>
    }
    if(file==="audio"){
        return <audio src={url} width={100} height={100} controls download/>
    }
    if(file==="document"){
        return <a href={url} target="_blank" download>
            <Typography variant="body1" color="primary">
                {url.split("/").pop()}
            </Typography>
        </a>
    }
    return <AttachFile/>
};


