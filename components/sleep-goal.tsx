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
      <Text style={styles.title}>Modify Sleep Goal</Text>
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
      <Text style={styles.guidelinesTitle}>Guidelines</Text>
      <Text style={styles.guidelinesText}>&bull; 0-3 months old: 14-17 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 4-11 months old: 12-16 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 1-2 years old: 11-14 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 3-4 years old: 10-13 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 5-13 years old: 9-11 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 14-17 years old: 8-10 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 18-64 years old: 7-9 hours of sleep</Text>
      <Text style={styles.guidelinesText}>&bull; 65+ years old: 7-8 hours of sleep</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 420
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  goalContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    height: 100
  },
  hoursTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  hoursContainer: {
    flexGrow: 1,
    flex: 1,
    alignItems: 'center',
  },
  hoursInput: {
    backgroundColor: '#333333',
    marginTop: 10,
    borderRadius: 5,
    color: '#FFFFFF',
    width: '50%',
    padding: 10,
    fontSize: 50,
    textAlign: 'center'
  },
  guidelinesTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5
  },
  guidelinesText: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 20
  }
})

export default SleepGoal;