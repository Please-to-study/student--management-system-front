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
import { CommonFetchResult } from '@/api/model/baseModel';

enum Api {
  // 基本信息
  AddCourse = '/courseInfo/addCourse',
  UpdateCourse = '/courseInfo/updateCourse',
  DeleteCourse = '/courseInfo/deleteCourse',
  AllCourseInfoList = '/courseInfo/getAllCourse',
  SpecialCourseInfoList = '/courseInfo/getSpecialCourse',
  CourseInfoById = '/courseInfo/getCourseById',

  // 课表信息api

  // 学生学习记录api

  // 课程作业信息
  SpecialCourseworkInfoList = '/courseInfo/getSpecialCourseworkInfo',
}

// 课程信息功能模块api list
export const addCourse = (params: AddCourseInfoParams) =>
  defHttp.post({ url: Api.AddCourse, params });

export const updateCourse = (params: UpdateCourseInfoParams) =>
  defHttp.post({ url: Api.UpdateCourse, params });

export const deleteCourse = (courseId: string) =>
  defHttp.post({ url: Api.DeleteCourse, params: { courseId } });

export const getAllCourseInfoList = () =>
  defHttp.get<CommonFetchResult>({ url: Api.AllCourseInfoList });

export const getSpecialCourseInfoList = (
  params: QueryCourseInfoParams = { courseId: '', courseAddressId: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialCourseInfoList, params });

export const getCourseInfoById = (courseId: string) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseInfoById, params: { courseId } });
