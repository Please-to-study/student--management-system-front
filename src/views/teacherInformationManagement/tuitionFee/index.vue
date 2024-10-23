<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      class=""
      :searchInfo="searchInfo"
      @fetch-success="onFetchSuccess"
    >
      <template #form-teacherCustom>
        <ApiSelect
          :api="getTeacherInfoByName"
          showSearch
          placeholder="请选择教师"
          v-model:value="teacherId"
          :filterOption="false"
          labelField="teacherLabel"
          valueField="teacherId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template>
      <template #headerTop>
        <Description
          title="基本信息"
          :collapseOptions="{ canExpand: true, helpMessage: '' }"
          :column="3"
          :data="teacherInfo"
          :schema="teacherInfoSchema"
        />
        <Divider />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看详情',
                onClick: handleView.bind(null, record),
              },
              // {
              //   icon: 'clarity:note-edit-line',
              //   tooltip: '编辑用户资料',
              //   onClick: handleEdit.bind(null, record),
              // },
              // {
              //   icon: 'ant-design:delete-outlined',
              //   color: 'error',
              //   tooltip: '删除此账号',
              //   popConfirm: {
              //     title: '是否确认删除',
              //     placement: 'left',
              //     confirm: handleDelete.bind(null, record),
              //   },
              // },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Description } from '@/components/Description';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Divider } from 'ant-design-vue';
  import { isNull, isUndefined } from '@/utils/is';
  import {
    getTeacherInfoByName,
    getTeacherTuitionFeeList,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { teacherInfoSchema } from '@/views/teacherInformationManagement/tuitionFee/account.data';
  import { ApiSelect } from '@/components/Form';
  import type { Recordable } from '@vben/types';
  import { useDebounceFn } from '@vueuse/core';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const teacherInfo = ref<any>(null);
  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const teacherId = ref<string>('');
  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { teacherName: unref(keyword) };
  });
  const [registerTable, { reload, getRawDataSource }] = useTable({
    title: '任课明细表',
    api: getTeacherTuitionFeeList,
    searchInfo: {
      teacherId: -1,
      teacherDate: '',
    },
    rowKey: 'courseRecordId',
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
      const teacherIdFlag = teacherId.value.length == 0;
      if (teacherIdFlag) {
        info.teacherId = -1;
      } else {
        info.teacherId = teacherId.value;
      }
      const teacherDateFlag = isUndefined(info.teacherDate) || info.teacherDate?.length === 0;
      if (teacherIdFlag && teacherDateFlag) {
        createMessage.error('请选择查询条件');
      } else if (teacherDateFlag) {
        createMessage.error('请选择日期');
      } else if (teacherIdFlag) {
        createMessage.error('请选择教师');
      }
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  async function customResetFunc() {
    teacherInfo.value = null;
    teacherId.value = '';
    reload();
  }

  function onSearch(value: string) {
    keyword.value = value;
  }

  function onFetchSuccess({ total }) {
    if (!isUndefined(total)) {
      const { info } = getRawDataSource();
      teacherInfo.value = info;
    }
  }

  function handleView(record: Recordable) {
    go('/system/account_detail/' + record.id);
  }
</script>
