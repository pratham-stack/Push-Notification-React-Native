import React, { useMemo, useState } from 'react';
import { View, Text, Button } from 'react-native';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  // Example function to calculate a derived value
  const calculateDerivedValue = (input) => {
    console.log('Calculating derived value...');
    return input * 2;
  };

  // Memoized derived value
  const memoizedValue = useMemo(() => calculateDerivedValue(count), [count]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Count: {count}</Text>
      <Text>Memoized Value: {memoizedValue}</Text>
      <Button title="Increment Count" onPress={() => setCount(count + 1)} />
    </View>
  );
};

export default MyComponent;
