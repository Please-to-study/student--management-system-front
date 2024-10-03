export type QueryLearningRecordParams = {
  studentId: number;
  learningRecordDate: string;
};

export type AddLearningRecordParams = {
  studentId: number;
  courseId: number;
  teacherId: number;
  courseRecordId: number;
  studentCourseEvaluate: string;
  materialsId: number;
  courseCategoryId: number;
  learningRecordNotes: string;
};

export type UpdateLearningRecordParams = AddLearningRecordParams & {
  learningRecordId: number;
};
