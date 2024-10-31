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
              // {
              //   icon: 'clarity:note-edit-line',
              //   tooltip: '编辑上课信息',
              //   onClick: handleEdit.bind(null, record),
              // },
              // {
              //   icon: 'ant-design:delete-outlined',
              //   color: 'error',
              //   tooltip: '删除此信息',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { isUndefined } from '@/utils/is';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteCourseRecord,
    getCourseRecordList,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord, getSearchInfo }] = useTable({
    title: '教师上课记录列表',
    api: getCourseRecordList,
    searchInfo: {
      teacherName: '',
      courseCategoryId: -1,
      signingStyle: '',
    },
    rowKey: 'courseRecordId',
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
      const nameFlag = isUndefined(info.teacherName) || info.teacherName?.length === 0;
      if (nameFlag) {
        info.teacherName = '';
      }
      const courseCategoryIdFlag = isUndefined(info.courseCategoryId);
      if (courseCategoryIdFlag) {
        info.courseCategoryId = -1;
      }
      const signingStyleFlag = isUndefined(info.signingStyle) || info.signingStyle?.length === 0;
      if (signingStyleFlag) {
        info.signingStyle = '';
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
