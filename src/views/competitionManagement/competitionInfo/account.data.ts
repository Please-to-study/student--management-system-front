import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { getCompetitionStyleInfoList, getCourseCategoryInfoList } from "@/api/configManagement";
import { formatToDate, formatToDateTime } from "@/utils/dateUtil";

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
    title: '赛事名称',
    dataIndex: 'competitionName',
    width: 120,
  },
  {
    title: '比赛类型',
    dataIndex: 'competitionStyleName',
    width: 120,
  },
  {
    title: '比赛组别',
    dataIndex: 'competitionGroup',
    width: 120,
  },
  {
    title: '比赛年度',
    dataIndex: 'competitionYear',
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
    customRender: ({ value }) => {
      return formatToDateTime(value);
    },
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
    field: 'competitionName',
    label: '赛事名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'competitionLanguage',
    label: '比赛语言',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'competitionYear',
    label: '年度',
    component: 'Input',
    colProps: { span: 6 },
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
    field: 'competitionStyleId',
    component: 'ApiSelect',
    componentProps: {
      allowClear: true,
      api: getCompetitionStyleInfoList,
      params: {},
      resultField: 'items',
      labelField: 'competitionStyleName',
      valueField: 'competitionStyleId',
    },
  },
  {
    label: '比赛组别',
    field: 'competitionGroup',
    component: 'Input',
    required: true,
  },
  {
    label: '比赛年度',
    field: 'competitionYear',
    component: 'Input',
    required: true,
  },
  {
    label: '比赛费用',
    field: 'competitionCost',
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
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '比赛类型',
    field: 'competitionStyleName',
  },
  {
    label: '比赛组别',
    field: 'competitionGroup',
  },
  {
    label: '比赛年度',
    field: 'competitionYear',
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
