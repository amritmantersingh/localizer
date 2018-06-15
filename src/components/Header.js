import React, { Component, PureComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }
    onChangeLanguage = (e) => {
        this.props.onLangChange(e.target.value)
    }
    render () {
        const languages = this.props.langsList ? this.props.langsList : [];
        const langsList = languages.map( i =>
            <MenuItem key={i.code} value={i.code}>{i.native}</MenuItem>
        )
        return (
            <AppBar position="static" color="default">
                <h3>Whoer Localizator</h3>
                <Select
                    style={{width:160}}
                    value={this.props.activeLang.code}
                    onChange={this.onChangeLanguage}
                >
                    { langsList }
                </Select>
            </AppBar>
        )
    }
}