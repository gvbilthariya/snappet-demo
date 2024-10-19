export interface StudentExamData {
    submittedAnswerId: number;
    submitDateTime: string;
    correct: number;
    progress: number;
    userId: number;
    exerciseId: number;
    difficulty: string;
    subject: string;
    domain: string;
    learningObjective: string;
}