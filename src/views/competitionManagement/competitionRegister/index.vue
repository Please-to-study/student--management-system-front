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
        <a-button type="primary" @click="handleCreate">新增报名</a-button>
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
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
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
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isNull, isUndefined } from '@/utils/is';
  import {
    deleteCompetitionRegister,
    getCompetitionRegisterList,
  } from '@/api/competitionManagement/competitionManagement';
  import { ApiSelect } from '@/components/Form';
  import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
  import { useDebounceFn } from '@vueuse/core';
  import type { Recordable } from '@vben/types';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  let debounceOptionsFn = useDebounceFn(onSearch, 300);
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');

  const [registerTable, { reload }] = useTable({
    title: '比赛预报名列表',
    api: getCompetitionRegisterList,
    searchInfo: {
      competitionName: '',
      studentNumber: '',
      studentId: -1,
    },
    rowKey: 'competitionRegisterId',
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
      const competitionNameFlag = isUndefined(info.competitionName);
      if (competitionNameFlag) {
        info.competitionId = '';
      }
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
    studentId.value = '';
  }

  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(keyword) };
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function onSearch(value: string) {
    keyword.value = value;
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteCompetitionRegister(record.competitionRegisterId);
    reload();
    console.log(record);
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      // const result = updateTableDataRecord(values.competitionRegisterId, values);
      reload();
    } else {
      reload();
    }
  }

  function handleView(record: Recordable) {
    go('/competitionManagement/competitionRegisterDetail/' + record.competitionRegisterId);
  }
</script>
