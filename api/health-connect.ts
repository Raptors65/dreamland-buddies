import { initialize, requestPermission, readRecords } from "react-native-health-connect";

export const readSleepData = async () => {
  const isInitialized = await initialize();

  const grantedPermissions = await requestPermission([
    { accessType: 'read', recordType: 'SleepSession' }
  ]);

  // TODO: check if granted

  const now = new Date();
  console.log(now.toISOString());

  const result = await readRecords('SleepSession', {
    timeRangeFilter: {
      operator: 'between',
      startTime: '2023-08-10T16:00:00.000Z',
      endTime: now.toISOString(),
    }
  });

  console.log(result);
};