<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable } from '@/components/Table';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isUndefined } from '@/utils/is';
  import { columns, searchFormSchema } from './account.data';
  import {
    getTeacherSchedule
  } from "@/api/teacherInformationManagement/teacherInformationManagement";

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const searchInfo = reactive<Recordable>({});
  const [registerTable] = useTable({
    title: '教师课程列表',
    // 获取学生列表数据请求函数，统一在/src/api中进行封装即可
    api: getAccountList,
    rowKey: 'id',
    columns,
    // showIndexColumn: false,
    striped: false,
    pagination: false,
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
      const teacherIdFlag = isUndefined(info.teacherId) || info.teacherId?.length === 0;
      const teacherPhoneFlag = isUndefined(info.teacherPhone) || info.teacherPhone?.length === 0;
      const isEmpty = teacherIdFlag && teacherPhoneFlag;
      if (isEmpty) {
        createMessage.error('请至少输入一个查询条件');
        return;
      }
      // --todolist--
      getTeacherSchedule({ teacherId: info.teacherId });
      console.log('handleSearchInfoFn', info);
      return info;
    },
  });
</script>
