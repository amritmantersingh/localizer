import React, { Component, PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TModal extends PureComponent {
    constructor(props) {
        super(props);
        this.addTranslation = this.addTranslation.bind(this);
    }
    addTranslation = () => {
        this.props.addTranslation( this.props.newTranslation.name, this.props.newTranslation.snippet )
    }
    render () {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new translation</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        type="email"
                        onChange={this.props.onChangeNewTranslation}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="snippet"
                        label="Snippet"
                        type="email"
                        onChange={this.props.onChangeNewTranslation}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.addTranslation} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}