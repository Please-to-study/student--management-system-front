export type AddCompetitionInfoParams = {
  studentId: number;
  competitionId: number;
  competitionHonor: string;
  competitionScore: number;
  notes: string;
};

export type UpdateCompetitionInfoParams = AddCompetitionInfoParams & {
  competitionInfoId: number;
};

export type QueryCompetitionInfoParams = {
  studentNumber: string;
  studentId: number;
  competitionId: number;
  competitionGroup: string;
  competitionYear: string;
};
