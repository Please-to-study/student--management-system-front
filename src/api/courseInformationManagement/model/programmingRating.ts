export type QueryProgramRateParams = {
  studentNumber?: string | null;
  studentName?: string | null;
};

export type AddProgramRateParams = {
  studentId: string;
  studentPhone: string;
  programRate: string;
  studentNotes: string | null;
};

export type UpdateProgramRateParams = AddProgramRateParams & {
  programRateId: string;
};
