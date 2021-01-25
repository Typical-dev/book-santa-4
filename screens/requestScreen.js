import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import db from "../components/config"
import firebase from 'firebase'
import MyHeader from "../components/myHeader"

export default class RequestScreen extends Component{
    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            bookName: "",
            reason: "",
        }
    }
    createUniqueID() {
        return (
            Math.random().toString(36).substring(7)
        )
    }

    addRequest = (bookName, reason) => {
        var userID = this.state.userID
        var requestID = this.createUniqueID()
        db.collection("requests").add({
            userID: userID, 
            bookName: bookName,
            reason: reason,
            requestID: requestID
        })
        this.setState({ bookName: "", reason: "" })
        return (
            Alert.alert("Book Requested")
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Request Book"></MyHeader>
                <KeyboardAvoidingView>
                    <View style={styles.keyboardStyle}>
                        <TextInput style={styles.formTextInput} placeholder="Book Name"
                            onChangeText={(text) => {
                            this.setState({bookName: text})
                        }}value = {this.state.bookName}>
                        </TextInput>

                        <TextInput style={styles.formTextInput} placeholder="Reason For Request"
                            onChangeText={(text) => {
                            this.setState({reason: text})
                        }}value = {this.state.reason}>
                        </TextInput>

                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                            this.addRequest
                            }}>
                            
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
                <Text>
                    Book Request Screen
                </Text>
            </View>
        )
    }
}