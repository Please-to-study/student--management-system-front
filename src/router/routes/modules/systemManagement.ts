import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from "@/enums/roleEnum";

const systemManagement: AppRouteModule = {
  path: '/systemManagement',
  name: 'SystemManagement',
  component: LAYOUT,
  redirect: '/systemManagement/basicSetting',
  meta: {
    orderNo: 5,
    icon: 'ion:settings-outline',
    title: t('systemManagement.systemManagement'),
  },
  children: [
    {
      path: 'basicSetting',
      name: 'BasicSetting',
      meta: {
        // affix: true,
        title: t('systemManagement.basicSetting.basicSetting'),
      },
      children: [
        {
          path: 'payStyleSetting',
          name: 'PayStyleSetting',
          component: () => import('@/views/systemManagement/payStyleSetting/index.vue'),
          meta: {
            title: t('systemManagement.basicSetting.payStyleSetting'),
            roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'courseCategorySetting',
          name: 'CourseCategorySetting',
          component: () => import('@/views/systemManagement/courseCategorySetting/index.vue'),
          meta: {
            title: t('systemManagement.basicSetting.courseCategorySetting'),
            roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
          },
        },
        {
          path: 'competitionStyleSetting',
          name: 'CompetitionStyleSetting',
          component: () => import('@/views/systemManagement/competitionStyleSetting/index.vue'),
          meta: {
            title: t('systemManagement.basicSetting.competitionStyleSetting'),
            roles: [RoleEnum.MASTER, RoleEnum.ADMINISTRATOR],
          },
        },
      ],
    },
    {
      path: 'permissionSetting',
      name: 'PermissionSetting',
      component: () => import('@/views/systemManagement/permissionSetting/index.vue'),
      meta: {
        // affix: true,
        title: t('systemManagement.permissionSetting.permissionSetting'),
        roles: [RoleEnum.MASTER],
      },
    },
  ],
};

export default systemManagement;
