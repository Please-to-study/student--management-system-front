export type QueryCourseRecordParams = {
  teacherName?: string | null;
  courseName?: string | null;
};

export type UpdateCourseRecordParams = {
  teacherId: string;
  courseId: string;
  courseCategory: string;
  teacherCourseContent: string;
  courseHomework: string | null;
  startTime: string;
  endTime: string;
  date: string;
};
