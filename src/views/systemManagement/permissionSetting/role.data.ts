import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { setAdministratorStatus } from '@/api/configManagement';
import { SetAdministratorStatusParams } from '@/api/configParams';
import { formatToDate, formatToDateTime } from "@/utils/dateUtil";

type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  {
    title: '管理员ID',
    dataIndex: 'administratorId',
    width: 100,
    ifShow: false,
  },
  {
    title: '管理员名称',
    dataIndex: 'administratorName',
    width: 120,
  },
  {
    title: '地址',
    dataIndex: 'administratorAddress',
    width: 120,
  },
  {
    title: '联系方式',
    dataIndex: 'administratorPhone',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      // console.log("Switch record is ", record)
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '停用',
        unCheckedChildren: '启用',
        loading: record.pendingStatus,
        disabled: record.administratorId == 1,
        onChange(checked: CheckedType) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          const params: SetAdministratorStatusParams = {
            administratorId: record.administratorId,
            status: newStatus,
          };
          setAdministratorStatus(params)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'addAdministratorDate',
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'administratorNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'administratorName',
    label: '管理员名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'administratorName',
    label: '管理员名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'administratorAddress',
    label: '地址',
    component: 'Input',
  },
  {
    field: 'administratorPhone',
    label: '联系方式',
    component: 'Input',
    required: true,
  },
  {
    field: 'administratorPassword',
    label: '初始密码',
    component: 'Input',
    defaultValue: '123456',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    label: '备注',
    field: 'administratorNotes',
    component: 'InputTextArea',
  },
];
