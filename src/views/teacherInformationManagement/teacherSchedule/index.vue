<template>
  <PageWrapper>
    <BasicForm @register="register" @submit="handleSubmit" class="searchFormStyle">
      <template #teacherSearch="{ model, field }">
        <ApiSelect
          :api="getTeacherInfoByName"
          showSearch
          placeholder="请选择教师"
          v-model:value="model[field]"
          :filterOption="false"
          labelField="teacherLabel"
          valueField="teacherId"
          :params="searchParams"
          @search="debounceOptionsFn"
        />
      </template>
    </BasicForm>
    <Card class="mr oh">
      <CourseCalendar :teacherId="teacherId" :submitFlag="submitFlag" />
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import CourseCalendar from './Calendar.vue';

  import { useModal } from '@/components/Modal';
  import { useGo } from '@/hooks/web/usePage';
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { getTeacherInfoByName } from '@/api/teacherInformationManagement/teacherInformationManagement';
  import { useDebounceFn } from '@vueuse/core';
  import type { Recordable } from '@vben/types';
  import { searchFormSchema } from '@/views/teacherInformationManagement/teacherSchedule/account.data';

  defineOptions({ name: 'AccountManagement' });

  const go = useGo();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});

  const debounceOptionsFn = useDebounceFn(onSearch, 300);
  const keyword = ref<string>('');
  const teacherId = ref<number>(-1);
  const submitFlag = ref<number>(-1);
  const searchParams = computed<Recordable<string>>(() => {
    return { teacherName: unref(keyword) };
  });

  const [register] = useForm({
    labelWidth: 120,
    schemas: searchFormSchema,
    actionColOptions: { span: 17 },
    showAdvancedButton: false,
    resetFunc: customResetFunc,
  });

  // const emitter = mitt();

  function onSearch(value: string) {
    keyword.value = value;
  }

  async function customResetFunc() {
    teacherId.value = -1;
    submitFlag.value = -1;
  }

  function handleSubmit(values) {
    teacherId.value = values.teacherId;
    submitFlag.value = submitFlag.value >= 0 ? 1 - submitFlag.value : 0;
    // emitter.emit('teacherSchedule', teacherId.value);
  }

  // emitter.on('teacherSchedule', e => {
  //   console.log('teacherSchedule', e);
  // });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleView(record: Recordable) {
    go('/system/account_detail/' + record.id);
  }
</script>
<style scoped>
  .mr {
    margin: 16px;
  }
  .oh {
    overflow: auto;
  }

  .searchFormStyle {
    background-color: #ffffff;
    padding-top: 20px;
    margin-left: 16px;
    margin-right: 16px;
  }
</style>
