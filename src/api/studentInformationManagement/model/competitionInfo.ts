export type AddCompetitionInfoParams = {
  studentNumber: string;
  studentName: string;
  studentPhone: string;
  competitionId: string;
  competitionHonor: string;
  competitionScore: string;
  competitionLanguage: string;
  competitionDate: number;
  competitionGrade: string | null;
  competitionStyle: string | null;
  competitionHost: string | null;
  competitionRegister: string | null;
};

export type UpdateCompetitionInfoParams = AddCompetitionInfoParams & {
  competitionInfoId: string;
};

export type QueryCompetitionInfoParams = {
  studentNumber?: string | null;
  studentName?: string | null;
  competitionName?: string | null;
};
