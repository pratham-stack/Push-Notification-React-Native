import React, { useContext, useState } from "react";
import { Button, Text, View } from "react-native";

// First we need to create the context
const MyContext = React.createContext();


//Secondly create a provider for the same
const MyProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      {children}
    </MyContext.Provider>
  );
};


const MyComponent = () => {
  const { count, setCount } = useContext(MyContext);
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment Count" onPress={() => setCount(count + 1)} />
    </View>
  );
};

const Test = () => {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  )
}

export default Test;