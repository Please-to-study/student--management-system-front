import { defHttp } from '@/utils/http/axios';
import {
  AddTeacherInfoParams,
  QueryTeacherInfoParams,
  UpdateTeacherInfoParams,
} from '@/api/teacherInformationManagement/model/basicInfo';
import {
  QueryCourseRecordParams,
  UpdateCourseRecordParams,
} from '@/api/teacherInformationManagement/model/courseRecord';
import { QueryTuitionFeeParams } from '@/api/teacherInformationManagement/model/tuitionFee';

enum Api {
  // 基本信息
  AddTeacher = '/teacherInfo/addTeacher',
  UpdateTeacher = '/teacherInfo/updateTeacher',
  DeleteTeacher = '/teacherInfo/deleteTeacher',
  AllBasicInfoList = '/teacherInfo/getAllTeacher',
  SpecialBasicInfoList = '/teacherInfo/getSpecialTeacher',
  // 教师上课记录api
  DeleteCourseRecord = '/teacherInfo/deleteCourseRecord',
  UpdateCourseRecord = '/teacherInfo/updateCourseRecord',
  AllCourseRecordList = '/teacherInfo/getAllCourseRecord',
  SpecialCourseRecordList = '/teacherInfo/getSpecialCourseRecord',
  // 课时费用api
  TeacherTuitionFee = '/teacherInfo/getTeacherTuitionFee',
}

// 基本信息功能模块api list
export const addTeacher = (params: AddTeacherInfoParams) =>
  defHttp.post({ url: Api.AddTeacher, params });

export const updateTeacher = (params: UpdateTeacherInfoParams) =>
  defHttp.post({ url: Api.UpdateTeacher, params });

export const deleteTeacher = (id: string) =>
  defHttp.post({ url: Api.DeleteTeacher, params: { id } });

export const getAllTeacherBasicInfoList = () => defHttp.get<>({ url: Api.AllBasicInfoList });

export const getSpecialTeacherBasicInfoList = (params: QueryTeacherInfoParams) =>
  defHttp.get<>({ url: Api.SpecialBasicInfoList, params });

// 教师上课记录api list
export const updateCourseRecord = (params: UpdateCourseRecordParams) =>
  defHttp.post({ url: Api.UpdateCourseRecord, params });

export const deleteCourseRecord = (id: string) =>
  defHttp.post({ url: Api.DeleteCourseRecord, params: { id } });

export const getAllCourseRecordList = () => defHttp.get<>({ url: Api.AllCourseRecordList });

export const getSpecialCourseRecordList = (params: QueryCourseRecordParams) =>
  defHttp.get<>({ url: Api.SpecialCourseRecordList, params });

// 课时费用api
export const getTeacherTuitionFeeList = (params: QueryTuitionFeeParams) =>
  defHttp.get<>({ url: Api.TeacherTuitionFee, params });
