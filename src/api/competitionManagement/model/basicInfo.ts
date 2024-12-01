export type QueryCompetitionParams = {
  competitionName: string;
  competitionLanguageId: number;
  competitionYear: string;
  isFuture: Boolean;
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
  competitionLanguageId: number;
  introduce: string;
  competitionNotes: string;
};

export type UpdateCompetitionParams = AddCompetitionParams & {
  competitionId: number;
};
