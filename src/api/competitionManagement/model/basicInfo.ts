export type QueryCompetitionParams = {
  competitionName: string;
  competitionLanguage: string;
  competitionYear: string;
};

export type AddCompetitionParams = {
  competitionName: string;
  competitionStyle: number;
  competitionGroup: string;
  competitionYear: string;
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
