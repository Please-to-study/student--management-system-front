export type QueryCompetitionParams = {
  competitionName: string;
  competitionHost: string;
};

export type AddCompetitionParams = {
  competitionName: string;
  competitionStyle: string;
  competitionCost: string;
  competitionHost: string;
  competitionRegister: string;
  competitionDate: string;
  competitionLanguage: string;
  introduce: string;
  competitionNotes: string;
};

export type UpdateCompetitionParams = AddCompetitionParams & {
  competitionId: number;
};
