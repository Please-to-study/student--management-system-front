import { defHttp } from '@/utils/http/axios';
import {AddPayInfoParams, QueryPayInfoParams, UpdatePayInfoParams} from './model/spendingInfo';
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
  AddPayInfo = '/payInfo/addPayInfo',
  UpdatePayInfo = '/payInfo/updatePayInfo',
  DeletePayInfo = '/payInfo/deletePayInfo',
  PayInfoList = '/payInfo/getPayInfo',
  PayInfoById = '/payInfo/getPayInfoById',
  // 课程结余信息api
  CourseBalanceList = '/studentInfo/getCourseBalance',
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
  ProgramRateInfoList = '/studentInfo/getProgramRate',
  ProgramRateById = '/studentInfo/getProgramRateById',
}

// 基本信息功能模块api list
export const addStudent = (params: AddStudentInfoParams) =>
  defHttp.post({ url: Api.AddStudent, params }, { successMessageMode: 'message' });

export const updateStudent = (params: UpdateStudentInfoParams) =>
  defHttp.post({ url: Api.UpdateStudent, params });

export const deleteStudent = (studentId: number) =>
  defHttp.post({ url: Api.DeleteStudent, params: { studentId } });

export const getAllStudentBasicInfoList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllBasicInfoList, params });

export const getSpecialStudentBasicInfoList = (
  params: QueryStudentInfoParams = { studentNumber: '', studentName: '', studentSchool: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialBasicInfoList, params });

export const getSameStudent = (params: QuerySameStudentInfoParams) =>
  defHttp.get({ url: Api.SameStudentList, params });

export const getStudentById = (studentId: number) =>
  defHttp.get<CommonFetchResult>({
    url: Api.StudentById,
    params: { studentId },
  });

// 缴费信息功能模块api list
export const AddPayInfo = (params: AddPayInfoParams) =>
  defHttp.post({ url: Api.AddPayInfo, params });

export const updatePayInfo = (params: UpdatePayInfoParams) =>
  defHttp.post({ url: Api.UpdatePayInfo, params });

export const deletePayInfo = (payId: number) =>
  defHttp.post({ url: Api.DeletePayInfo, params: { payId } });

export const getPayInfoList = (
  params: QueryPayInfoParams = { studentNumber: '', studentId: -1, courseCategoryId: -1 },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  if (params.courseCategoryId?.length == 0) {
    params.courseCategoryId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.PayInfoList, params });
};

export const getPayInfoById = (payInfoId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.PayInfoById, params: { payInfoId } });

export const getCourseBalanceList = (
  params: QueryCourseBalanceParams = { studentNumber: '', studentId: -1, courseId: -1 },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  if (params.courseId?.length == 0) {
    params.courseId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.CourseBalanceList, params });
};

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
    competitionGroup: '',
    competitionYear: '',
  },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  if (params.competitionId?.length == 0) {
    params.competitionId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.CompetitionInfoList, params });
};

export const getCompetitionInfoById = (competitionInfoId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionInfoById, params: { competitionInfoId } });

// 编程能力评级
export const addProgramRate = (params: AddProgramRateParams) =>
  defHttp.post({ url: Api.AddProgramRate, params });

export const updateProgramRate = (params: UpdateProgramRateParams) =>
  defHttp.post({ url: Api.UpdateProgramRate, params });

export const deleteProgramRate = (programRateId: number) =>
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
