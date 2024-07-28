<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #headerTop>
        <Description
          title="基本信息"
          :collapseOptions="{ canExpand: true, helpMessage: '' }"
          :column="3"
          :data="mockData"
          :schema="schema"
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
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { DescItem, Description } from '@/components/Description';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { Divider } from "ant-design-vue";

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const [registerTable] = useTable({
    title: '任课明细表',
    // --todolist-- 获取任课明细表数据请求函数，统一在/src/api中进行封装即可
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

  const mockData: Recordable = {
    teacherName: 'test厦门市思明区',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'teacherName',
      label: '姓名',
    },
    {
      field: 'teacherGender',
      label: '性别',
      // render: (curVal, data) => {
      //   return `${data.username}-${curVal}`;
      // },
    },
    {
      field: 'teacherPhone',
      label: '联系电话',
    },
    {
      field: 'teacherAddress',
      label: '住址',
    },
    {
      field: 'teacherCourse',
      label: '教授课程',
    },
    {
      field: 'teacherSigning',
      label: '签约形式',
    },
    {
      field: 'teacherSigning',
      label: '已完成课时',
    },
    {
      field: 'teacherSigning',
      label: '上课次数',
    },
    {
      field: 'teacherSigning',
      label: '课时费',
    },
  ];

  function handleView(record: Recordable) {
    // --todolist--
    go('/system/account_detail/' + record.id);
  }
</script>
