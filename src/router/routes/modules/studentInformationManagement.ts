import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const studentInformationManagement: AppRouteModule = {
  path: '/studentInformationManagement',
  name: 'StudentInformationManagement',
  component: LAYOUT,
  redirect: '/studentInformationManagement/studentBasicInfo',
  meta: {
    orderNo: 1,
    // icon: 'ph:student',
    icon: 'teenyicons:id-outline',
    title: t('studentInformationManagement.studentManagement'),
    roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
  },
  children: [
    {
      path: 'studentBasicInfo',
      name: 'StudentBasicInfo',
      component: () => import('@/views/studentInformationManagement/basicInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.basicInfo.basicInfo'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'studentInfoDetail/:studentId',
      name: 'StudentInfoDetail',
      component: () =>
        import('@/views/studentInformationManagement/basicInfo/StudentDetailInfo.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.studentInfoDetail.studentInfoDetail'),
      },
    },
    {
      path: 'payInfoDetail/:id',
      name: 'PayInfoDetail',
      component: () => import('@/views/studentInformationManagement/payInfo/PayInfoDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.spendingInfoDetail.spendingInfoDetail'),
      },
    },
    {
      path: 'payInfo',
      name: 'PayInfo',
      component: () => import('@/views/studentInformationManagement/payInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.spendingInfo.spendingInfo'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'courseBalance',
      name: 'CourseBalance',
      component: () => import('@/views/studentInformationManagement/courseBalance/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.courseBalance.courseBalance'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'competitionInformation',
      name: 'CompetitionInformation',
      component: () =>
        import('@/views/studentInformationManagement/competitionInformation/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.competitionInformation.competitionInformation'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'competitionInfoDetail/:id',
      name: 'CompetitionInfoDetail',
      component: () =>
        import(
          '@/views/studentInformationManagement/competitionInformation/CompetitionInfoDetail.vue'
        ),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.competitionInfoDetail.competitionInfoDetail'),
      },
    },
    {
      path: 'programmingRating',
      name: 'ProgrammingRating',
      component: () => import('@/views/studentInformationManagement/programmingRating/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.programmingRating.programmingRating'),
        roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'ProgramRatingDetail/:id',
      name: 'ProgramRatingDetail',
      component: () =>
        import(
          '@/views/studentInformationManagement/programmingRating/ProgramRatingDetailInfo.vue'
        ),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('studentInformationManagement.ProgramRatingDetail.ProgramRatingDetail'),
      },
    },
  ],
};

export default studentInformationManagement;
