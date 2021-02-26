import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions  from 'expo-permissions'

export const STORAGE_KEY = 'UdacityPFlashcards:decks'
export const NOTIFICATION_KEY = 'UdacityPFlashcards:notifications'


export function getStorageDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => formatDecksData(results))
}

function setInitialData () {
  const decks = {
    Programming: {
      title: 'Programming',
      questions: [
        {
          question: 'define programming?',
          answer: 'Steps to solve a problem'
        }
      ]
    },
    Science: {
      title: 'Science',
      questions: [
        {
          question: 'define science?',
          answer: 'searching for a soluation for a challenge '
        }
      ]
    }
  }

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))

  return decks
}

function formatDecksData (results) {
  return results === null
    ? setInitialData()
    : JSON.parse(results)
}


export function addNewDeckCard (card, title) {
    getStorageDecks()
    .then((decks) => {
      return {
        ...decks,
        [title]: {
          title,
          questions: decks[title].questions.concat([card])
        }
      }
    })
    .then((newDecks) => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks))
    })
}


export function removeDecksFromStorage () {
  return AsyncStorage.removeItem(STORAGE_KEY)
}


export function saveDeck(title) {
    getStorageDecks()
    .then((decks) => {
      return {
        ...decks,
        [title]: {
          title,
          questions: [],
        }
      }
    })
    .then((newDecks) => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks))
    })
}

export function clearNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNewNotification () {
  return {
    title: 'Flashcards',
    body: "hey review your cards today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(16)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNewNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}