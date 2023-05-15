import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    isOpen: boolean,
    message: string,
    state: (state: boolean) => void,
    action: () => void
}
export const ConfirmationDialog: React.FC<Props> = ({ isOpen, message, state, action }) => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(isOpen);

    useEffect(() => {
        if (message) {
            setDialogOpen(isOpen)
        }
    }, [isOpen]);

    const handleClose = () => {
        state(false);
    };


    return <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="remove-product-alert-dialog"
        aria-describedby="confirm-remove-product"
    >
        <DialogTitle id="remove-product-alert-dialog">
            {message}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={async () => {
                await action();
                handleClose();
            }}>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
}