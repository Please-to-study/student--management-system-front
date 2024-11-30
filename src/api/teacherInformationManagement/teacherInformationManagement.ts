import { defHttp } from '@/utils/http/axios';
import {
  AddTeacherInfoParams,
  QueryTeacherByNameParams,
  QueryTeacherInfoParams,
  UpdateTeacherInfoParams,
} from '@/api/teacherInformationManagement/model/basicInfo';
import {
  QueryCourseRecordParams,
  UpdateCourseRecordFeeChange,
  UpdateCourseRecordParams,
} from '@/api/teacherInformationManagement/model/courseRecord';
import { QueryTuitionFeeParams } from '@/api/teacherInformationManagement/model/tuitionFee';
import { QueryTeacherScheduleParams } from '@/api/teacherInformationManagement/model/teacherSchedule';
import { CommonFetchResult } from '@/api/model/baseModel';
import {
  QueryUncheckedRecordParams,
  UpdateRefuseRecordParams
} from "@/api/teacherInformationManagement/model/uncheckedRecord";

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
  UpdateCourseRecordFeeChange = '/courseRecord/updateCourseRecordFeeChange',
  // 未审核记录api
  UncheckedRecord = '/learningRecord/getUncheckedRecord',
  // 提交修改后的学习记录
  SubmitRefuseRecord = '/learningRecord/submitRefuseRecord',
}

// 基本信息功能模块api list
export const addTeacher = (params: AddTeacherInfoParams) =>
  defHttp.post({ url: Api.AddTeacher, params });

export const updateTeacher = (params: UpdateTeacherInfoParams) =>
  defHttp.post({ url: Api.UpdateTeacher, params });

export const deleteTeacher = (teacherId: number) =>
  defHttp.post({ url: Api.DeleteTeacher, params: { teacherId } });

export const getTeacherInfoList = (
  params: QueryTeacherInfoParams = { teacherName: '', signingStyle: '' },
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

export const getCourseRecordList = (
  params: QueryCourseRecordParams = {
    teacherName: '',
    courseCategoryId: -1,
    signingStyle: '',
  },
) => {
  if (params.courseCategoryId?.length == 0) {
    params.courseCategoryId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.CourseRecordInfoList, params });
};

export const getCourseRecordById = (courseRecordId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseRecordById, params: { courseRecordId } });

// 未审核记录api
export const getUncheckedRecordList = (params: QueryUncheckedRecordParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.UncheckedRecord, params });

export const submitRefuseRecord = (params: UpdateRefuseRecordParams) =>
  defHttp.post({ url: Api.SubmitRefuseRecord, params }, { isTransformResponse: false });

// 课时费用api
export const getTeacherTuitionFeeList = (
  params: QueryTuitionFeeParams = { teacherId: -1, teacherDate: '' },
) => {
  if (params.teacherId?.length == 0) {
    params.teacherId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.TeacherTuitionFee, params });
};

export const updateCourseRecordFeeChange = (params: UpdateCourseRecordFeeChange) =>
  defHttp.post({ url: Api.UpdateCourseRecordFeeChange, params }, { isTransformResponse: false });
