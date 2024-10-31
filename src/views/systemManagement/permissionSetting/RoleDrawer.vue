<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    AddTeacherInfoParams,
    UpdateTeacherInfoParams,
  } from '@/api/teacherInformationManagement/model/basicInfo';
  import {
    addTeacher,
    updateTeacher,
  } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { AddAdministratorParams, UpdateAdministratorParams } from '@/api/configParams';
  import { addAdministrator, updateAdministrator } from '@/api/configManagement';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
      if (data.record.administratorId == 1) {
        updateSchema([
          {
            field: 'status',
            componentProps: {
              disabled: unref(isUpdate),
            },
          },
        ]);
      } else {
        updateSchema([
          {
            field: 'status',
            componentProps: {
              disabled: !unref(isUpdate),
            },
          },
        ]);
      }
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增管理员' : '编辑管理员'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      if (!unref(isUpdate)) {
        const addParams: AddAdministratorParams = { ...values };
        // debugger;
        await addAdministrator(addParams);
      } else {
        const updateParams: UpdateAdministratorParams = { ...values };
        // console.log('updateParams is :', updateParams);
        await updateAdministrator(updateParams);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
