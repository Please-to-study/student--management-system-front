<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable
      @register="registerTable"
      class=""
      :searchInfo="searchInfo"
      @fetch-success="onFetchSuccess"
    >
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
  import { onMounted, reactive, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Description } from '@/components/Description';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Divider } from 'ant-design-vue';
  import { isUndefined } from '@/utils/is';
  import { getTeacherTuitionFeeList } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { teacherInfoSchema } from '@/views/teacherInformationManagement/tuitionFee/account.data';

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const teacherInfo = ref<any>(null);
  const [registerTable, { reload, getRawDataSource }] = useTable({
    title: '任课明细表',
    api: getTeacherTuitionFeeList,
    searchInfo: {
      teacherName: '',
      teacherPhone: '',
      teacherDate: '',
    },
    rowKey: 'courseRecordId',
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
      const teacherNameFlag = isUndefined(info.teacherName) || info.teacherName?.length === 0;
      const teacherPhoneFlag = isUndefined(info.teacherPhone) || info.teacherPhone?.length === 0;
      const teacherDateFlag = isUndefined(info.teacherDate) || info.teacherDate?.length === 0;
      if (teacherNameFlag) {
        createMessage.error('请输入教师姓名');
        return;
      } else if (teacherPhoneFlag) {
        createMessage.error('请输入电话');
        return;
      } else if (teacherDateFlag) {
        createMessage.error('请选择日期');
        return;
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
    teacherInfo.value = null;
    reload();
  }

  function onFetchSuccess({ total }) {
    if (!isUndefined(total)) {
      const { info } = getRawDataSource();
      teacherInfo.value = info;
    }
  }

  function handleView(record: Recordable) {
    // --todolist--
    go('/system/account_detail/' + record.id);
  }
</script>
