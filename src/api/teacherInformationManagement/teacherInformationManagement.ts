import { defHttp } from '@/utils/http/axios';
import {
  AddTeacherInfoParams,
  QueryTeacherByNameParams,
  QueryTeacherInfoParams,
  UpdateTeacherInfoParams,
} from '@/api/teacherInformationManagement/model/basicInfo';
import {
  QueryCourseRecordParams,
  UpdateCourseRecordParams,
} from '@/api/teacherInformationManagement/model/courseRecord';
import { QueryTuitionFeeParams } from '@/api/teacherInformationManagement/model/tuitionFee';
import { QueryTeacherScheduleParams } from '@/api/teacherInformationManagement/model/teacherSchedule';
import { CommonFetchResult } from '@/api/model/baseModel';

enum Api {
  // 基本信息
  AddTeacher = '/teacherInfo/addTeacher',
  UpdateTeacher = '/teacherInfo/updateTeacher',
  DeleteTeacher = '/teacherInfo/deleteTeacher',
  TeacherInfoList = '/teacherInfo/getTeacher',
  TeacherInfoById = '/teacherInfo/getTeacherById',
  TeacherInfoByName = '/teacherInfo/getTeacherByName',
  // 教室课表api
  TeacherSchedule = '/teacherInfo/getTeacherSchedule',
  // 教师上课记录api
  UpdateCourseRecord = '/courseRecord/updateCourseRecord',
  DeleteCourseRecord = '/courseRecord/deleteCourseRecord',
  CourseRecordInfoList = '/courseRecord/getCourseRecord',
  CourseRecordById = '/courseRecord/getCourseRecordById',
  // 课时费用api
  TeacherTuitionFee = '/teacherInfo/getTeacherCourseFee',
}

// 基本信息功能模块api list
export const addTeacher = (params: AddTeacherInfoParams) =>
  defHttp.post({ url: Api.AddTeacher, params });

export const updateTeacher = (params: UpdateTeacherInfoParams) =>
  defHttp.post({ url: Api.UpdateTeacher, params });

export const deleteTeacher = (teacherId: number) =>
  defHttp.post({ url: Api.DeleteTeacher, params: { teacherId } });

export const getTeacherInfoList = (
  params: QueryTeacherInfoParams = { teacherName: '', teacherPhone: '' },
) => defHttp.get<CommonFetchResult>({ url: Api.TeacherInfoList, params });

export const getTeacherInfoById = (teacherId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherInfoById, params: { teacherId } });

export const getTeacherInfoByName = (params: QueryTeacherByNameParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherInfoByName, params });

// 教师课表api
export const getTeacherSchedule = (params: QueryTeacherScheduleParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherSchedule, params });

// 教师上课记录api
export const updateCourseRecord = (params: UpdateCourseRecordParams) =>
  defHttp.post({ url: Api.UpdateCourseRecord, params });

export const deleteCourseRecord = (courseRecordId: number) =>
  defHttp.post({ url: Api.DeleteCourseRecord, params: { courseRecordId } });

export const getCourseRecordList = (params: QueryCourseRecordParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseRecordInfoList, params });

export const getCourseRecordById = (courseRecordId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseRecordById, params: { courseRecordId } });

// 课时费用api
export const getTeacherTuitionFeeList = (params: QueryTuitionFeeParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.TeacherTuitionFee, params });
