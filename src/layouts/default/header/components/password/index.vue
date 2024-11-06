<template>
  <BasicModal :footer="null" title="修改当前用户密码" v-bind="$attrs" @register="registerModal">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';

  import { formSchema } from './pwd.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { resetPassword } from '@/api/sys/user';
  import { useUserStore } from '@/store/modules/user';
  import { UpdatePasswordParams } from '@/api/sys/model/userModel';
  import { PageEnum } from '@/enums/pageEnum';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const { push } = useRouter();
  defineOptions({ name: 'ChangePwd' });
  const [registerModal, { closeModal }] = useModalInner();

  const [register, { validate, resetFields }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const { passwordOld, passwordNew } = values;

      // TODO custom api
      console.log(passwordOld, passwordNew);
      console.log('userStore is ', userStore.getUserInfo);
      const { identity, userName } = userStore.getUserInfo;
      const params: UpdatePasswordParams = {
        userName,
        identity,
        passwordOld,
        passwordNew,
      };
      const { code } = await resetPassword(params);
      if (code == 0) {
        closeModal();
        // router.replace(PageEnum.BASE_LOGIN);
        push(PageEnum.BASE_LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>
