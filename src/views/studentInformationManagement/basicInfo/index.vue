<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增学生</a-button>
        <a-button @click="handleExport"> 导出信息 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看学生详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑学生资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
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
    <ExpExcelModal @register="registerExportModal" @success="defaultHeader" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import {BasicTable, TableAction, useTable} from '@/components/Table';
import {ExpExcelModal, ExportModalResult, jsonToSheetXlsx} from '@/components/Excel';
import {
  deleteStudent,
  getSpecialStudentBasicInfoList,
} from '@/api/studentInformationManagement/studentInformationManagement';
import {PageWrapper} from '@/components/Page';

import {useModal} from '@/components/Modal';
import AccountModal from './AccountModal.vue';

import {columns, searchFormSchema} from './account.data';
import {useGo} from '@/hooks/web/usePage';
import {useMessage} from '@/hooks/web/useMessage';
import {isUndefined} from '@/utils/is';
import {RoleEnum} from "@/enums/roleEnum";

defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const [registerExportModal, { openModal: openExportModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const exportData = ref<any[]>([]);
  const [registerTable, { reload, updateTableDataRecord, getDataSource }] = useTable({
    title: '学生列表',
    api: getSpecialStudentBasicInfoList,
    searchInfo: {
      studentNumber: '',
      studentName: '',
      studentSchool: '',
    },
    rowKey: 'studentId',
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
      const numberFlag = isUndefined(info.studentNumber) || info.studentNumber?.length === 0;
      if (numberFlag) {
        info.studentNumber = '';
      }
      const nameFlag = isUndefined(info.studentName) || info.studentName?.length === 0;
      if (nameFlag) {
        info.studentName = '';
      }
      const schoolFlag = isUndefined(info.studentSchool) || info.studentSchool?.length === 0;
      if (schoolFlag) {
        info.studentSchool = '';
      }
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteStudent(record.studentId);
    reload();
  }

  async function handleExport() {
    openExportModal(true);
    // const result = await getSpecialStudentBasicInfoList();
    exportData.value = getDataSource();
  }

  function defaultHeader({ filename, bookType }: ExportModalResult) {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: exportData.value,
      filename,
      write2excelOpts: {
        bookType,
      },
    });
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      updateTableDataRecord(values.studentId, values);
    } else {
      reload();
    }
  }

  function handleSelect(deptId = '') {
    searchInfo.deptId = deptId;
    reload();
  }

  function handleView(record: Recordable) {
    go('/studentInformationManagement/studentInfoDetail/' + record.studentId);
  }
</script>
