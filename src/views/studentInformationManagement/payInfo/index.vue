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
        <a-button type="primary" @click="handleCreate">新增缴费</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看缴费详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑缴费信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除缴费信息',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                auth: RoleEnum.MASTER,
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
    deletePayInfo,
    getPayInfoList,
    getSameStudent,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import { ApiSelect } from '@/components/Form';
  import type { Recordable } from '@vben/types';
  import { useDebounceFn } from '@vueuse/core';
  import {RoleEnum} from "@/enums/roleEnum";

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const studentId = ref<string>('');
  const courseCategoryId = ref<string>('');
  const [registerTable, { reload, updateTableDataRecord, getSearchInfo }] = useTable({
    title: '缴费信息列表',
    api: getPayInfoList,
    rowKey: 'payId',
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
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
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

  async function handleDelete(record: Recordable) {
    await deletePayInfo(record.payId);
    await reload();
  }

  function handleExport() {
    console.log(getSearchInfo());
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      const result = updateTableDataRecord(values.id, values);
      console.log(result);
    } else {
      reload();
    }
  }

  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }

  function handleView(record: Recordable) {
    go('/studentInformationManagement/payInfoDetail/' + record.payId);
  }
</script>
