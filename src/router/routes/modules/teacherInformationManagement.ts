import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const teacherInformationManagement: AppRouteModule = {
  path: '/teacherInformationManagement',
  name: 'teacherInformationManagement',
  component: LAYOUT,
  redirect: '/teacherInformationManagement/basicInfo',
  meta: {
    orderNo: 2,
    icon: 'ion:layers-outline',
    title: t('teacherInformationManagement.teacherManagement'),
  },
  children: [
    {
      path: 'basicInfo',
      name: 'basicInfo',
      component: () => import('@/views/teacherInformationManagement/basicInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.basicInfo.basicInfo'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'teacherInfoDetail/:id',
      name: 'TeacherInfoDetail',
      component: () =>
        import('@/views/teacherInformationManagement/basicInfo/TeacherDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('teacherInformationManagement.teacherInfoDetail.teacherInfoDetail'),
      },
    },
    {
      path: 'teacherSchedule',
      name: 'teacherSchedule',
      component: () => import('@/views/teacherInformationManagement/teacherSchedule/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.teacherSchedule.teacherSchedule'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'courseRecord',
      name: 'courseRecord',
      component: () => import('@/views/teacherInformationManagement/courseRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.courseRecord.courseRecord'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'courseRecordDetail/:id',
      name: 'CourseRecordDetail',
      component: () =>
        import('@/views/teacherInformationManagement/courseRecord/CourseRecordDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('teacherInformationManagement.courseRecordDetail.courseRecordDetail'),
      },
    },
    {
      path: 'tuitionFee',
      name: 'tuitionFee',
      component: () => import('@/views/teacherInformationManagement/tuitionFee/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.tuitionFee.tuitionFee'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'importRecord',
      name: 'ImportRecord',
      component: () => import('@/views/teacherInformationManagement/importRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.importRecord.importRecord'),
        roles: [RoleEnum.TEACHER],
      },
    },
    {
      path: 'uncheckedRecord',
      name: 'UncheckedRecord',
      component: () => import('@/views/teacherInformationManagement/uncheckedRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.uncheckedRecord.uncheckedRecord'),
        roles: [RoleEnum.TEACHER],
      },
    },
    {
      path: 'studyRecord',
      name: 'StudyRecord',
      component: () => import('@/views/teacherInformationManagement/studyRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.studyRecord.studyRecord'),
        roles: [RoleEnum.TEACHER],
      },
    },
  ],
};

export default teacherInformationManagement;
