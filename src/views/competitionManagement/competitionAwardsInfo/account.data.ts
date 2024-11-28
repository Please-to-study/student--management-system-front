import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import { formatToDate, formatToDateTime } from "@/utils/dateUtil";

export const columns: BasicColumn[] = [
  {
    title: '赛事信息ID',
    dataIndex: 'competitionInfoId',
    width: 120,
    ifShow: false,
  },
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
    title: '获奖情况',
    dataIndex: 'competitionHonor',
    width: 120,
  },
  {
    title: '赛事组别',
    dataIndex: 'competitionGroup',
    width: 120,
  },
  {
    title: '赛事年度',
    dataIndex: 'competitionYear',
    width: 120,
  },
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 120,
    ifShow: false,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '分数',
    dataIndex: 'competitionScore',
    width: 120,
  },
  {
    title: '主办方',
    dataIndex: 'competitionHost',
    width: 120,
  },
  {
    title: '比赛语言',
    dataIndex: 'competitionLanguage',
    width: 120,
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
    customRender: ({ value }) => {
      return formatToDate(value);
    },
    width: 120,
  },
  {
    title: '赛事介绍',
    dataIndex: 'introduce',
    width: 300,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'competitionYear',
    label: '年度',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'competitionName',
    label: '赛事名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'competitionHonor',
    label: '获奖情况',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const competitionAwardsSchema: DescItem[] = [
  {
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '获奖情况',
    field: 'competitionHonor',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '分数',
    field: 'competitionScore',
  },
  {
    label: '比赛组别',
    field: 'competitionGroup',
  },
  {
    label: '主办方',
    field: 'competitionHost',
  },
  {
    label: '比赛语言',
    field: 'competitionLanguage',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
    render: (value) => {
      return formatToDate(value);
    },
  },
  {
    label: '赛事介绍',
    field: 'introduce',
  },
];
