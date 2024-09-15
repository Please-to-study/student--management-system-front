<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { accountFormSchema } from './account.data';
  import {
    AddTeacherInfoParams,
    UpdateTeacherInfoParams,
  } from '@/api/teacherInformationManagement/model/basicInfo';
  import {
    addTeacher,
    updateTeacher,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

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

    updateSchema([
      {
        field: 'teacherName',
        componentProps: {
          disabled: unref(isUpdate),
        },
      },
      // {
      //   field: 'teacherGender',
      //   componentProps: {
      //     disabled: unref(isUpdate),
      //   },
      // },
      // {
      //   field: 'teacherPhone',
      //   componentProps: {
      //     disabled: unref(isUpdate),
      //   },
      // },
    ]);
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增教师' : '编辑教师'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api  新增学生信息功能function
      // todolist
      // isUpdate为false ---> 创建账号  isUpdate为true ---> 修改账号信息

      if (!unref(isUpdate)) {
        const addParams: AddTeacherInfoParams = { ...values };
        // debugger;
        await addTeacher(addParams);
      } else {
        const updateParams: UpdateTeacherInfoParams = { ...values };
        // console.log('updateParams is :', updateParams);
        await updateTeacher(updateParams);
      }
      // console.log(values);
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
