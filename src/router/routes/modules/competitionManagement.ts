import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from "@/enums/roleEnum";

const ExceptionPage = () => import('@/views/sys/exception/Exception.vue');

const competitionManagement: AppRouteModule = {
  path: '/competitionManagement',
  name: 'CompetitionManagement',
  component: LAYOUT,
  redirect: '/competitionManagement/competitionSchedule',
  meta: {
    orderNo: 4,
    icon: 'ion:bar-chart-outline',
    title: t('competitionManagement.competitionManagement'),
  },
  children: [
    {
      path: 'competitionInfo',
      name: 'CompetitionInfo',
      component: () => import('@/views/competitionManagement/competitionInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('competitionManagement.competitionInfo.competitionInfo'),
        // roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'competitionDetail/:competitionId',
      name: 'CompetitionDetail',
      component: () =>
        import('@/views/competitionManagement/competitionInfo/CompetitionDetail.vue'),
      // defineAsyncComponent(
      //   () => import('@/views/competitionManagement/competitionInfo/CompetitionDetail.vue'),
      // ),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('competitionManagement.competitionDetail.competitionDetail'),
      },
    },
    {
      path: 'competitionSchedule',
      name: 'CompetitionSchedule',
      component: () => import('@/views/competitionManagement/competitionSchedule/index.vue'),
      meta: {
        // affix: true,
        title: t('competitionManagement.competitionSchedule.competitionSchedule'),
        // roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },

    {
      path: 'competitionAwardsInfo',
      name: 'CompetitionAwardsInfo',
      component: () => import('@/views/competitionManagement/competitionAwardsInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('competitionManagement.competitionAwardsInfo.competitionAwardsInfo'),
        // roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'competitionAwardsDetail/:id',
      name: 'CompetitionAwardsDetail',
      component: () =>
        import('@/views/competitionManagement/competitionAwardsInfo/CompetitionAwardsDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('competitionManagement.competitionAwardsDetail.competitionAwardsDetail'),
      },
    },
    {
      path: 'competitionRegister',
      name: 'CompetitionRegister',
      component: () => import('@/views/competitionManagement/competitionRegister/index.vue'),
      meta: {
        // affix: true,
        title: t('competitionManagement.competitionRegister.competitionRegister'),
        // roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
      },
    },
    {
      path: 'competitionRegisterDetail/:id',
      name: 'CompetitionRegisterDetail',
      component: () =>
        import('@/views/competitionManagement/competitionRegister/CompetitionRegisterDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('competitionManagement.competitionRegisterDetail.competitionRegisterDetail'),
      },
    },
    {
      // path: 'competitionRecommend',
      // name: 'competitionRecommend',
      // component: () => import('@/views/competitionManagement/competitionRecommend/index.vue'),
      // meta: {
      //   // affix: true,
      //   title: t('competitionManagement.competitionRecommend.competitionRecommend'),
      // },
      path: 'competitionRecommend',
      name: 'CompetitionRecommend',
      component: ExceptionPage,
      props: {
        title: '此功能暂未开放，敬请期待！',
      },
      meta: {
        title: t('competitionManagement.competitionRecommend.competitionRecommend'),
      },
    },
  ],
};

export default competitionManagement;
