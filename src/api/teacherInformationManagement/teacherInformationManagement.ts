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
import { QueryTeacherScheduleParams } from '@/api/teacherInformationManagement/model/teacherSchedule';
import { BasicPageParams, CommonFetchResult } from '@/api/model/baseModel';

enum Api {
  // 基本信息
  AddTeacher = '/teacherInfo/addTeacher',
  UpdateTeacher = '/teacherInfo/updateTeacher',
  DeleteTeacher = '/teacherInfo/deleteTeacher',
  AllBasicInfoList = '/teacherInfo/getAllTeacher',
  SpecialBasicInfoList = '/teacherInfo/getSpecialTeacher',
  TeacherInfoById = '/teacherInfo/getTeacherById',
  // 教室课表api
  TeacherSchedule = '/teacherInfo/getTeacherSchedule',
  // 教师上课记录api
  DeleteCourseRecord = '/teacherInfo/deleteCourseRecord',
  UpdateCourseRecord = '/teacherInfo/updateCourseRecord',
  AllCourseRecordList = '/teacherInfo/getAllCourseRecord',
  SpecialCourseRecordList = '/teacherInfo/getSpecialCourseRecord',
  CourseRecordById = '/teacherInfo/getCourseRecordById',
  // 课时费用api
  TeacherTuitionFee = '/teacherInfo/getTeacherTuitionFee',
}

// 基本信息功能模块api list
export const addTeacher = (params: AddTeacherInfoParams) =>
  defHttp.post({ url: Api.AddTeacher, params });

export const updateTeacher = (params: UpdateTeacherInfoParams) =>
  defHttp.post({ url: Api.UpdateTeacher, params });

export const deleteTeacher = (teacherId: string) =>
  defHttp.post({ url: Api.DeleteTeacher, params: { teacherId } });

export const getAllTeacherBasicInfoList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllBasicInfoList, params });

export const getSpecialTeacherBasicInfoList = (
  params: QueryTeacherInfoParams = { teacherName: '', teacherPhone: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.SpecialBasicInfoList, params });

export const getTeacherInfoById = (teacherId: string) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherInfoById, params: { teacherId } });

// 教师课表api
export const getTeacherSchedule = (params: QueryTeacherScheduleParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherSchedule, params });

// 教师上课记录api list
export const updateCourseRecord = (params: UpdateCourseRecordParams) =>
  defHttp.post({ url: Api.UpdateCourseRecord, params });

export const deleteCourseRecord = (courseRecordId: string) =>
  defHttp.post({ url: Api.DeleteCourseRecord, params: { courseRecordId } });

export const getAllCourseRecordList = (params: BasicPageParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.AllCourseRecordList, params });

export const getSpecialCourseRecordList = (params: QueryCourseRecordParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.SpecialCourseRecordList, params });

export const getCourseRecordById = (courseRecordId: string) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseRecordById, params: { courseRecordId } });

// 课时费用api
export const getTeacherTuitionFeeList = (params: QueryTuitionFeeParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherTuitionFee, params });
