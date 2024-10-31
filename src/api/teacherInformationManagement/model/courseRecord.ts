export type QueryCourseRecordParams = {
  teacherName: string;
  courseCategoryId: number;
  signingStyle: string;
};

export type UpdateCourseRecordFeeChange = {
  courseRecordId: number;
  courseRecordFeeChange: number;
};

export type UpdateCourseRecordParams = {
  courseRecordId: number;
  teacherId: number;
  courseId: number;
  courseCategory: string;
  teacherCourseContent: string;
  courseHomework: string | null;
  startTime: string;
  endTime: string;
  date: string;
};
