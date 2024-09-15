import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';

export const weekend = [
  {
    label: '星期一',
    value: '1',
    key: '1',
  },
  {
    label: '星期二',
    value: '2',
    key: '2',
  },
  {
    label: '星期三',
    value: '3',
    key: '3',
  },
  {
    label: '星期四',
    value: '4',
    key: '4',
  },
  {
    label: '星期五',
    value: '5',
    key: '5',
  },
  {
    label: '星期六',
    value: '6',
    key: '6',
  },
  {
    label: '星期日',
    value: '7',
    key: '7',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '赛事ID',
    dataIndex: 'competitionId',
    width: 120,
    ifShow: false,
  },
  {
    title: '比赛名称',
    dataIndex: 'competitionName',
    width: 120,
  },
  {
    title: '比赛类型',
    dataIndex: 'competitionStyle',
    width: 120,
  },
  {
    title: '比赛费用',
    dataIndex: 'competitionCost',
    width: 120,
  },
  {
    title: '主办方',
    dataIndex: 'competitionHost',
    width: 120,
  },
  {
    title: '报名方式',
    dataIndex: 'competitionRegister',
    width: 120,
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
    width: 120,
  },
  {
    title: '比赛语言',
    dataIndex: 'competitionLanguage',
    width: 120,
  },
  {
    title: '比赛介绍',
    dataIndex: 'introduce',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'competitionNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    // 是否应该模糊查询
    field: 'competitionName',
    label: '比赛名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    // 是否应该模糊查询
    field: 'competitionHost',
    label: '主办方',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加form
export const accountFormSchema: FormSchema[] = [
  {
    label: '赛事ID',
    field: 'competitionId',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '比赛名称',
    field: 'competitionName',
    component: 'Input',
    required: true,
  },
  {
    label: '比赛类型',
    field: 'competitionStyle',
    // 是否要维护一个新表 从而使类型转换为Select
    component: 'Input',
  },
  {
    label: '比赛费用',
    field: 'competitionCost',
    // 应该用int 不应该用string
    component: 'InputNumber',
    required: true,
  },
  {
    label: '主办方',
    field: 'competitionHost',
    component: 'Input',
    required: true,
  },
  {
    label: '报名方式',
    field: 'competitionRegister',
    component: 'Input',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      format: 'YYYY-MM-DD',
    },
    // render: ({ model, field }) => {
    //   console.log('competitionDate is ', model[field]);
    //   if (isUndefined(model[field])) {
    //     return '';
    //   }
    //   return h(DatePicker, {
    //     placeholder: '请选择日期',
    //     value: model[field],
    //     onChange: (e) => {
    //       model[field] = e.target.value;
    //     },
    //   });
    // },
    required: true,
  },
  {
    label: '比赛语言',
    field: 'competitionLanguage',
    component: 'Input',
  },
  {
    label: '比赛介绍',
    field: 'introduce',
    component: 'InputTextArea',
    required: true,
  },
  {
    label: '备注',
    field: 'competitionNotes',
    component: 'InputTextArea',
  },
];

export const competitionSchema: DescItem[] = [
  {
    label: '赛事ID',
    field: 'competitionId',
  },
  {
    label: '比赛名称',
    field: 'competitionName',
  },
  {
    label: '比赛类型',
    field: 'competitionStyle',
  },
  {
    label: '比赛费用',
    field: 'competitionCost',
  },
  {
    label: '主办方',
    field: 'competitionHost',
  },
  {
    label: '报名方式',
    field: 'competitionRegister',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
  },
  {
    label: '比赛语言',
    field: 'competitionLanguage',
  },
  {
    label: '比赛介绍',
    field: 'introduce',
  },
  {
    label: '备注',
    field: 'competitionNotes',
  },
];
