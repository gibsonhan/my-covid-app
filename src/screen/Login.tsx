import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Formik } from "formik";

const Login: React.FC<{}> = (props) => {
  return (
    <View style={styles.root}>
      <Text>Login</Text>
      <Formik
        initialValues={{ email: "this should be your email" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <Button onPress={() => handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "center",
  },
  textInput: {
    height: 300,
  },
});

export default Login;
