import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface Props {
  name: string;
  test?: number;
}

const Feedback: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <Text>Feedback</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Feedback;
