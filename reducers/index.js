import { GET_DECKS, ADD_NEW_DECK, ADD_NEW_CARD, REMOVE_DECKS } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_NEW_DECK :
      const { deck } = action
      let data = state.decks
      return {
        ...state,
        decks: {
          ...data,
          [deck.title]: deck
        },
      }
    case ADD_NEW_CARD :
      const { card, title } = action
      data = state.decks
      return {
        ...state,
        decks: {
          ...data,
          [title]: {
            title: title,
            questions: data[title].questions.concat([card])
          }
        },
      }
    case REMOVE_DECKS :
      return {
        ...state,
        decks: {},
      }
    default :
      return state
  }
}

export default decks