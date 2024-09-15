import { defHttp } from '@/utils/http/axios';
import { BasicPageParams, CommonFetchResult } from '@/api/model/baseModel';
import {
  AddCompetitionParams,
  QueryCompetitionParams,
  UpdateCompetitionParams,
} from '@/api/competitionManagement/model/basicInfo';
import { QueryCompetitionScheduleParams } from '@/api/competitionManagement/model/competitionSchedule';
import {
  QueryCompetitionAwardsDetailParams,
  QueryCompetitionAwardsParams,
} from '@/api/competitionManagement/model/competitionAwards';
import {
  AddCompetitionRegisterParams,
  QueryCompetitionRegisterParams,
  UpdateCompetitionRegisterParams,
} from '@/api/competitionManagement/model/competitionRegister';

enum Api {
  // 基本信息
  AddCompetition = '/competition/addCompetition',
  UpdateCompetition = '/competition/updateCompetition',
  DeleteCompetition = '/competition/deleteCompetition',
  AllCompetitionList = '/competition/getAllCompetition',
  QueryCompetitionList = '/competition/getSpecialCompetition',
  CompetitionById = '/competition/getCompetitionById',

  // 赛事日程表
  CompetitionSchedule = '/competition/getCompetitionSchedule',

  // 比赛获奖情况
  // AllCompetitionAwardsList = '/competition/getAllCompetitionAwards',
  QueryCompetitionAwardsList = '/competition/getCompetitionAwards',
  CompetitionAwardsById = '/competition/getCompetitionAwardsById',

  // 比赛预报名
  AddCompetitionRegister = '/competition/addCompetitionRegister',
  UpdateCompetitionRegister = '/competition/updateCompetitionRegister',
  DeleteCompetitionRegister = '/competition/deleteCompetitionRegister',
  QueryCompetitionRegisterList = '/competition/getCompetitionRegister',
  CompetitionRegisterById = '/competition/getCompetitionRegisterById',
}

export const addCompetition = (params: AddCompetitionParams) =>
  defHttp.post({ url: Api.AddCompetition, params });

export const updateCompetition = (params: UpdateCompetitionParams) =>
  defHttp.post({ url: Api.UpdateCompetition, params });

export const getAllCompetitionList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllCompetitionList, params });

export const getSpecialCompetitionList = (
  params: QueryCompetitionParams = { competitionName: '', competitionHost: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.QueryCompetitionList, params });

export const deleteCompetition = (competitionId: number) =>
  defHttp.post({ url: Api.DeleteCompetition, params: { competitionId } });

export const getCompetitionById = (competitionId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionById, params: { competitionId } });

// 赛事日程表api
export const getCompetitionSchedule = (params: QueryCompetitionScheduleParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionSchedule, params });

// 比赛获奖情况
// export const getAllCompetitionAwardsList = (params: BasicPageParams) =>
//   defHttp.get<CommonFetchResult>({ url: Api.AllCompetitionAwardsList, params });

export const getCompetitionAwardsList = (
  params: QueryCompetitionAwardsParams = { competitionName: '', competitionHonor: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.QueryCompetitionAwardsList, params });

export const getCompetitionAwardsById = (params: QueryCompetitionAwardsDetailParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionAwardsById, params });

// 比赛预报名
export const addCompetitionRegister = (params: AddCompetitionRegisterParams) =>
  defHttp.post({ url: Api.AddCompetitionRegister, params });

export const updateCompetitionRegister = (params: UpdateCompetitionRegisterParams) =>
  defHttp.post({ url: Api.UpdateCompetitionRegister, params });

export const getCompetitionRegisterList = (
  params: QueryCompetitionRegisterParams = {
    competitionId: -1,
    studentNumber: '',
    studentId: -1,
  },
) => defHttp.get<CommonFetchResult>({ url: Api.QueryCompetitionRegisterList, params });

export const deleteCompetitionRegister = (competitionRegisterId: number) =>
  defHttp.post({ url: Api.DeleteCompetitionRegister, params: { competitionRegisterId } });

export const getCompetitionRegisterById = (competitionRegisterId: number) =>
  defHttp.get<CommonFetchResult>({
    url: Api.CompetitionRegisterById,
    params: { competitionRegisterId },
  });
