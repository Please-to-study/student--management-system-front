import { defHttp } from '@/utils/http/axios';
import { AddSpendingInfoParams, QuerySpendingInfoParams } from './model/spendingInfo';
import { QueryCourseBalanceParams } from '@/api/studentInformationManagement/model/courseBalance';
import {
  AddCompetitionInfoParams,
  QueryCompetitionInfoParams,
  UpdateCompetitionInfoParams,
} from '@/api/studentInformationManagement/model/competitionInfo';
import {
  AddProgramRateParams,
  QueryProgramRateParams,
  UpdateProgramRateParams,
} from '@/api/studentInformationManagement/model/programmingRating';
import {
  AddCourseInfoParams,
  QueryCourseInfoParams,
  UpdateCourseInfoParams,
} from '@/api/courseInformationManagement/model/basicInfo';

enum Api {
  // 基本信息
  AddCourse = '/courseInfo/addCourse',
  UpdateCourse = '/courseInfo/updateCourse',
  DeleteCourse = '/courseInfo/deleteCourse',
  AllCourseInfoList = '/courseInfo/getAllCourse',
  SpecialCourseInfoList = '/courseInfo/getSpecialCourse',

  // 课表信息api
  AddSpending = '/spendingInfo/addSpending',
  AllSpendingInfoList = '/spendingInfo/getAllSpendingInfo',
  SpecialSpendingInfoList = '/spendingInfo/getSpecialSpending',
  // 课程结余信息api
  AllCourseBalanceList = '/studentInfo/getAllCourseBalance',
  SpecialCourseBalanceList = '/studentInfo/getSpecialCourseBalance',
  // 参赛信息
  AddCompetitionInfo = '/studentInfo/addCompetitionInfo',
  UpdateCompetitionInfo = '/studentInfo/updateCompetitionInfo',
  DeleteCompetitionInfo = '/studentInfo/deleteCompetitionInfo',
  AllCompetitionInfoList = '/studentInfo/getAllCompetitionInfo',
  SpecialCompetitionInfoList = '/studentInfo/getSpecialCompetitionInfo',
  // 编程能力评级
  AddProgramRateInfo = '/studentInfo/addProgramRateInfo',
  UpdateProgramRateInfo = '/studentInfo/updateProgramRateInfo',
  DeleteProgramRateInfo = '/studentInfo/deleteProgramRateInfo',
  AllProgramRateInfoList = '/studentInfo/getAllProgramRateInfo',
  SpecialProgramRateInfoList = '/studentInfo/getSpecialProgramRateInfo',
}

// 课程信息功能模块api list
export const addCourse = (params: AddCourseInfoParams) =>
  defHttp.post({ url: Api.AddCourse, params });

export const updateCourse = (params: UpdateCourseInfoParams) =>
  defHttp.post({ url: Api.UpdateCourse, params });

export const deleteCourse = (id: string) => defHttp.post({ url: Api.DeleteCourse, params: { id } });

export const getAllCourseInfoList = () => defHttp.get({ url: Api.AllCourseInfoList });

export const getSpecialCourseInfoList = (params: QueryCourseInfoParams) =>
  defHttp.get<>({ url: Api.SpecialCourseInfoList, params });

// 缴费信息功能模块api list
export const AddSpending = (params: AddSpendingInfoParams) =>
  defHttp.post({ url: Api.AddSpending, params });

export const getAllSpendingInfoList = () => defHttp.get<>({ url: Api.AllSpendingInfoList });

export const getSpecialSpendingInfoList = (params: QuerySpendingInfoParams) =>
  defHttp.get<>({ url: Api.SpecialSpendingInfoList, params });

// 课程结余信息功能模块api
export const getAllCourseBalanceList = () => defHttp.get<>({ url: Api.AllCourseBalanceList });

export const getSpecialCourseBalanceList = (params: QueryCourseBalanceParams) =>
  defHttp.get<>({ url: Api.SpecialCourseBalanceList, params });

// 参赛信息功能模块api
export const addCompetitionInfo = (params: AddCompetitionInfoParams) =>
  defHttp.post({ url: Api.AddCompetitionInfo, params });

export const updateCompetitionInfo = (params: UpdateCompetitionInfoParams) =>
  defHttp.post({ url: Api.UpdateCompetitionInfo, params });

export const deleteCompetitionInfo = (id: string) =>
  defHttp.post({ url: Api.DeleteCompetitionInfo, params: { id } });

export const getAllCompetitionInfoList = () => defHttp.get<>({ url: Api.AllCompetitionInfoList });

export const getSpecialCompetitionInfoList = (params: QueryCompetitionInfoParams) =>
  defHttp.get<>({ url: Api.SpecialCompetitionInfoList, params });

// 编程能力评级
export const addProgramRateInfo = (params: AddProgramRateParams) =>
  defHttp.post({ url: Api.AddProgramRateInfo, params });

export const updateProgramRateInfo = (params: UpdateProgramRateParams) =>
  defHttp.post({ url: Api.UpdateProgramRateInfo, params });

export const deleteProgramRateInfo = (id: string) =>
  defHttp.post({ url: Api.DeleteProgramRateInfo, params: { id } });

export const getAllProgramRateInfoList = () => defHttp.get<>({ url: Api.AllProgramRateInfoList });

export const getSpecialProgramRateInfoList = (params: QueryProgramRateParams) =>
  defHttp.get<>({ url: Api.SpecialProgramRateInfoList, params });
