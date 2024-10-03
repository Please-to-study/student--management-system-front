import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

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
      },
    },
    {
      path: 'courseRecord',
      name: 'courseRecord',
      component: () => import('@/views/teacherInformationManagement/courseRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('teacherInformationManagement.courseRecord.courseRecord'),
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
      },
    },
  ],
};

export default teacherInformationManagement;
