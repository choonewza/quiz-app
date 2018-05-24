import {AsyncStorage} from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks'

const initialData = {
    Geography: {
        title: 'Geography',
        questions: [
            {
                question: 'Is South Africa a country?',
                answer: 'No, it is just a region',
                correctAnswer: 'false'
            }, {
                question: 'Which US State is next to California?',
                answer: 'New York',
                correctAnswer: 'false'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that func' +
                        'tion was declared.',
                correctAnswer: 'true'
            }, {
                question: 'What is a variable?',
                answer: 'Somethig that stores information.',
                correctAnswer: 'true'
            }
        ]
    }
}

export const getData = () => {
    return initialData
}

export const getDecks = () => {
    return AsyncStorage
        .getItem(FLASHCARDS_STORAGE_KEY)
        .then(results => {
            if (results === null) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
                return initialData
            } else {
                return JSON.parse(results)
            }
        })
}

export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export const addCardToDeck = (name, card) => {
    return AsyncStorage
        .getItem(FLASHCARDS_STORAGE_KEY)
        .then(results => JSON.parse(results))
        .then(results => {
            results[name]
                .questions
                .push(card)
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
            return results
        })
}