import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'competitionStyleId',
    width: 120,
  },
  {
    title: '课程类别名称',
    dataIndex: 'competitionStyleName',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'competitionStyleNotes',
    width: 200,
  },
];

// 添加账户
export const competitionStyleFormSchema: FormSchema[] = [
  {
    field: 'competitionStyleId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'competitionStyleName',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'competitionStyleNotes',
    component: 'InputTextArea',
  },
];
