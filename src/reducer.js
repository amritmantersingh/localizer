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

const initialState = {
  languages: {
    list: [],
    active: {
      code: 'en',
      name: 'English',
      native: 'English'
    }
  },
  translations: {},
  common: {
    isLoading: true,
    isModalOpen: false
  },
  newTranslation: {
    name: '',
    snippet: ''
  },
  editField: {}
};

export default (state = initialState, action) => {

  switch (action.type) {
    case LOADING_START: {
      return {
        ...state,
        common: {
          ...state.common,
            isLoading: true
        }
      }
    }
    case LOADING_FINISHED: {
      return {
        ...state,
        common: {
          ...state.common,
          isLoading: false
        }
      }
    }
    case GET_LANGUAGES_LIST:
      return {
          ...state,
        languages: {
          ...state.languages,
          list: action.payload
        }
      };
    case SET_LANGUAGE:
      return {
        ...state,
        languages: {
            ...state.languages,
          active: action.payload
        },
        editField: {}
      };
    case LOAD_TRANSLATIONS:
      const currentLangTranslations = {};
      currentLangTranslations[action.payload.lang] = action.payload.translations;
      return {
          ...state,
        translations: {
            ...state.translations,
            ...currentLangTranslations
        }
      }
    case MODAL_OPEN:
      return {
          ...state,
        common: {
            ...state.common,
          isModalOpen: true
        },
        editField: {}
      }
    case MODAL_CLOSE:
      return {
        ...state,
        common: {
          ...state.common,
          isModalOpen: false,
        },
        newTranslation: {
          name: '',
          snippet: ''
        }
      }
    case CHANGE_NEW_TRANSLATION_FIELD:
      const fieldUpdate = {};
      fieldUpdate[action.payload.field] = action.payload.value;
      return {
          ...state,
        newTranslation: {
            ...state.newTranslation,
            ...fieldUpdate
        }
      }
    case EDIT_TRANSLATION_START:
      const defaultSnippetValue = state.translations[state.languages.active.code].filter( i => i.id === action.payload.id )[0].snippet;
      return {
          ...state,
        editField: {
              id: action.payload.id,
              editSnippet: defaultSnippetValue
            }
          }
    case EDIT_TRANSLATION_FINISH:
      return {
        ...state,
        editField: {}
      }
    case EDIT_TRANSLATION_SNIPPET:
      return {
        ...state,
        editField: {
          ...state.editField,
          editSnippet: action.payload.value
        }
      }
    default:
      return state;
  }

  return state;

};
