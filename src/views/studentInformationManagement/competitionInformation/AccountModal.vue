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
          labelField="studentLabel"
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
    addCompetitionInfo,
    getSameStudent,
    updateCompetitionInfo,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import {
    AddCompetitionInfoParams,
    UpdateCompetitionInfoParams,
  } from '@/api/studentInformationManagement/model/competitionInfo';
  import { useDebounceFn } from '@vueuse/core';
  import type { Recordable } from '@vben/types';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const debounceOptionsFn = useDebounceFn(onSearch, 300);
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

    // updateSchema([
    //   // {
    //   //   field: 'studentNumber',
    //   //   ifShow: unref(isUpdate),
    //   //   componentProps: {
    //   //     disabled: unref(isUpdate),
    //   //   },
    //   // },
    //   {
    //     field: 'studentName',
    //     componentProps: {
    //       disabled: unref(isUpdate),
    //     },
    //   },
    // ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增信息' : '编辑信息'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api  新增学生信息功能function
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息
      if (!unref(isUpdate)) {
        const addParams: AddCompetitionInfoParams = { ...values };
        // debugger;
        await addCompetitionInfo(addParams);
      } else {
        const updateParams: UpdateCompetitionInfoParams = { ...values };
        // console.log('updateParams is :', updateParams);
        await updateCompetitionInfo(updateParams);
      }
      console.log(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
