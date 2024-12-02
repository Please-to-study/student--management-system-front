import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const courseTimeManagement: AppRouteModule = {
  path: '/courseTimeManagement',
  name: 'CourseTimeManagement',
  component: LAYOUT,
  redirect: '/courseTimeManagement/importRecord',
  meta: {
    orderNo: 2,
    icon: 'ion:layers-outline',
    title: t('teacherInformationManagement.courseTimeManagement'),
    roles: [RoleEnum.TEACHER],
  },
  children: [
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
    {
      path: 'studyRecordDetail/:id',
      name: 'StudyRecordDetail',
      component: () =>
        import('@/views/teacherInformationManagement/studyRecord/studyRecordDetail.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('teacherInformationManagement.studyRecordDetail.studyRecordDetail'),
      },
    },
  ],
};

export default courseTimeManagement;
