export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BrainStats {
  focusLevel: number;
  logicPower: number;
  bugCount: number;
  coffeeDependency: number;
  brainRamUsage: number;
}

export interface Inputs {
  sleepHours: number;
  studyHours: number;
  coffeeIntake: number;
  stressLevel: number;
}

export interface ErrorLogItem {
  type: 'error' | 'warning' | 'info';
  message: string;
  details?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  message: string;
}