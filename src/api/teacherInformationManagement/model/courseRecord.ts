export type QueryCourseRecordParams = {
  teacherName: string;
  teacherPhone: string;
};

export type UpdateCourseRecordParams = {
  courseRecordId: string;
  teacherId: string;
  courseId: string;
  courseCategory: string;
  teacherCourseContent: string;
  courseHomework: string | null;
  startTime: string;
  endTime: string;
  date: string;
};
