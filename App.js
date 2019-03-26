import React, { Component } from "react";
import firebase from "./src/firebase/firebaseConfig";
import { List, ListItem } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom_projet: "",
      description: "",
      date_debut: new Date(),
      duree: 0,
      chef_projet: ""
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.text}> Ajouter un projet </Text>
          <Toast ref="toast" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nom de projet"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={text => this.setState({ nom_projet: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="description"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={text => this.setState({ description: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Duree"
          placeholderTextColor="gray"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={text => this.setState({ duree: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Date début"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={text => this.setState({ date_debut: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Chef de projet"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={text => this.setState({ chef_projet: text })}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            let currentComponent = this;
            console.log(this.state);
            let projet = {
              nom_projet: this.state.nom_projet,
              description: this.state.description,
              date_debut: this.state.date_debut,
              duree: this.state.duree,
              chef_projet: this.state.chef_projet
            };
            let db = firebase.firestore();
            db.collection("projets")
              .add({
                ...projet
              })
              .then(function(docRef) {
                console.log("adding document to firestore" + docRef);
                currentComponent.refs.toast.show(
                  "Ajout effectué avec succés",
                  500
                );
                /*currentComponent.setState({
                  nom_projet: "",
                  description: "",
                  date_debut: "",
                  duree: 0,
                  chef_projet: ""
                });*/
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          }}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: "#17a2b8",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  saveBtn: {
    width: windowWidth,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6B9EFA"
  },
  container: {
    paddingTop: 30,

    padding: 20
  },
  input: {
    padding: 10,
    margin: 15,
    height: 40,
    color: "#17a2b8",
    borderColor: "#17a2b8",
    borderWidth: 1
  },
  submitButton: {
    fontSize: 20,
    backgroundColor: "#17a2b8",

    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
