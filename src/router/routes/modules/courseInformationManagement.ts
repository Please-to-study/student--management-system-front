import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const courseInformationManagement: AppRouteModule = {
  path: '/courseInformationManagement',
  name: 'courseInformationManagement',
  component: LAYOUT,
  redirect: '/courseInformationManagement/basicInfo',
  meta: {
    orderNo: 3,
    icon: 'ion:grid-outline',
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
      },
    },
    {
      path: 'scheduleInfo',
      name: 'scheduleInfo',
      component: () => import('@/views/courseInformationManagement/scheduleInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.scheduleInfo.scheduleInfo'),
      },
    },
    {
      path: 'learningRecord',
      name: 'learningRecord',
      component: () => import('@/views/courseInformationManagement/learningRecord/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.learningRecord.learningRecord'),
      },
    },
    {
      path: 'courseworkInformation',
      name: 'courseworkInformation',
      component: () => import('@/views/courseInformationManagement/courseworkInformation/index.vue'),
      meta: {
        // affix: true,
        title: t('courseInformationManagement.courseworkInformation.courseworkInformation'),
      },
    },
  ],
};

export default courseInformationManagement;
