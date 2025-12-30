import { describe, it, expect } from "vitest";
import { calculateCognitiveStats } from "./cognitiveEngine";

it("low focus should generate a critical log", () => {
  const result = calculateCognitiveStats({
    sleepHours: 3,
    studyHours: 10,
    coffeeIntake: 5,
    stressLevel: 9,
  });

  const hasCritical = result.logs.some(
    log => log.type === "error"
  );

  expect(hasCritical).toBe(true);
});



