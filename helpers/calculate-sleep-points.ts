import type { RecordResult } from "react-native-health-connect/lib/typescript/types";

export default function calculateSleepPoints(sleepData: RecordResult<"SleepSession">[], minimumHours: number, maximumHours: number) {
  let sleepPoints = 0;
  let streak = 0;

  for (const sleepSession of sleepData) {
    const startTime = Date.parse(sleepSession.startTime);
    const endTime = Date.parse(sleepSession.endTime);

    const durationInHours = (endTime - startTime) / 1000 / 60 / 60;

    if (durationInHours > minimumHours && durationInHours < maximumHours) {
      streak++;
      if (streak < 7) {
        sleepPoints += 9 + streak; // 1st: 10, 2nd: 11, 3rd: 12
      } else if (streak < 28) {
        sleepPoints += 43 + streak; // 7th: 50, 8th: 51, 9th: 52,
      } else if (streak < 365) {
        sleepPoints += 72 + streak; // 28th: 100, 29th: 101, 30th: 102
      } else {
        sleepPoints += 635 + streak; // 365th: 1000, 366th: 1001
      }
    } else {
      streak = 0;
    }
  }

  return sleepPoints;
}