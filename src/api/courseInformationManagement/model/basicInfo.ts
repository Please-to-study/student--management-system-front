export type QueryCourseInfoParams = {
  courseName: string;
  courseCategoryId: number;
  courseAddress: string;
  courseStartDate: string;
};

export type AddCourseInfoParams = {
  courseName: string;
  courseCategoryId: number;
  teacherId: number;
  courseSalary: number;
  courseBasicPrice: number;
  courseAddress: string;
  courseNumber: number;
  courseStartDate: string;
  courseIntroduce: string;
  courseNotes: string;
  courseWeekArget: any[];
  courseSemesterArget: any[];
};

export type UpdateCourseInfoParams = AddCourseInfoParams & {
  courseId: number;
};
