

export const fileFormat = (url="")=>{
  const fileExt= url.split(".").pop();

  if(fileExt==="mp4" || fileExt==="mov" || fileExt==="avi" || fileExt==="wmv" || fileExt==="flv" || fileExt==="mkv" || fileExt==="webm"){
    return "video";
  }
  if(fileExt==="jpg" || fileExt==="jpeg" || fileExt==="png" || fileExt==="gif"){
    return "image";
  }
  if(fileExt==="pdf" || fileExt==="doc" || fileExt==="docx" || fileExt==="xls" || fileExt==="xlsx" || fileExt==="ppt" || fileExt==="pptx"){
    return "document";
  }
  if(fileExt==="mp3" || fileExt==="wav" ||fileExt==="m4a" || fileExt==="ogg" || fileExt==="aac"){
    return "audio";
  }
  return "file";
}


export const tansformImage =(url="" , width=100 ) => url;