import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// This file is just an example to show how to do API requests with react native
export default props => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("https://www.reddit.com/.json")
      .then(res => res.json())
      .then(data => setPosts(data.data.children));
  }, []);

  if (!posts) {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }

  console.log(posts);

  return (
    <View>
      <Text>Reddit</Text>
      <View>
        {posts.map(post => {
          return <Text key={post.data.id}>{post.data.author}</Text>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 25
  }
});
