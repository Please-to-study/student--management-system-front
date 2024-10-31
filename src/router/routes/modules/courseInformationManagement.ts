import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from "@/enums/roleEnum";

const courseInformationManagement: AppRouteModule = {
  path: '/courseInformationManagement',
  name: 'courseInformationManagement',
  component: LAYOUT,
  redirect: '/courseInformationManagement/basicInfo',
  meta: {
    orderNo: 3,
    icon: 'ion:tv-outline',
    title: t('courseInformationManagement.courseManagement'),
  },
  children: [
    {
      path: 'courseInfo',
      name: 'courseInfo',
      component: () => import('@/views/courseInformationManagement/courseInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.courseInfo.courseInfo'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'courseDetailInfo/:id',
      name: 'CourseDetailInfo',
      component: () => import('@/views/courseInformationManagement/courseInfo/CourseDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('courseInformationManagement.courseDetailInfo.courseDetailInfo'),
      },
    },
    {
      path: 'scheduleInfo',
      name: 'scheduleInfo',
      component: () => import('@/views/courseInformationManagement/scheduleInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.scheduleInfo.scheduleInfo'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'learningRecord',
      name: 'learningRecord',
      component: () => import('@/views/courseInformationManagement/learningRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.learningRecord.learningRecord'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'learningRecordDetail/:id',
      name: 'LearningRecordDetail',
      component: () => import('@/views/courseInformationManagement/learningRecord/LearningRecordDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('courseInformationManagement.learningRecordDetail.learningRecordDetail'),
      },
    },
    {
      path: 'reviewRecord',
      name: 'ReviewRecord',
      component: () => import('@/views/courseInformationManagement/reviewRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.reviewRecord.reviewRecord'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'reviewRecordDetail/:id',
      name: 'ReviewRecordDetail',
      component: () => import('@/views/courseInformationManagement/reviewRecord/ReviewRecordDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('courseInformationManagement.reviewRecordDetail.reviewRecordDetail'),
      },
    },
    {
      path: 'courseworkInformation',
      name: 'courseworkInformation',
      component: () => import('@/views/courseInformationManagement/courseworkInformation/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.courseworkInformation.courseworkInformation'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'courseworkInfoDetail/:id',
      name: 'CourseworkInfoDetail',
      component: () => import('@/views/courseInformationManagement/courseworkInformation/CourseworkInfoDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('courseInformationManagement.courseworkInfoDetail.courseworkInfoDetail'),
      },
    },
  ],
};

export default courseInformationManagement;
