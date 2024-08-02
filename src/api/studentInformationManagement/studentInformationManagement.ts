import { defHttp } from '@/utils/http/axios';
import { AddSpendingInfoParams, QuerySpendingInfoParams } from './model/spendingInfo';
import {
  AddStudentInfoParams,
  QueryStudentInfoParams,
  UpdateStudentInfoParams,
} from '@/api/studentInformationManagement/model/basicInfo';
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

enum Api {
  // 基本信息
  AddStudent = '/studentInfo/addStudent',
  UpdateStudent = '/studentInfo/updateStudent',
  DeleteStudent = '/studentInfo/deleteStudent',
  AllBasicInfoList = '/studentInfo/getAllStudent',
  SpecialBasicInfoList = '/studentInfo/getSpecialStudent',
  SameStudentList = '/studentInfo/getSameStudent',
  // 缴费信息api
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

// 基本信息功能模块api list
export const addStudent = (params: AddStudentInfoParams) =>
  defHttp.post({ url: Api.AddStudent, params });

export const updateStudent = (params: UpdateStudentInfoParams) =>
  defHttp.post({ url: Api.UpdateStudent, params });

export const deleteStudent = (id: string) =>
  defHttp.post({ url: Api.DeleteStudent, params: { id } });

export const getAllStudentBasicInfoList = () => defHttp.get<>({ url: Api.AllBasicInfoList });

export const getSpecialStudentBasicInfoList = (params: QueryStudentInfoParams) =>
  defHttp.get<>({ url: Api.SpecialBasicInfoList, params });

export const getSameStudent = (name: string) =>
  defHttp.get<>({ url: Api.SameStudentList, params: { name } });

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
