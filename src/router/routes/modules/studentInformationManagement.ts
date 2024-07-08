import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const studentInformationManagement: AppRouteModule = {
  path: '/studentInformationManagement',
  name: 'StudentInformationManagement',
  component: LAYOUT,
  redirect: '/studentInformationManagement/studentBasicInfo',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: t('studentInformationManagement.studentManagement'),
  },
  children: [
    {
      path: 'studentBasicInfo',
      name: 'StudentBasicInfo',
      component: () => import('@/views/studentInformationManagement/basicInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.basicInfo.basicInfo'),
      },
    },
    {
      path: 'studentInfoDetail/:id',
      name: 'StudentInfoDetail',
      component: () => import('@/views/studentInformationManagement/basicInfo/StudentDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.studentInfoDetail.studentInfoDetail'),
      },
    },
    {
      path: 'spendingInfoDetail/:id',
      name: 'SpendingInfoDetail',
      component: () => import('@/views/studentInformationManagement/spendingInfo/SpendingDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.spendingInfoDetail.spendingInfoDetail'),
      },
    },
    {
      path: 'spendingInfo',
      name: 'SpendingInfo',
      component: () => import('@/views/studentInformationManagement/spendingInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.spendingInfo.spendingInfo'),
      },
    },
    {
      path: 'courseBalance',
      name: 'CourseBalance',
      component: () => import('@/views/studentInformationManagement/courseBalance/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.courseBalance.courseBalance'),
      },
    },
    {
      path: 'competitionInformation',
      name: 'CompetitionInformation',
      component: () => import('@/views/studentInformationManagement/competitionInformation/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.competitionInformation.competitionInformation'),
      },
    },
    {
      path: 'programmingRating',
      name: 'ProgrammingRating',
      component: () => import('@/views/studentInformationManagement/programmingRating/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.programmingRating.programmingRating'),
      },
    },
  ],
};

export default studentInformationManagement;
