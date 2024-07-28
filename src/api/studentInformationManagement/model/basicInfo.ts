export type QueryStudentInfoParams = {
  studentNumber?: string | null;
  studentName?: string | null;
  studentPhone?: string | null;
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
  studentId: string;
  studentNumber: string;
};
