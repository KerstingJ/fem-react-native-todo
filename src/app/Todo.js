import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import {
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";

import { BASE_URL } from "../../config";

let { height, width } = Dimensions.get("window");

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        // { id: 0, text: "Learn React Native", isComplete: true },
        // { id: 1, text: "Learn to style in React Native", isComplete: false }
      ],
      newTodo: "" /* ,

      currentId: 1 */
    };
  }

  componentWillMount() {
    fetch(`${BASE_URL}/todos`, {
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ todos: data });
      })
      .catch(console.log);
  }

  handleChange = newTodo => {
    this.setState({ newTodo });
  };

  handleSubmit = e => {
    const { currentId, newTodo } = this.state;

    if (newTodo.trim() === "") return;

    fetch(`${BASE_URL}/todos`, {
      method: "post",
      body: JSON.stringify({
        text: this.state.newTodo,
        isComplete: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        let todos = [...this.state.todos, data];
        this.setState({ todos });
      })
      .catch(console.log);
  };

  toggleTodo = id => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(item => item.id === id);
    todos[index].isComplete = !todos[index].isComplete;
    this.setState({ todos });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={"height"}>
        <View>
          {this.state.todos.map(todo => (
            <TouchableHighlight
              key={todo.id}
              onPress={() => this.toggleTodo(todo.id)}
              underlayColor={"#aaffaa"}
            >
              <Text
                style={[styles.todo, todo.isComplete ? styles.completed : {}]}
              >
                {todo.text}
              </Text>
            </TouchableHighlight>
          ))}
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChange}
            value={this.state.newTodo}
            placeholder={"Add Todo..."}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 25,
    justifyContent: "space-between"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
    padding: 10,
    fontSize: 20
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dddddd",
    padding: 20
  },
  buttonText: {
    fontSize: 20
  },
  todo: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    fontSize: 20,
    padding: 10
  },
  completed: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  }
});
