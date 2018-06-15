import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
    GET_LANGUAGES_LIST,
    SET_LANGUAGE,
    LOAD_TRANSLATIONS,
    LOADING_START,
    LOADING_FINISHED,
    MODAL_OPEN,
    MODAL_CLOSE,
    CHANGE_NEW_TRANSLATION_FIELD,
    EDIT_TRANSLATION_START,
    EDIT_TRANSLATION_FINISH,
    EDIT_TRANSLATION_SNIPPET
} from './actionTypes';
import Header from './components/Header'
import TTable from './components/TTable'
import TModal from './components/TModal'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import agent from './agent'

const mapStateToProps = state =>  state;
const mapDispatchToProps = dispatch => ({
  onGetLaunguagesList: (list) => {
    dispatch({ type: GET_LANGUAGES_LIST, payload: list })
  },
  onSetLanguage: (lang) => {
    dispatch({ type: SET_LANGUAGE, payload: lang })
  },
  onLoadTranslations: (lang, translations) => {
    dispatch({ type: LOAD_TRANSLATIONS, payload: { lang: lang, translations: translations }})
  },
  onLoadingFinished: () => {
    dispatch({ type: LOADING_FINISHED })
  },
  onLoadingStart: () => {
    dispatch({ type: LOADING_START })
  },
  onModalOpen: () => {
    dispatch({ type: MODAL_OPEN })
  },
  onModalClose: () => {
    dispatch({ type: MODAL_CLOSE })
  },
  onChangeNewTranslation: (field, value) => {
    dispatch({ type: CHANGE_NEW_TRANSLATION_FIELD, payload: { field: field, value: value }})
  },
  onEditTranslationStart: ( id ) => {
    dispatch({ type: EDIT_TRANSLATION_START , payload: { id: id }})
  },
  onEditTranslationFinish: ( id ) => {
    dispatch({ type: EDIT_TRANSLATION_FINISH , payload: { id: id }})
  },
  onEditTranslation: ( snippet ) => {
    dispatch({ type: EDIT_TRANSLATION_SNIPPET , payload: { value: snippet }})
  }
});

class App extends PureComponent {
  constructor(props) {
    super(props);
    //this.client = socket();
    this.getLanguages = this.getLanguages.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.getTranslations = this.getTranslations.bind(this);
    this.removeTranslation = this.removeTranslation.bind(this);
    this.updateTranslation = this.updateTranslation.bind(this);
    this.changeNewTranslation =  this.changeNewTranslation.bind(this);
  }
  componentWillMount() {
    this.onLoad();
  }
  onLoad () {
    this.getLanguages()
        .then(()=>this.setLanguage());
  }
  setLanguage = async ( lang ) => {
    const langCode = lang || window.localStorage.getItem('language') || this.props.languages.active.code;
    const langObj = this.props.languages.list.filter( i => i.code === langCode )[0];

    langCode ? this.props.onSetLanguage(langObj) : null;
    window.localStorage.setItem('language', langCode);
    try {
      await this.getTranslations(langCode)
    } catch (err) {
      console.log(err)
    }
  }
  getLanguages = async () => {
    await agent.Langs.list()
        .then(( list ) =>this.props.onGetLaunguagesList( list ))
  }
  getTranslations = async (lang) => {
    const activeLang = lang || this.props.languages.active.code;
    this.props.onLoadingStart();
    try {
      await agent.Translations.get()
          .then( translations => this.props.onLoadTranslations( activeLang, translations ))
          .then( () => this.props.onLoadingFinished())
    } catch (err) {
      console.log(err);
    }
  }
  addTranslation = async ( name, snippet ) => {
    await agent.Translations.add( name, snippet )
        .then(()=>{
          this.getTranslations();
          this.props.onModalClose();
        })
  }
  updateTranslation = async ( id, snippet ) => {
    await agent.Translations.update( id, snippet )
        .then(()=>this.getTranslations())
  }
  removeTranslation = async ( id ) => {
    await agent.Translations.remove( id )
        .then(()=>this.getTranslations())
  }
  changeNewTranslation = ( e ) => {
    this.props.onChangeNewTranslation( e.target.id, e.target.value )
  }
  render() {
    const translations = this.props.translations;
    const lang = this.props.languages.active.code;
    const currentLangData = translations[lang];
    return (
        <div>
          <Header
            langsList={this.props.languages.list}
            activeLang={this.props.languages.active}
            onLangChange={this.setLanguage}
          />
          <div className="button__wrapper">
            <Button variant="contained" color="primary" onClick={this.props.onModalOpen}>
              Add translation
            </Button>
          </div>
          {
            !this.props.common.isLoading || !!currentLangData ?
                <TTable
                  data={currentLangData}
                  onDeleteTranslation={this.removeTranslation}
                  onUpdateTranslation={this.updateTranslation}
                  onEditStart={this.props.onEditTranslationStart}
                  onEditFinish={this.props.onEditTranslationFinish}
                  onEdit={this.props.onEditTranslation}
                  editField={this.props.editField}
                /> : ''
          }
          <TModal
              isOpen={this.props.common.isModalOpen}
              onClose={this.props.onModalClose}
              newTranslation={this.props.newTranslation}
              addTranslation={this.addTranslation}
              onChangeNewTranslation={this.changeNewTranslation}
          />
          <Modal className="fader" open={this.props.common.isLoading} >
            <CircularProgress className="loader" size={100} />
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
