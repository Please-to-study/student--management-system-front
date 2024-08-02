<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增学生</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看用户详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
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
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <!--    <TimeTable></TimeTable>-->
    <!--    <CurriculumTable :timeList="timeList" :dataList="dataList" />-->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';
  import { TimeTable } from '@/components/TimeTable';
  import { CurriculumTable } from '@/components/Curriculum';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord, getSearchInfo }] = useTable({
    title: '学生列表',
    // 获取学生列表数据请求函数，统一在/src/api中进行封装即可
    api: getAccountList,
    rowKey: 'id',
    columns,
    showIndexColumn: false,
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
    console.log(record);
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
    go('/system/account_detail/' + record.id);
  }

  interface timeItem {
    time: string; //课程时间区间 🌰:9:00~9:45
    type: 0 | 1; //时间类型 0:上午 1:下午
    [key: string]: any; //其他你需要的属性
  }

  const timeList: timeItem[] = [
    {
      time: '7:30~8:15',
      type: 0,
    },
    {
      time: '8:30~9:15',
      type: 0,
    },
    {
      time: '9:35~10:20',
      type: 0,
    },
    {
      time: '10:35~11:20',
      type: 0,
    },
    {
      time: '13:30~14:15',
      type: 1,
    },
    {
      time: '14:30~15:15',
      type: 1,
    },
    {
      time: '15:30~16:15',
      type: 1,
    },
    {
      time: '16:30~17:15',
      type: 1,
    },
  ];

  const dataList = [
    {
      date: '11/01',
      classList: [
        {
          name: '数据结构',
          start: '7:30',
          end: '16:15',
        },

        {
          name: '英语',
          start: '14:30',
          end: '16:15',
        },
      ],
    },
    {
      date: '11/21',
      classList: [
        {
          name: '高数',
          start: '7:30',
          end: '8:15',
        },

        {
          name: '数据结构',
          start: '13:30',
          end: '16:15',
        },
      ],
    },
  ];
</script>
