<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增赛事</a-button>
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
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
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
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';

  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './account.data';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isUndefined } from '@/utils/is';
  import {
    getCourseList,
  } from "@/api/courseInformationManagement/courseInformationManagement";
  import {
    deleteCompetition,
    getAllCompetitionList, getCompetitionList,
    getSpecialCompetitionList
  } from "@/api/competitionManagement/competitionManagement";
  import dayjs from 'dayjs';
  import {RoleEnum} from "@/enums/roleEnum";

  defineOptions({ name: 'AccountManagement' });

  const { createMessage } = useMessage();
  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '赛事信息列表',
    api: getCompetitionList,
    searchInfo: {
      competitionName: '',
      competitionLanguage: '',
      competitionYear: '',
      isFuture: false,
    },
    rowKey: 'competitionId',
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
      const competitionNameFlag =
        isUndefined(info.competitionName) || info.competitionName?.length === 0;
      if (competitionNameFlag) {
        info.competitionName = '';
      }
      const competitionLanguageFlag =
        isUndefined(info.competitionLanguage) || info.competitionLanguage?.length === 0;
      if (competitionLanguageFlag) {
        info.competitionLanguage = '';
      }
      const competitionYearFlag =
        isUndefined(info.competitionYear) || info.competitionYear?.length === 0;
      if (competitionYearFlag) {
        info.competitionYear = '';
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
    console.log('record is ', record);
    record.competitionDate = dayjs(record.competitionDate);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteCompetition(record.competitionId);
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
    go('/competitionManagement/competitionDetail/' + record.competitionId);
  }
</script>
