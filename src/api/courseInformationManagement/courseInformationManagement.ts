import { defHttp } from '@/utils/http/axios';
import {
  AddCourseInfoParams,
  QueryCourseInfoParams,
  UpdateCourseInfoParams,
} from '@/api/courseInformationManagement/model/basicInfo';
import { CommonFetchResult } from '@/api/model/baseModel';
import {
  AddMaterialsInfoParams,
  QueryMaterialsInfoParams,
  UpdateMaterialsInfoParams,
} from '@/api/courseInformationManagement/model/courseworkInformation';
import {
  AddLearningRecordParams,
  QueryLearningRecordParams,
  UpdateLearningRecordParams,
} from '@/api/courseInformationManagement/model/learningRecord';
import { QueryCourseScheduleParams } from '@/api/courseInformationManagement/model/courseSchedule';

enum Api {
  // 基本信息
  AddCourse = '/courseInfo/addCourse',
  UpdateCourse = '/courseInfo/updateCourse',
  DeleteCourse = '/courseInfo/deleteCourse',
  CourseInfoList = '/courseInfo/getCourse',
  CourseInfoById = '/courseInfo/getCourseById',

  // 课表信息api
  CourseSchedule = '/courseInfo/getCourseSchedule',

  // 学生学习记录api
  AddLearningRecord = '/learningRecord/addLearningRecord',
  UpdateLearningRecord = '/learningRecord/updateLearningRecord',
  DeleteLearningRecord = '/learningRecord/deleteLearningRecord',
  LearningRecordList = '/learningRecord/getLearningRecord',
  LearningRecordById = '/learningRecord/getLearningRecordById',

  // 待审核记录api
  ReviewRecordList = '/learningRecord/getReviewRecord',
  IdentityReviewRecord = '/learningRecord/identityReviewRecord',

  // 课程作业信息
  AddMaterials = '/materialsInfo/addMaterialsInfo',
  UpdateMaterials = '/materialsInfo/updateMaterialsInfo',
  DeleteMaterials = '/materialsInfo/deleteMaterialsInfo',
  MaterialsInfoList = '/materialsInfo/getMaterialsInfo',
  MaterialsInfoById = '/materialsInfo/getMaterialsInfoById',
}

// 课程信息功能模块api list
export const addCourse = (params: AddCourseInfoParams) =>
  defHttp.post({ url: Api.AddCourse, params });

export const updateCourse = (params: UpdateCourseInfoParams) =>
  defHttp.post({ url: Api.UpdateCourse, params });

export const deleteCourse = (courseId: string) =>
  defHttp.post({ url: Api.DeleteCourse, params: { courseId } });

export const getCourseList = (
  params: QueryCourseInfoParams = { courseName: '', courseCategoryId: -1, courseAddress: '' },
) => {
  if (params.courseCategoryId?.length == 0) {
    params.courseCategoryId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.CourseInfoList, params });
};

export const getCourseInfoById = (courseId: string) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseInfoById, params: { courseId } });

// 课表信息api
export const getCourseSchedule = (params: QueryCourseScheduleParams) =>
  defHttp.get<CommonFetchResult>({ url: Api.CourseSchedule, params });

// 学生学习记录api
export const addLearningRecord = (params: AddLearningRecordParams) =>
  defHttp.post({ url: Api.AddLearningRecord, params }, { isTransformResponse: false });

export const updateLearningRecord = (params: UpdateLearningRecordParams) =>
  defHttp.post({ url: Api.UpdateLearningRecord, params });

export const deleteLearningRecord = (learningRecordId: number) =>
  defHttp.post({ url: Api.DeleteLearningRecord, params: { learningRecordId } });

export const getLearningRecordList = (
  params: QueryLearningRecordParams = { studentId: -1, learningRecordDate: '' },
) => {
  if (params.studentId?.length == 0) {
    params.studentId = -1;
  }
  return defHttp.get<CommonFetchResult>({ url: Api.LearningRecordList, params });
};

export const getLearningRecordById = (learningRecordId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.LearningRecordById, params: { learningRecordId } });

// 课程作业信息功能模块api
export const addMaterials = (params: AddMaterialsInfoParams) =>
  defHttp.post({ url: Api.AddMaterials, params });

export const updateMaterials = (params: UpdateMaterialsInfoParams) =>
  defHttp.post({ url: Api.UpdateMaterials, params });

export const deleteMaterials = (materialsId: number) =>
  defHttp.post({ url: Api.DeleteMaterials, params: { materialsId } });

export const getMaterialsInfoList = (
  params: QueryMaterialsInfoParams = { courseName: '', materialsTitle: '' },
) => {
  return defHttp.get<CommonFetchResult>({ url: Api.MaterialsInfoList, params });
};

export const getMaterialsInfoById = (materialsId: number) =>
  defHttp.get<CommonFetchResult>({ url: Api.MaterialsInfoById, params: { materialsId } });
