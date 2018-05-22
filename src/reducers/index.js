// import * as actions from '../actions'
import { ADD_DECK, RECIEVE_DECKS, ADD_CARD_TO_DECK} from '../actions'

const deck = (state={}, action) => {
    switch(action.type){
        case ADD_DECK:
            const newDeck = { 
                [action.deck] : { 
                    title: action.deck, 
                    questions[] 
                } 
            }
            return {
                ...state,
                ...newDeck
            }
        case RECIEVE_DECKS:
            return{
                ...state,
                ...action.decks
            }

        case ADD_CARD_TO_DECK:
            const { question, answer, deck, correctAnswer } = action.card
            return {
                ...state,
                [deck]: {
                    ....state[deck],
                    questions: [...state[deck].questions, { question, answer, correctAnswer }]
                }
            }
        default:
            return state            
    }

    // switch(action.type) {
    //     case ADD_DECK:
    //         text = "Banana is good!";
    //         break;
    //     case "Orange":
    //         text = "I am not a fan of orange.";
    //         break;
    //     case "Apple":
    //         text = "How you like them apples?";
    //         break;
    //     default:
    //         text = "I have never heard of that fruit...";
    // }
}

export default deck