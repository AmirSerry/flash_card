import { getStorageDecks } from '../utils/utils'

export const GET_DECKS = 'GET_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const REMOVE_DECKS = 'REMOVE_DECKS'

export function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function addNewDeck (deck) {
  return {
    type: ADD_NEW_DECK,
    deck,
  }
}
export function addNewCard (card, title) {
  return {
    type: ADD_NEW_CARD,
    card,
    title,
  }
}

export function removeDecks () {
  return {
    type: REMOVE_DECKS,
  }
}

export function handleData () {
  return (dispatch) => {
    return getStorageDecks ()
      .then((decks) => {
        dispatch(getDecks({ decks }))
      })
  }
}