export type QueryCompetitionRegisterParams = {
  competitionName: string;
  studentNumber: string;
  studentId: number;
};

export type AddCompetitionRegisterParams = {
  competitionId: number;
  studentId: number;
  competitionRegisterNotes: string;
};

export type UpdateCompetitionRegisterParams = AddCompetitionRegisterParams & {
  competitionRegisterId: number;
};
