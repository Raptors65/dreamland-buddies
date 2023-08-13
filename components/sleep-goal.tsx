import React, { SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type SleepGoalProps = {
  minimumHours: number;
  setMinimumHours: React.Dispatch<SetStateAction<number>>;
  maximumHours: number;
  setMaximumHours: React.Dispatch<SetStateAction<number>>;
};

function SleepGoal({ minimumHours, setMinimumHours, maximumHours, setMaximumHours }: SleepGoalProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Goal</Text>
      <View style={styles.goalContainer}>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursTitle}>Minimum Hours</Text>
          <TextInput
            editable
            onChangeText={(newValue) => setMinimumHours(newValue ? parseInt(newValue.replace(/[^0-9]/g, '')) : 0)}
            keyboardType="numeric"
            value={minimumHours.toString()}
            style={styles.hoursInput}
          />
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursTitle}>Maximum Hours</Text>
          <TextInput
            editable
            onChangeText={(newValue) => setMaximumHours(newValue ? parseInt(newValue.replace(/[^0-9]/g, '')) : 0)}
            keyboardType="numeric"
            value={maximumHours.toString()}
            style={styles.hoursInput}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  goalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  hoursTitle: {
    color: '#FFFFFF',
    fontSize: 20
  },
  hoursContainer: {
    flexGrow: 1,
  },
  hoursInput: {
    backgroundColor: '#111111',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    color: '#FFFFFF',
    padding: 10,
    fontSize: 16
  }
})

export default SleepGoal;