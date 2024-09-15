<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看上课详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑上课信息',
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
  import { isUndefined } from '@/utils/is';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteCourseRecord,
    getAllCourseRecordList,
    getSpecialCourseRecordList,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord, getSearchInfo }] = useTable({
    title: '教师上课记录列表',
    // 获取学生列表数据请求函数，统一在/src/api中进行封装即可
    // getAllCourseRecordList  getAccountList
    api: getAccountList,
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
      // --todolist-- 查询按钮操作
      const teacherIdFlag = isUndefined(info.teacherId) || info.teacherId?.length === 0;
      const courseIdFlag = isUndefined(info.courseId) || info.courseId?.length === 0;
      const isEmpty = teacherIdFlag && courseIdFlag;
      if (isEmpty) {
        createMessage.error('请至少输入一个查询条件');
        return;
      }
      // --todolist--
      getSpecialCourseRecordList(info);
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
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
    deleteCourseRecord(record.courseRecordId);
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
    go('/teacherInformationManagement/courseRecordDetail/' + record.courseRecordId);
  }
</script>
