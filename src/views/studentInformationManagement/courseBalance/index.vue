<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #form-studentCustom>
        <ApiSelect
          :api="getSameStudent"
          showSearch
          allowClear
          placeholder="请选择学生"
          v-model:value="studentId"
          :filterOption="false"
          labelField="studentLabel"
          valueField="studentId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template> </BasicTable
    >/
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';

  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchFormSchema } from './account.data';
  import {
    getCourseBalanceList,
    getSameStudent,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import { isNull, isUndefined } from '@/utils/is';
  import type { Recordable } from '@vben/types';
  import { ApiSelect } from '@/components/Form';
  import { useDebounceFn } from '@vueuse/core';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');
  const courseCategoryId = ref<string>('');
  const [registerTable] = useTable({
    title: '课程结余信息',
    api: getCourseBalanceList,
    rowKey: 'courseBalanceId',
    searchInfo: {
      studentNumber: '',
      studentId: -1,
      courseCategoryId: -1,
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      resetFunc: customResetFunc,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      const studentNumberFlag = isUndefined(info.studentNumber) || info.studentNumber?.length === 0;
      if (studentNumberFlag) {
        info.studentNumber = '';
      }
      const studentIdFlag = isNull(studentId.value);
      if (studentIdFlag) {
        info.studentId = -1;
      } else {
        info.studentId = studentId.value;
      }
      const courseCategoryIdFlag = isUndefined(info.courseCategoryId);
      if (courseCategoryIdFlag) {
        info.courseCategoryId = -1;
      }
      return info;
    },
  });

  async function customResetFunc() {
    studentId.value = '';
    courseCategoryId.value = '';
  }

  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(keyword) };
  });

  function onSearch(value: string) {
    keyword.value = value;
  }
</script>
