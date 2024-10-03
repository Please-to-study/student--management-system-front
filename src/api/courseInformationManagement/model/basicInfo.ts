export type QueryCourseInfoParams = {
  courseName: string;
  courseCategoryId: number;
  courseAddress: string;
};

export type AddCourseInfoParams = {
  courseName: string;
  courseCategoryId: number;
  teacherId: number;
  courseAddress: string;
  courseNumber: number;
  courseStartDate: string;
  courseIntroduce: string;
  courseNotes: string;
  courseArget: any[];
};

export type UpdateCourseInfoParams = AddCourseInfoParams & {
  courseId: string;
};
