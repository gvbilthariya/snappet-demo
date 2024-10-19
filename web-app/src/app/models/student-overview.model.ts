import { Student } from "./student.model";

export interface StudentOverview {
    student: Student;
    exercisesCompleted: number;
    averageProgress: number;
    totalProgress: number;
    correctAnswers: number;
}