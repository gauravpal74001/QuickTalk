import { memo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { orange } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import { RenderAttachments } from "./RenderAttachments";

const MessageComponent = ({ message, user }) => {
  const { attachments = [], content, sender, createdAt, _id } = message;
  const isMyMessage = sender._id === user._id;

  return (
    <Box
      sx={{
        alignSelf: isMyMessage ? "flex-end" : "flex-start",
        maxWidth: "60%",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          backgroundColor: isMyMessage ? `${orange}` : "background.paper",
          color: isMyMessage ? "white" : "text.primary",
          position: "relative",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "scale(1.01)",
            transition: "transform 0.2s ease",
          },
        }}
      >
        {sender.name && (
          <Typography
            variant="caption"
            color="white"
            sx={{
              position: "relative",
              top: 0,
              left: 0,
              padding: "0.5rem",
              fontSize: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            {sender.name}
          </Typography>
        )}

        {content && (
          <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
            {content}
          </Typography>
        )}

        {attachments && attachments.length > 0 && (
          <Box sx={{ mt: 1 }}>
            {attachments.map((attachment, index) => {
              const { public_id, url } = attachment;
              const file = fileFormat(url);

              return (
                <Box key={public_id || index} sx={{ mt: 1 }}>
                  <a href={url} target="_blank" rel="noopener noreferrer" download style={{ color: "inherit", textDecoration: "none" }}>
                    <RenderAttachments file={file} url={url} />
                  </a>
                </Box>
              );
            })}
          </Box>
        )}
        
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: -20,
            right: isMyMessage ? 0 : "unset",
            left: isMyMessage ? "unset" : 0,
            color: "text.secondary",
            fontSize: "0.7rem",
            opacity: 0.8,
          }}
        >
          {moment(createdAt).format("HH:mm")}
        </Typography>
      </Paper>
    </Box>
  );
};

export default memo(MessageComponent);
