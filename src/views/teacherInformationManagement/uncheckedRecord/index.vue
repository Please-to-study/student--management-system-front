<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo" />
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import type { Recordable } from '@vben/types';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getUncheckedRecordList } from '@/api/teacherInformationManagement/teacherInformationManagement';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const userStore = useUserStore();
  const { createMessage: msg } = useMessage();
  const [registerModal] = useModal();
  const { userId } = userStore.getUserInfo;
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '未审核记录列表',
    api: getUncheckedRecordList,
    rowKey: 'learningRecordId',
    searchInfo: {
      teacherId: userId,
    },
    columns,
    showTableSetting: true,
    bordered: true,
  });

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(values.id, values.rowInfo);
    } else {
      reload();
    }
  }

  function handleView(record: Recordable) {
    go('/courseInformationManagement/reviewRecordDetail/' + record.learningRecordId);
  }
</script>
