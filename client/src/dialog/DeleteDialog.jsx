import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography   } from "@mui/material"


const DeleteDialog = ({open , close , deletehandler}) => {
  return (
   <Dialog open={open} onClose={close}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this group?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>No</Button>
        <Button onClick={deletehandler}>Yes</Button>
      </DialogActions>
   </Dialog>
  ) 
}

export default DeleteDialog;
