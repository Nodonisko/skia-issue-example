import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircle } from './AnimatedCircle';

// empty array filled with 30 elements filled with index
const range = Array.from({ length: 30 }, (_, i) => i);

export default function App() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {range.map((i) => (
          <AnimatedCircle key={i} />
        ))}
        <AnimatedCircle />

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
