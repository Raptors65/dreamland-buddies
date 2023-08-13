import type { RecordResult } from "react-native-health-connect/lib/typescript/types";
import Creature from "../types/creature";

export default function calculateStreak(sleepData: RecordResult<"SleepSession">[], minimumHours: number, maximumHours: number) {
  let streak = 0;

  for (const sleepSession of sleepData) {
    const startTime = Date.parse(sleepSession.startTime);
    const endTime = Date.parse(sleepSession.endTime);

    const durationInHours = (endTime - startTime) / 1000 / 60 / 60;

    if (durationInHours > minimumHours && durationInHours < maximumHours) {
      streak++;
    } else {
      streak = 0;
    }
  }

  // TODO: remove (this is only for testing)
//   streak += 2000

  return streak;
}