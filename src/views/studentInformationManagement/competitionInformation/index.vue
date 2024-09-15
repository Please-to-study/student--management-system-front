<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <!--    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />-->
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增参赛信息</a-button>
        <!--        <a-button type="primary" @click="handleExport">导出账号</a-button>-->
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
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteCompetitionInfo,
    getAllCompetitionInfoList,
    getCompetitionInfoList,
    getSpecialCompetitionInfoList,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import { isUndefined } from '@/utils/is';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '参赛信息列表',
    // --todolist-- 获取学生列表数据请求函数，统一在/src/api中进行封装即可
    // getAllCompetitionInfoList  getAccountList
    api: getCompetitionInfoList,
    rowKey: 'competitionInfoId',
    searchInfo: {
      studentNumber: '',
      studentId: -1,
      competitionId: -1,
    },
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
      const studentNumberFlag = isUndefined(info.studentNumber) || info.studentNumber?.length === 0;
      if (studentNumberFlag) {
        info.studentNumber = '';
      }
      const studentNameFlag = isUndefined(info.studentName) || info.studentName?.length === 0;
      if (studentNameFlag) {
        info.studentName = '';
      }
      const competitionIdFlag = isUndefined(info.competitionId);
      if (competitionIdFlag) {
        info.competitionId = -1;
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
    deleteCompetitionInfo(record.competitionInfoId);
    reload();
    console.log(record);
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

  function handleView(record: Recordable) {
    go('/studentInformationManagement/competitionInfoDetail/' + record.competitionInfoId);
  }
</script>
