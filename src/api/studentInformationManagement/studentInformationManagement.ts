import { defHttp } from '@/utils/http/axios';
import { AddSpendingInfoParams, QuerySpendingInfoParams } from './model/spendingInfo';
import {
  AddStudentInfoParams,
  QueryStudentInfoParams,
  UpdateStudentInfoParams,
} from '@/api/studentInformationManagement/model/basicInfo';
import { QueryCourseBalanceParams } from '@/api/studentInformationManagement/model/courseBalance';

enum Api {
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
  CourseList = '/system/getCourseList',
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
