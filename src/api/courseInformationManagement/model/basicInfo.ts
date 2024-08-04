export type QueryCourseInfoParams = {
  courseName?: string | null;
  courseAddress?: string | null;
};

export type AddCourseInfoParams = {
  studentName: string;
  studentGender: number;
  studentPhone: string;
  studentAccount: string | null;
  studentSchool: string | null;
  studentEnterGrade: string | null;
  studentCurrentGrade: string | null;
  studentAddress: string | null;
  studentNotes: string | null;
};

export type UpdateCourseInfoParams = AddCourseInfoParams & {
  studentId: string;
  studentNumber: string;
};
