import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function CustomDialog({title, buttonText, children}){
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        {buttonText||"button"}
      </Button>
      
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className=" flex justify-between">
          {title||"Dialog"}
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 float-right"
          >
            <span>Close</span>
          </Button>
        </DialogHeader>
        <DialogBody className="min-h-48">
          {
            children
          }
        </DialogBody>
        <DialogFooter>
          <div></div>
        </DialogFooter>
      </Dialog>
    </>
  );
}