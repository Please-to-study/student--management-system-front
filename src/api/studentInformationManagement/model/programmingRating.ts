export type QueryProgramRateParams = {
  studentNumber: string;
  studentId: number;
};

export type AddProgramRateParams = {
  studentId: number;
  programRate: string;
  programNotes: string | null;
};

export type UpdateProgramRateParams = AddProgramRateParams & {
  programRateId: number;
};
