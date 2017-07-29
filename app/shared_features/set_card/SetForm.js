// NOTE: this is one of the places where I'm using internal state rather than redux global state
// reason for doing so is because this intended to be used multiple times in a giant listview
// it's therefore easier to keep the state attached to the component rather than build a giant array in redux

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pill from 'app/shared_features/pill/Pill';

class SetForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setNumber: this.props.setNumber,
            exercise: this.props.exercise,
            tags: this.props.tags,
            weight: this.props.weight,
            metric: this.props.metric,
            rpe: this.props.rpe,
            removed: this.props.removed,
            editingExercise: false,
            suggestions: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            setNumber: nextProps.setNumber,
            exercise: nextProps.exercise,
            tags: nextProps.tags,
            weight: nextProps.weight,
            metric: nextProps.metric,
            rpe: nextProps.rpe,
            removed: nextProps.removed
        });
    }

    // KEYBOARD

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this._keyboardDidHide() });
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide() {
        this._save();
    }

    // SAVING

    componentDidUpdate(nextProps, nextState) {
        if (nextState.metric !== this.state.metric) {
            this._save();
        }
    }

    _save() {
        if (this.props.exercise !== this.state.exercise
            || this.props.weight !== this.state.weight
            || this.props.metric !== this.state.metric
            || this.props.rpe !== this.state.rpe) {
            this.props.saveSet(this.props.setID, this.state.exercise, this.state.weight, this.state.metric, this.state.rpe);
        }
    }

    _toggleMetric() {
        if (this.state.metric === 'kgs') {
            this.setState({metric: 'lbs'})
        } else if (this.state.metric === 'lbs') {
            this.setState({metric: 'kgs'})
        }
    }

    // RENDER

    _displayExercise() {
        if (this.state.exercise === null || this.state.exercise === '') {
            return (<Text style={[styles.exerciseText, styles.placeholderText]}>Enter Exercise</Text>);
        }
        return (<Text style={styles.exerciseText}>{this.state.exercise}</Text>);
    }

    _displayTags() {
        if (this.state.tags === undefined || this.state.tags === null || this.state.tags.length === 0) {
            return (<Text style={[styles.exerciseText, styles.placeholderText]}>Enter Tags</Text>);
        }

        var pills = [];
        let position = 0;
        this.state.tags.map((tag) => {
            let key = position;
            pills.push(
                <Pill key={key} text={tag} style={{paddingRight: 5, paddingBottom: 3}} />
            );
            position++;
        });

        return (<View style={styles.tagField}>{pills}</View>);
    }

    _displaySetNumber() {
        if (this.state.removed) {
            return null;
        }
        if (this.state.setNumber === null || this.state.setNumber === undefined) {
            return '#1';
        }
        return '#' + this.state.setNumber;
    }

    _displayMetric() {
        if (this.state.metric === 'kgs') {
            return "KGs";
        } else if (this.state.metric === 'lbs') {
            return "LBs";
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', opacity: this.state.removed ? 0.3 : 1}}>
                <View style={styles.upperShadow} />
                <View style={[styles.shadow, {flex: 1, flexDirection: 'column', padding: 5}]}>
                    <View style={styles.field}>
                        <TouchableHighlight onPress={() => this.props.tapExercise(this.props.setID, this.state.exercise)}>
                            {this._displayExercise()}
                        </TouchableHighlight>
                        <View style={styles.fieldDetails} pointerEvents='none'>
                            <Text style={styles.detailText}>{this._displaySetNumber()}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={[styles.field, {flex: 1, marginRight: 5}]}>
                            <TextInput
                                style={styles.fieldText}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'transparent'}
                                editable = {true}
                                placeholder="Enter Weight"
                                placeholderTextColor={'lightgray'}
                                value={this.state.weight}
                                onFocus={() => this.props.onFocus() }
                                onChangeText={(weight) => this.setState({weight: weight}) }
                            />
                            <View style={styles.fieldDetails}>
                                <TouchableOpacity onPress={() => this._toggleMetric()}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={styles.detailText}>{this._displayMetric()} </Text>
                                        <Icon name="refresh" size={10} color="gray" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.field, {flex: 1}]}>
                            <TextInput
                                style={styles.fieldText}
                                keyboardType={'numeric'}
                                underlineColorAndroid={'transparent'}
                                editable = {true}
                                placeholder="Enter RPE"
                                placeholderTextColor={'lightgray'}
                                value = {this.state.rpe}
                                onFocus={() => this.props.onFocus() }
                                onChangeText={(rpe) => this.setState({rpe: rpe}) }
                            />
                            <View style={styles.fieldDetails} pointerEvents='none'>
                                <Text style={styles.detailText}>RPE</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={[styles.field, {flex: 1}]}>
                            <TouchableHighlight onPress={() => this.props.tapTags(this.props.setID, this.state.tags)}>
                                {this._displayTags()}
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    field: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 5,
        zIndex: 2,
        minHeight: (Platform.OS === 'ios') ? 30 : 40,
    },
    fieldDetails: {
        position: 'absolute',
        right: 5,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    fieldText: {
        height: (Platform.OS === 'ios') ? 30 : 40,
        fontSize: 15,
        paddingRight: 30
    },
    exerciseText: {
        height: (Platform.OS === 'ios') ? 30 : 40,
        paddingTop: (Platform.OS === 'ios') ? 6 : 8,
        paddingLeft: (Platform.OS === 'ios') ? 0 : 4,
        fontSize: 15,
        paddingRight: 30,
        color: 'black'
    },
    tagField: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        minHeight: (Platform.OS === 'ios') ? 30 : 40,
        paddingLeft: 2,
        paddingRight: 0,
    },
    placeholderText: {
        color: 'lightgray'
    },
    detailText: {
        color: 'gray'
    },
    upperShadow: {
        shadowColor: "#000000",
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            height: 1,
            weight: 0
        },
        height: 1,
        backgroundColor: 'white'
    },
    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
    }
});

export default SetForm;
