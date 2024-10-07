import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'courseCategoryId',
    width: 120,
  },
  {
    title: '课程类别名称',
    dataIndex: 'courseCategoryName',
    width: 120,
  },
  {
    title: '课程类别单价',
    dataIndex: 'courseCategoryPrice',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'courseCategoryNotes',
    width: 200,
  },
];

// 添加账户
export const courseCategoryFormSchema: FormSchema[] = [
  {
    field: 'courseCategoryId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'courseCategoryName',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'courseCategoryPrice',
    label: '单价',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '备注',
    field: 'courseCategoryNotes',
    component: 'InputTextArea',
  },
];
