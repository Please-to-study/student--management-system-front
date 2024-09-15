export type QueryStudentInfoParams = {
  studentNumber: string;
  studentName: string;
  studentPhone: string;
};

export type QuerySameStudentInfoParams = {
  studentName: string;
};

export type AddStudentInfoParams = {
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

export type UpdateStudentInfoParams = AddStudentInfoParams & {
  studentId: number;
  studentNumber: string;
};
