<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './account.data';
  import {
    getAllCourseBalanceList,
    getSpecialCourseBalanceList,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import { isUndefined } from '@/utils/is';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({});
  const [registerTable] = useTable({
    title: '课程结余信息',
    api: getAllCourseBalanceList,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      // todo查询按钮操作
      const studentNumberFlag = isUndefined(info.studentNumber) || info.studentNumber?.length === 0;
      const studentNameFlag = isUndefined(info.studentName) || info.studentName?.length === 0;
      const courseNameFlag = isUndefined(info.courseName) || info.courseName?.length === 0;
      const isEmpty = studentNumberFlag && studentNameFlag && courseNameFlag;
      if (isEmpty) {
        createMessage.error('请至少输入一个查询条件');
        return;
      }
      // --todolist--
      getSpecialCourseBalanceList(info);
      console.log('handleSearchInfoFn', info);
      return info;
    },
  });
</script>
