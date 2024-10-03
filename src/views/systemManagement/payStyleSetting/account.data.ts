import { BasicColumn, FormSchema } from '@/components/Table';

const radioMap = new Map([
  [0, '否'],
  [1, '是'],
]);

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'teacherPayStyleId',
    width: 120,
  },
  {
    title: '计算方式名称',
    dataIndex: 'teacherPayStyleName',
    width: 120,
  },
  {
    title: '是否具有底薪',
    dataIndex: 'basicSalary',
    customRender: ({ value }) => {
      return radioMap.get(value);
    },
    width: 80,
  },
  {
    title: '是否超额课消',
    dataIndex: 'teacherSpecialStyle',
    customRender: ({ value }) => {
      return radioMap.get(value);
    },
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'teacherPayStyleNotes',
    width: 200,
  },
];

// 添加账户
export const payStyleFormSchema: FormSchema[] = [
  {
    field: 'teacherPayStyleId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'teacherPayStyleName',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'basicSalary',
    label: '底薪',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '有',
          value: 1,
        },
        {
          label: '无',
          value: 0,
        },
      ],
    },
    required: true,
  },
  {
    label: '超额课消',
    field: 'teacherSpecialStyle',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'teacherPayStyleNotes',
    component: 'InputTextArea',
  },
];
