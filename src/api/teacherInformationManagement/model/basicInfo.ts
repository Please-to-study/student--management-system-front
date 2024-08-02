export type QueryTeacherInfoParams = {
  teacherName?: string | null;
  teacherPhone?: string | null;
};

export type AddTeacherInfoParams = {
  teacherName: string;
  teacherGender: number;
  teacherPhone: string;
  teacherPassword: string;
  teacherAddress: string | null;
  teacherSigning: string;
  teacherPayStyle: string;
  teacherNotes: string | null;
};

export type UpdateTeacherInfoParams = AddTeacherInfoParams & {
  teacherId: string;
};
