<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
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
  import { reactive, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Description } from '@/components/Description';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Divider } from 'ant-design-vue';
  import { isUndefined } from '@/utils/is';
  import {
    getTeacherInfoById,
    getTeacherTuitionFeeList,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { teacherInfoSchema } from '@/views/teacherInformationManagement/tuitionFee/account.data';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const teacherInfo = ref<any>();
  const [registerTable] = useTable({
    title: '任课明细表',
    // --todolist-- 获取任课明细表数据请求函数，统一在/src/api中进行封装即可
    // getTeacherTuitionFeeList
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
    async handleSearchInfoFn(info) {
      // todo查询按钮操作
      const teacherIdFlag = isUndefined(info.teacherId) || info.teacherId?.length === 0;
      const teacherPhoneFlag = isUndefined(info.teacherPhone) || info.teacherPhone?.length === 0;
      const dateFlag = isUndefined(info.date) || info.date?.length === 0;
      const isEmpty = teacherIdFlag && teacherPhoneFlag && dateFlag;
      if (isEmpty) {
        createMessage.error('请至少输入一个查询条件');
        return;
      }
      // --todolist--
      await getTeacherTuitionFeeList(info);
      const { result } = await getTeacherInfoById(info.teacherId);
      teacherInfo.value = result?.items[0];
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

  function handleView(record: Recordable) {
    // --todolist--
    go('/system/account_detail/' + record.id);
  }
</script>
