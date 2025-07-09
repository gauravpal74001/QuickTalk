import { styled } from "@mui/material/styles";
import {Link as LinkComponent} from "react-router-dom";


export const VisuallyHiddenInput = styled('input')({
    clip:"rect(0 0 0 0)",
    clipPath:"inset(50%)",
    height:"1px",
    overflow:"hidden",
    position:"absolute",
    bottom:0,
    right:0,
    whiteSpace:"nowrap",
    width:"1px",
});

export const Link = styled(LinkComponent)({
    textDecoration:"none",
    color:"inherit",
    "&:hover":{
        color:"rgba(0,0,0,0.1)"
    }
});