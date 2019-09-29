import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";

import { getTodos, addTodo } from "./actions";

let { height, width } = Dimensions.get("window");

const Todo = props => {
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    props.getTodos();
  }, []);

  const handleChange = value => {
    setNewTodo(value);
  };

  const handleSubmit = e => {
    if (newTodo.trim() === "") return;
    props.addTodo(newTodo.trim());
  };

  const toggleTodo = id => {
    // const todos = [...props.todos];
    // const index = todos.findIndex(item => item.id === id);
    // todos[index].isComplete = !todos[index].isComplete;
    // fetch(`${BASE_URL}/todos`)
    //   .then(res => res.json())
    //   .then(console.log)
    //   .catch(console.log);
    // setState({ todos });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"height"}>
      <View>
        {props.todos.map(todo => (
          <TouchableHighlight
            key={todo.id}
            onPress={() => toggleTodo(todo.id)}
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
          onChangeText={handleChange}
          value={newTodo}
          placeholder={"Add Todo..."}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default connect(
  state => ({
    todos: state.todos.todos
  }),
  {
    getTodos,
    addTodo
  }
)(Todo);

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
