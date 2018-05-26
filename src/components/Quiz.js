import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import React, { Component } from 'react'

import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, Animated} from 'react-native'

import { purple, white, red, orange, green } from '../utils/colors'
import ActionButton from './ActionButton'
import Info from './Info'

class Quiz extends Component {
    state = {
        questionNumber: 0,
        showQuestion: false,
        correct: 0,
        incorrect: 0,
        animation: new Animated.Value(0.5),
        rotate: new Animated.Value(0),
        colorChange: new Animated.Value(0)
    }

    showAnswer = () => {
        this.setState((state, props) => ({
            showQuestion: !state.showQuestion
        }))
    }

    submitAnswer = (answer) => {
        //check if the answer is correct
        const {questionNumber} = this.state
        const deck = this.props.navigation.state.params.entryId
        const {decks} = this.props
        const correct = decks[deck]
            .questions[questionNumber]
            .correctAnswer
            .toLowerCase()

        if (answer.trim() === correct.trim()) {
            this.setState((state, props) => ({
                correct: state.correct + 1
            }))
        } else {
            this.setState((state, props) => ({
                incorrect: state.incorrect + 1
            }))
        }

        //increment questionNumber
        this.setState((state, props) => ({
            questionNumber: state.questionNumber + 1,
            showQuestion: false
        }))

        //show animation
        this.handleAnimation()
    }

    handleAnimation = () => {
        Animated
            .spring(this.state.animation, {
                toValue: 1.1,
                friction: 2,
                tension: 360,
                duration: 1000
            })
            .start(() => {
                Animated
                    .spring(this.state.animation, {
                        toValue: 1,
                        duration: 100
                    })
                    .start()
            })

        Animated
            .timing(this.state.rotate, {
                toValue: 360,
                duration: 1500,
                delay: 1000
            })
            .start(() => {
                Animated
                    .timing(this.state.rotate, {
                        toValue: 0,
                        duration: 1000
                    })
                    .start()
            })

        Animated
            .timing(this.state.colorChange, {
                toValue: 1,
                duration: 1500
            })
            .start(() => {
                Animated
                    .timing(this.state.colorChange, {
                        toValue: 0,
                        duration: 1500
                    })
                    .start()
            })
    }

    replayQuiz = () => {
        this.setState({
            questionNumber: 0,
            showQuestion: false,
            correct: 0,
            incorrect: 0
        })
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: null
        }))
    }

    render() {
        const deck = this.props.navigation.state.params.entryId
        const {decks} = this.props
        const {questionNumber} = this.state
        const number = this.state.questionNumber + 1

        const questionModels = decks[deck].questions

        const animatedStyle = {
            transform: [
                {
                    scale: this.state.animation
                }
            ]
        }

        const rotateInterpolate = this
            .state
            .rotate
            .interpolate({
                inputRange: [
                    0, 360
                ],
                outputRange: ["0deg", "1080deg"]
            })

        const rotateAnimatedStyle = {
            transform: [
                {
                    rotate: rotateInterpolate
                }
            ]
        }

        const boxInterpolate = this
            .state
            .colorChange
            .interpolate({
                inputRange: [
                    0, 1
                ],
                outputRange: ["rgba(242,111,40,1)", "rgba(185,63,179,1)"]
            })

        const boxAnimatedStyle = {
            backgroundColor: boxInterpolate
        }

        if (questionNumber === questionModels.length) {
            return (
                <View style={ styles.container }>
                  <Animated.View style={ [styles.card, boxAnimatedStyle] }>
                    <Animated.View style={ animatedStyle }>
                      <Text style={ styles.mainText }>You got { this.state.correct } out of { questionModels.length }!</Text>
                    </Animated.View>
                    { this.state.correct > this.state.incorrect
                      ? <Animated.View style={ rotateAnimatedStyle }>
                          <Image style={ styles.image } source={ require('../img/happy.png') } />
                        </Animated.View>
                      : <Animated.View style={ rotateAnimatedStyle }>
                          <Image style={ styles.image } source={ require('../img/sad.png') } />
                        </Animated.View> }
                    <View>
                      <ActionButton styles={ actionBtnStyle } text={ 'Try Again' } color={ purple } onPress={ this.replayQuiz } />
                      <ActionButton styles={ actionBtnStyle } text={ 'Back' } color={ green } onPress={ this.goBack } />
                    </View>
                  </Animated.View>
                </View>
            )
        }

        const questionModel = questionModels[questionNumber]
        return (
            <View style={ styles.container }>
              <View style={ styles.card }>
                <Text style={ styles.questions }>
                  { number } /
                  { questionModels.length }
                </Text>
                { !this.state.showQuestion
                  ? <Text style={ styles.mainText }>
                      { questionModel.question }
                    </Text>
                  : <Text style={ styles.mainText }>
                      { questionModel.answer }
                    </Text> }
                { !this.state.showQuestion
                  ? <Info style={ styles.answer } onPress={ this.showAnswer }>Show Answer</Info>
                  : <Info style={ styles.answer } onPress={ this.showAnswer }>Show Question</Info> }
                <View>
                  <ActionButton styles={ actionBtnStyle } text={ 'Correct' } color={ green } onPress={ () => this.submitAnswer('true') } />
                  <ActionButton styles={ actionBtnStyle } text={ 'Incorrect' } color={ red } onPress={ () => this.submitAnswer('false') } />
                </View>
              </View>
            </View>
        )
    }
}

const actionBtnStyle = StyleSheet.create({
    iosBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        width: 170
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questions: {
        top: 0,
        alignSelf: 'flex-start',
        left: 0,
        color: white,
        fontSize: 20,
        margin: 5,
        position: 'absolute'
    },
    answer: {
        color: white,
        fontSize: 20,
        margin: 20
    },
    card: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: orange,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    mainText: {
        fontSize: 40,
        color: white,
        marginTop: 40,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 200
    }
});

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)