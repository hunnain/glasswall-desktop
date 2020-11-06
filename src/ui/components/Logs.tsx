import React                    from 'react';
import { makeStyles }           from '@material-ui/core/styles';
import Button                   from '@material-ui/core/Button';
import Dialog                   from '@material-ui/core/Dialog';
import IconButton               from '@material-ui/core/IconButton';
import CloseIcon                from '@material-ui/icons/Close';
import DialogActions            from '@material-ui/core/DialogActions';
import DialogContent            from '@material-ui/core/DialogContent';
import DialogContentText        from '@material-ui/core/DialogContentText';
import DialogTitle              from '@material-ui/core/DialogTitle';
import Highlight                from 'react-highlight.js';
//import                          'react-highlight.js/node_modules/highlight.js/styles/dark.css'



const useStyles = makeStyles((theme) => ({
  form: {
    display       : 'flex',
    flexDirection : 'column',
    margin        : 'auto',
    width         : 'fit-content',
  },
  formControl: {
    marginTop     : theme.spacing(2),
    minWidth      : 120,
  },
  formControlLabel: {
    marginTop     : theme.spacing(1),
  }, 
  closeButton: {
    position      : 'absolute',
    right         : theme.spacing(1),
    top           : theme.spacing(1),
    color         : theme.palette.grey[500],
  },
}));


type xmlContent ={
    content     : string| undefined;
    handleOpen  :  () => void;
    isOpen      : boolean;
}
export default function ScrollDialog({isOpen, content, handleOpen }: xmlContent) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [scroll, setScroll] = React.useState<string>('paper');

  const descriptionElementRef = React.useRef(null);
  
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      //descriptionElement && descriptionElement.focus();
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullWidth       ={true}
        maxWidth        ={'lg'}
        open            ={open}
        onClose         ={() => handleOpen()}
        scroll          ={"paper" }
        aria-labelledby ="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Rebuild Events
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleOpen()}>
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers={scroll == 'paper'}>
          <DialogContentText
            id        ="scroll-dialog-description"
            ref       ={descriptionElementRef}
            tabIndex  ={-1}
          >
            <Highlight language='javascript'>{content}</Highlight>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}