export type QueryCourseInfoParams = {
  courseName?: string | null;
  courseAddress?: string | null;
};

export type AddCourseInfoParams = {
  courseName: string;
  courseCategory: string;
  teacherId: string;
  courseAddress: string;
  courseStartTime: string;
  coursePrice: number;
  courseNumber: number;
  courseIntroduce: string;
  courseNotes: string;
  courseArget: any[];
  // courseBeginTime: string;
  // courseEndTime: string;
  // courseWeekend: string;
};

export type UpdateCourseInfoParams = AddCourseInfoParams & {
  courseId: string;
};
