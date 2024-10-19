import { Student } from "./student.model";

export interface StudentPerformance {
  student: Student;
  class: string;
  grade: string;
  attendance: number;
  progress: number;
  correctAnswers: number;
  totalExercises: number;
  subjects: SubjectProgress[];
  learningObjectives: LearningObjectiveProgress[];
  strengths: string;
  weaknesses: string;
  recentActivities: RecentActivities[];
}

export interface SubjectProgress {
  name: string;
  progress: number;
  correctAnswers: number
}

export interface SubjectProgressIntermediate {
  progress: number;
  correctAnswers: number;
  total: number;
}

export interface LearningObjectiveProgress {
  name: string;
  progress: number;
}

export interface LearningObjectiveProgressIntermediate {
  progress: number;
  total: number;
}

export interface RecentActivities {
  task: string;
  completionTime: string
}