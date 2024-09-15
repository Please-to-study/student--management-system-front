export type AddCompetitionInfoParams = {
  // studentNumber: string;
  studentId: number;
  // studentPhone: string;
  competitionId: number;
  competitionHonor: string;
  competitionScore: string;
  competitionLanguage: string;
  competitionDate: string;
  competitionGrade: string | null;
  competitionStyle: string | null;
  competitionHost: string | null;
  competitionRegister: string | null;
};

export type UpdateCompetitionInfoParams = AddCompetitionInfoParams & {
  competitionInfoId: number;
};

export type QueryCompetitionInfoParams = {
  studentNumber: string;
  studentId: number;
  competitionId: number;
};
