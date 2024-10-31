import { defHttp } from '@/utils/http/axios';

import { CommonFetchResult } from '@/api/model/baseModel';
import {
  AddAdministratorParams,
  AddCompetitionStyleParams,
  AddCourseCategoryParams,
  AddSigningStyleParams,
  AddTeacherPayStyleParams,
  QueryAdministratorParams,
  SetAdministratorStatusParams,
  UpdateAdministratorParams,
  UpdateCompetitionStyleParams,
  UpdateCourseCategoryParams,
  UpdateSigningStyleParams,
  UpdateTeacherPayStyleParams,
} from '@/api/configParams';
import { QueryCourseRecordParams } from '@/api/teacherInformationManagement/model/courseRecord';

enum Api {
  // 教师签约形式表
  AddSigningStyle = '/signingInfo/addSigningStyle',
  UpdateSigningStyle = '/signingInfo/updateSigningStyle',
  DeleteSigningStyle = '/signingInfo/deleteSigningStyle',
  SigningStyleInfoList = '/signingInfo/getSigningStyle',

  // 课时费计算方式表
  AddTeacherPayStyle = '/teacherPayStyleInfo/addTeacherPayStyle',
  UpdateTeacherPayStyle = '/teacherPayStyleInfo/updateTeacherPayStyle',
  DeleteTeacherPayStyle = '/teacherPayStyleInfo/deleteTeacherPayStyle',
  TeacherPayStyleInfoList = '/teacherPayStyleInfo/getTeacherPayStyle',

  // 课程类别表
  AddCourseCategory = '/courseInfo/addCourseCategory',
  UpdateCourseCategory = '/courseInfo/updateCourseCategory',
  DeleteCourseCategory = '/courseInfo/deleteCourseCategory',
  CourseCategoryInfoList = '/courseInfo/getCourseCategory',

  // 比赛类型表
  AddCompetitionStyle = '/competitionStyle/addCompetitionStyle',
  UpdateCompetitionStyle = '/competitionStyle/updateCompetitionStyle',
  DeleteCompetitionStyle = '/competitionStyle/deleteCompetitionStyle',
  CompetitionStyleInfoList = '/competitionStyle/getCompetitionStyle',

  // 权限设置表
  AddAdministrator = '/administrator/addAdministrator',
  UpdateAdministrator = '/administrator/updateAdministrator',
  DeleteAdministrator = '/administrator/deleteAdministrator',
  AdministratorInfoList = '/administrator/getAdministrator',
  SetAdministratorStatus = '/administrator/setAdministratorStatus',
}

// 教师签约形式api
export const addSigningStyle = (params: AddSigningStyleParams) =>
  defHttp.post({ url: Api.AddSigningStyle, params });

export const updateSigningStyle = (params: UpdateSigningStyleParams) =>
  defHttp.post({ url: Api.UpdateSigningStyle, params });

export const deleteSigningStyle = (signingId: number) =>
  defHttp.post({ url: Api.DeleteSigningStyle, params: { signingId } });

export const getSigningStyleInfoList = () =>
  defHttp.get<CommonFetchResult>({ url: Api.SigningStyleInfoList });

// 课时费计算方式表 api
export const addTeacherPayStyle = (params: AddTeacherPayStyleParams) =>
  defHttp.post({ url: Api.AddTeacherPayStyle, params });

export const updateTeacherPayStyle = (params: UpdateTeacherPayStyleParams) =>
  defHttp.post({ url: Api.UpdateTeacherPayStyle, params });

export const deleteTeacherPayStyle = (teacherPayStyleId: number) =>
  defHttp.post({ url: Api.DeleteTeacherPayStyle, params: { teacherPayStyleId } });

export const getTeacherPayStyleInfoList = () =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherPayStyleInfoList });

// 课程类别表api
export const addCourseCategory = (params: AddCourseCategoryParams) =>
  defHttp.post({ url: Api.AddCourseCategory, params });

export const updateCourseCategory = (params: UpdateCourseCategoryParams) =>
  defHttp.post({ url: Api.UpdateCourseCategory, params });

export const deleteCourseCategory = (courseCategoryId: number) =>
  defHttp.post({ url: Api.DeleteCourseCategory, params: { courseCategoryId } });

export const getCourseCategoryInfoList = () =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseCategoryInfoList });

// 比赛类型表api
export const addCompetitionStyle = (params: AddCompetitionStyleParams) =>
  defHttp.post({ url: Api.AddCompetitionStyle, params });

export const updateCompetitionStyle = (params: UpdateCompetitionStyleParams) =>
  defHttp.post({ url: Api.UpdateCompetitionStyle, params });

export const deleteCompetitionStyle = (competitionStyleId: number) =>
  defHttp.post({ url: Api.DeleteCompetitionStyle, params: { competitionStyleId } });

export const getCompetitionStyleInfoList = () =>
  defHttp.get<CommonFetchResult>({ url: Api.CompetitionStyleInfoList });

// 权限设置表api
export const addAdministrator = (params: AddAdministratorParams) =>
  defHttp.post({ url: Api.AddAdministrator, params });

export const updateAdministrator = (params: UpdateAdministratorParams) =>
  defHttp.post({ url: Api.UpdateAdministrator, params });

export const deleteAdministrator = (administratorId: number) =>
  defHttp.post({ url: Api.DeleteAdministrator, params: { administratorId } });

export const getAdministratorInfoList = (
  params: QueryAdministratorParams = {
    administratorName: '',
    status: -1,
  },
) => {
  if (params.status?.length == 0) {
    params.status = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.AdministratorInfoList, params });
};

export const setAdministratorStatus = (
  params: SetAdministratorStatusParams = {
    administratorId: -1,
    status: -1,
  },
) => {
  if (params.status?.length == 0) {
    params.status = -1;
  }
  if (params.administratorId?.length == 0) {
    params.administratorId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.SetAdministratorStatus, params });
};
