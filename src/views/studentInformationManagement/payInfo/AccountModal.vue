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
    AddPayInfo,
    getSameStudent,
    updatePayInfo,
  } from '@/api/studentInformationManagement/studentInformationManagement';
  import {
    AddPayInfoParams,
    UpdatePayInfoParams,
  } from '@/api/studentInformationManagement/model/spendingInfo';
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

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
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
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增缴费' : '编辑缴费'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // isUpdate为false ---> 新增缴费  isUpdate为true ---> 编辑缴费
      if (!unref(isUpdate)) {
        const addParams: AddPayInfoParams = { ...values };
        await AddPayInfo(addParams);
      } else {
        const updateParams: UpdatePayInfoParams = { ...values };
        await updatePayInfo(updateParams);
      }
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
