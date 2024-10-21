<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <!--    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">-->
    <!--      <template #toolbar>-->
    <!--        <a-button type="primary" @click="handleCreate">新增学生</a-button>-->
    <!--      </template>-->
    <!--      <template #bodyCell="{ column, record }">-->
    <!--        <template v-if="column.key === 'action'">-->
    <!--          <TableAction-->
    <!--            :actions="[-->
    <!--              {-->
    <!--                icon: 'clarity:info-standard-line',-->
    <!--                tooltip: '查看用户详情',-->
    <!--                onClick: handleView.bind(null, record),-->
    <!--              },-->
    <!--              {-->
    <!--                icon: 'clarity:note-edit-line',-->
    <!--                tooltip: '编辑用户资料',-->
    <!--                onClick: handleEdit.bind(null, record),-->
    <!--              },-->
    <!--              {-->
    <!--                icon: 'ant-design:delete-outlined',-->
    <!--                color: 'error',-->
    <!--                tooltip: '删除此账号',-->
    <!--                popConfirm: {-->
    <!--                  title: '是否确认删除',-->
    <!--                  placement: 'left',-->
    <!--                  confirm: handleDelete.bind(null, record),-->
    <!--                },-->
    <!--              },-->
    <!--            ]"-->
    <!--          />-->
    <!--        </template>-->
    <!--      </template>-->
    <!--    </BasicTable>-->
    <!--    <AccountModal @register="registerModal" @success="handleSuccess" />-->
    <Card class="mr oh">
      <CourseCalendar />
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useTable } from '@/components/Table';
  import { getAccountList } from '@/api/demo/system';
  import { PageWrapper } from '@/components/Page';
  import CourseCalendar from './Calendar.vue';

  import { useModal } from '@/components/Modal';

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
</script>
<style scoped>
  .mr {
    margin: 16px;
  }
  .oh {
    overflow: auto;
  }
</style>
