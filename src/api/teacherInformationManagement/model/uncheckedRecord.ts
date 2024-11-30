export type QueryUncheckedRecordParams = {
  teacherId: number;
};

export type UpdateRefuseRecordParams = {
  learningRecordId: number;
  studentId: number;
  courseRecordId: number;
  studentCourseEvaluate: string;
  courseContent: string;
  materialsId: number;
  materialsTitle: string;
  courseId: number;
  courseTime: number;
  courseCategoryId: number;
  teacherId: number;
  learningRecordCourseClear: number;
  learningRecordStartTime: string;
  learningRecordEndTime: string;
};
