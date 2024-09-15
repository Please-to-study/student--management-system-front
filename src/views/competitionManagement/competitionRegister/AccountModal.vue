<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #studentSearch="{ model, field }">
        <ApiSelect
          :api="getSameStudent"
          showSearch
          placeholder="请选择学生"
          v-model:value="model[field]"
          :filterOption="false"
          labelField="studentName"
          valueField="studentId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import {
    AddCompetitionRegisterParams,
    UpdateCompetitionRegisterParams,
  } from '@/api/competitionManagement/model/competitionRegister';
  import {
    addCompetitionRegister,
    updateCompetitionRegister,
  } from '@/api/competitionManagement/competitionManagement';
  import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
  import type { Recordable } from '@vben/types';
  import { useDebounceFn } from '@vueuse/core';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  let debounceOptionsFn = useDebounceFn(onSearch, 300);
  const keyword = ref<string>('');
  const searchParams = computed<Recordable<string>>(() => {
    return { studentName: unref(keyword) };
  });

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  function onSearch(value: string) {
    keyword.value = value;
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }

    // const treeData = await getDeptList();
    // updateSchema([
    //   {
    //     field: 'pwd',
    //     show: !unref(isUpdate),
    //   },
    //   {
    //     field: 'dept',
    //     componentProps: { treeData },
    //   },
    // ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增预报名' : '编辑预报名'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api  新增学生信息功能function
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息
      if (!unref(isUpdate)) {
        const addParams: AddCompetitionRegisterParams = { ...values };
        // debugger;
        await addCompetitionRegister(addParams);
      } else {
        // todolist 检查values的值是否满足参数要求
        const updateParams: UpdateCompetitionRegisterParams = { ...values };
        await updateCompetitionRegister(updateParams);
        // console.log('updateParams is :', updateParams);
      }
      // eslint-disable-next-line no-debugger
      // debugger;
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
