import React, { Component, PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

export default class TTable extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Paper >
                <Table style={{tableLayout: 'fixed'}}>
                    <TableHead>
                        <TableRow style={{textTransform: 'uppercase'}}>
                            <TableCell numeric>ID</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell style={{textAlign: 'right'}}>Snippet</TableCell>
                            <TableCell numeric>Created</TableCell>
                            <TableCell numeric>Updated</TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data.map(n => {
                            const isEdit = this.props.editField && this.props.editField.id === n.id;
                            const handleEdit = () => this.props.onEditStart( n.id );
                            const closeEditor = () => this.props.onEditFinish( n.id );
                            const handleRemove = () => this.props.onDeleteTranslation( n.id );
                            const onEdit = (e) => this.props.onEdit( e.target.value );
                            const updateSnippet = () => {
                                this.props.onUpdateTranslation( n.id, this.props.editField.editSnippet ).then(()=>closeEditor())
                            }
                            return (
                                <TableRow key={n.id}>
                                    <TableCell numeric>{n.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {n.name}
                                    </TableCell>
                                    <TableCell style={{textAlign: 'right', wordWrap: 'break-word'}}>
                                        {
                                            !isEdit ?
                                                n.snippet:
                                                <TextField
                                                    fullWidth={true}
                                                    value={this.props.editField.editSnippet}
                                                    onChange={onEdit}
                                                />
                                        }
                                    </TableCell>
                                    <TableCell numeric>{n.created}</TableCell>
                                    <TableCell numeric>{n.updated}</TableCell>
                                    <TableCell>
                                        {
                                            !isEdit  ?
                                                <div>
                                                    <IconButton onClick={handleEdit} color="primary">
                                                        <Icon>edit</Icon>
                                                    </IconButton>
                                                    <IconButton onClick={handleRemove} color="secondary">
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </div>
                                                :
                                                <div>
                                                    <IconButton onClick={updateSnippet} color="primary">
                                                        <Icon>save</Icon>
                                                    </IconButton>
                                                    <IconButton onClick={closeEditor} color="secondary">
                                                        <Icon>cancel</Icon>
                                                    </IconButton>
                                                </div>
                                        }


                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}