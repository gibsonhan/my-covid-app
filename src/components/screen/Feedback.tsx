import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { openForm } from "../../util/openFeedbackForm"

function Feedback() {
  const handleOpenForm = () => openForm();

  return (
    <View style={styles.root}>
      <Text>Found a Bug? </Text>
      <Text>or</Text>
      <Text> Want a Feature </Text>
      <Button title="Send me a Message" onPress={handleOpenForm} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Feedback;
