import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const studentInformationManagement: AppRouteModule = {
  path: '/studentInformationManagement',
  name: 'studentInformationManagement',
  component: LAYOUT,
  redirect: '/studentInformationManagement/basicInfo',
  meta: {
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: t('studentInformationManagement.studentManagement'),
  },
  children: [
    {
      path: 'basicInfo',
      name: 'basicInfo',
      component: () => import('@/views/studentInformationManagement/basicInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.basicInfo.basicInfo'),
      },
    },
    {
      path: 'spendingInfo',
      name: 'spendingInfo',
      component: () => import('@/views/studentInformationManagement/spendingInfo/index.vue'),
      meta: {
        // affix: true,
        title: t('studentInformationManagement.spendingInfo.spendingInfo'),
      },
    },
  ],
};

export default studentInformationManagement;
