import { defHttp } from '@/utils/http/axios';
import { AddSpendingInfoParams, QuerySpendingInfoParams } from './model/spendingInfo';
import {
  AddStudentInfoParams,
  QuerySameStudentInfoParams,
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
import { BasicPageParams, CommonFetchResult } from '@/api/model/baseModel';
import { QueryCompetitionRegisterParams } from '@/api/competitionManagement/model/competitionRegister';

enum Api {
  // 基本信息
  AddStudent = '/studentInfo/addStudent',
  UpdateStudent = '/studentInfo/updateStudent',
  DeleteStudent = '/studentInfo/deleteStudent',
  AllBasicInfoList = '/studentInfo/getAllStudent',
  SpecialBasicInfoList = '/studentInfo/getSpecialStudent',
  SameStudentList = '/studentInfo/getSameStudent',
  StudentById = '/studentInfo/getStudentById',
  // 缴费信息api
  AddSpending = '/spendingInfo/addSpending',
  AllSpendingInfoList = '/spendingInfo/getAllSpendingInfo',
  SpecialSpendingInfoList = '/spendingInfo/getSpecialSpending',
  SpendingInfoById = '/spendingInfo/getSpendingById',
  // 课程结余信息api
  AllCourseBalanceList = '/studentInfo/getAllCourseBalance',
  SpecialCourseBalanceList = '/studentInfo/getSpecialCourseBalance',
  // 参赛信息api
  AddCompetitionInfo = '/competitionInfo/addCompetitionInfo',
  UpdateCompetitionInfo = '/competitionInfo/updateCompetitionInfo',
  DeleteCompetitionInfo = '/competitionInfo/deleteCompetitionInfo',
  CompetitionInfoList = '/competitionInfo/getCompetitionInfo',
  CompetitionInfoById = '/competitionInfo/getCompetitionInfoById',
  // 编程能力评级
  AddProgramRate = '/studentInfo/addProgramRate',
  UpdateProgramRate = '/studentInfo/updateProgramRate',
  DeleteProgramRate = '/studentInfo/deleteProgramRate',
  ProgramRateInfoList = '/studentInfo/getProgramRateInfo',
  ProgramRateById = '/studentInfo/getProgramRateById',
}

// 基本信息功能模块api list
export const addStudent = (params: AddStudentInfoParams) =>
  defHttp.post({ url: Api.AddStudent, params }, { successMessageMode: 'message' });

export const updateStudent = (params: UpdateStudentInfoParams) =>
  defHttp.post({ url: Api.UpdateStudent, params });

export const deleteStudent = (studentId: string) =>
  defHttp.post({ url: Api.DeleteStudent, params: { studentId } });

export const getAllStudentBasicInfoList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllBasicInfoList, params });

export const getSpecialStudentBasicInfoList = (
  params: QueryStudentInfoParams = { studentNumber: '', studentName: '', studentPhone: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialBasicInfoList, params });

export const getSameStudent = (params: QuerySameStudentInfoParams) =>
  defHttp.get({ url: Api.SameStudentList, params });

export const getStudentById = (studentId: number) =>
  defHttp.get<CommonFetchResult>({
    url: Api.StudentById,
    params: { studentId },
  });

// 缴费信息功能模块api list
export const AddSpending = (params: AddSpendingInfoParams) =>
  defHttp.post({ url: Api.AddSpending, params });

export const getAllSpendingInfoList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllSpendingInfoList, params });

export const getSpecialSpendingInfoList = (
  params: QuerySpendingInfoParams = { studentNumber: '', studentName: '', courseId: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialSpendingInfoList, params });

export const getSpendingInfoById = (payId: string) =>
  defHttp.get<CommonFetchResult>({ url: Api.SpendingInfoById, params: { payId } });

// 课程结余信息功能模块api
export const getAllCourseBalanceList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllCourseBalanceList, params });

export const getSpecialCourseBalanceList = (
  params: QueryCourseBalanceParams = { studentNumber: '', studentName: '', courseId: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialCourseBalanceList, params });

// 参赛信息功能模块api
export const addCompetitionInfo = (params: AddCompetitionInfoParams) =>
  defHttp.post({ url: Api.AddCompetitionInfo, params });

export const updateCompetitionInfo = (params: UpdateCompetitionInfoParams) =>
  defHttp.post({ url: Api.UpdateCompetitionInfo, params });

export const deleteCompetitionInfo = (competitionInfoId: number) =>
  defHttp.post({ url: Api.DeleteCompetitionInfo, params: { competitionInfoId } });

export const getCompetitionInfoList = (
  params: QueryCompetitionInfoParams = {
    competitionId: -1,
    studentNumber: '',
    studentId: -1,
  },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.CompetitionInfoList, params });
};

// export const getSpecialCompetitionInfoList = (
//   params: QueryCompetitionInfoParams = { studentNumber: '', studentName: '', competitionId: '' },
// ) => defHttp.get<CommonFetchResult>({ url: Api.SpecialCompetitionInfoList, params });

export const getCompetitionInfoById = (competitionInfoId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionInfoById, params: { competitionInfoId } });

// 编程能力评级
export const addProgramRate = (params: AddProgramRateParams) =>
  defHttp.post({ url: Api.AddProgramRate, params });

export const updateProgramRate = (params: UpdateProgramRateParams) =>
  defHttp.post({ url: Api.UpdateProgramRate, params });

export const deleteProgramRate = (programRateId: string) =>
  defHttp.post({ url: Api.DeleteProgramRate, params: { programRateId } });

export const getProgramRateInfoList = (
  params: QueryProgramRateParams = {
    studentNumber: '',
    studentId: -1,
  },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.ProgramRateInfoList, params });
};

export const getProgramRateById = (programRateId: number) =>
  defHttp.get<CommonFetchResult>({
    url: Api.ProgramRateById,
    params: { programRateId },
  });
