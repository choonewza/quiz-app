import * as actions from '../actions'
import { ADD_DECK, RECIEVE_DECKS, ADD_CARD_TO_DECK } from '../actions'

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            const newDeck = {
                [action.deck]: {
                    title: action.deck,
                    questions: []
                }
            }
            return {
                ...state,
                ...newDeck
            }
        case RECIEVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case ADD_CARD_TO_DECK:
            const {question, answer, deck, correctAnswer} = action.card
            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    questions: [
                        ...state[deck].questions, {
                            question,
                            answer,
                            correctAnswer
                        }
                    ]
                }
            }
        default:
            return state
    }
}