export type QueryLearningRecordParams = {
  studentId: number;
  learningRecordDate: string;
  courseName: string;
  teacherName: string;
};

export type AddLearningRecordParams = {
  learningRecordDate: string;
  studentNumber: string;
  studentCourseEvaluate: string;
  courseContent: string;
  materialsTitle: string;
  courseId: number;
  courseTime: number;
  courseCategoryId: number;
  teacherId: number;
  learningRecordCourseClear: number;
  learningRecordStartTime: string;
  learningRecordEndTime: string;
};

export type UpdateLearningRecordParams = AddLearningRecordParams & {
  learningRecordId: number;
};

export type AddLearningRecordList = AddLearningRecordParams[];
