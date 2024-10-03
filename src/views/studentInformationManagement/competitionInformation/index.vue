<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #form-custom>
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
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增参赛信息</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看参赛详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑参赛资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此信息',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
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
  import {
    getSameStudent,
    deleteCompetitionInfo,
    getCompetitionInfoList,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import { useDebounceFn } from '@vueuse/core';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isNull, isUndefined } from '@/utils/is';
  import { ApiSelect } from '@/components/Form';
  import type { Recordable } from '@vben/types';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  let debounceOptionsFn = useDebounceFn(onSearch, 300);
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '参赛信息列表',
    api: getCompetitionInfoList,
    rowKey: 'competitionInfoId',
    searchInfo: {
      studentNumber: '',
      studentId: -1,
      competitionId: -1,
      competitionGroup: '',
      competitionYear: '',
    },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      // baseRowStyle: {
      //   wrap: true,
      // },
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
      const competitionGroupFlag =
        isUndefined(info.competitionGroup) || info.competitionGroup?.length === 0;
      if (competitionGroupFlag) {
        info.competitionGroup = '';
      }
      const competitionYearFlag =
        isUndefined(info.competitionYear) || info.competitionYear?.length === 0;
      if (competitionYearFlag) {
        info.competitionYear = '';
      }
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

  async function customResetFunc() {
    studentId.value = '';
  }

  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(keyword) };
  });

  function onSearch(value: string) {
    keyword.value = value;
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    // console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteCompetitionInfo(record.competitionInfoId);
    reload();
    console.log(record);
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      // const result = updateTableDataRecord(values.id, values);
      reload();
    } else {
      reload();
    }
  }

  function handleView(record: Recordable) {
    go('/studentInformationManagement/competitionInfoDetail/' + record.competitionInfoId);
  }
</script>
