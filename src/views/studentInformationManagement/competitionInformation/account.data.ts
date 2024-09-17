import { BasicColumn, FormSchema } from '@/components/Table';
import { queryValidateStudentNumber } from '@/views/studentInformationManagement/studentValidate';
import { getSpecialCompetitionList } from '@/api/competitionManagement/competitionManagement';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '参赛信息ID',
    dataIndex: 'competitionInfoId',
    width: 140,
    ifShow: false,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 140,
  },
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 100,
    ifShow: false,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 100,
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
    title: '比赛分数',
    dataIndex: 'competitionScore',
    width: 120,
  },
  {
    title: '比赛类型',
    dataIndex: 'competitionStyle',
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
    title: '比赛语言',
    dataIndex: 'competitionLanguage',
    width: 120,
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
    width: 120,
  },
  {
    title: '当前年级',
    dataIndex: 'studentCurrentGrade',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'notes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentNumber(),
      },
    ],
  },
  {
    field: 'studentId',
    label: '学生姓名',
    slot: 'custom',
    colProps: {
      xl: 6,
    },
  },
  {
    field: 'competitionId',
    label: '赛事名称',
    component: 'ApiSelect',
    componentProps: {
      api: getSpecialCompetitionList,
      params: {
        competitionName: '',
        competitionHost: '',
      },
      resultField: 'items',
      labelField: 'competitionName',
      valueField: 'competitionId',
    },
    colProps: { span: 6 },
  },
];

// 添加参赛信息表单
export const accountFormSchema: FormSchema[] = [
  {
    label: '参赛信息ID',
    field: 'competitionInfoId',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '参赛学生',
    field: 'studentId',
    required: true,
    slot: 'studentSearch',
  },
  {
    field: 'competitionId',
    label: '赛事名称',
    component: 'ApiSelect',
    componentProps: {
      api: getSpecialCompetitionList,
      params: {
        competitionName: '',
        competitionHost: '',
      },
      resultField: 'items',
      labelField: 'competitionName',
      valueField: 'competitionId',
    },
    required: true,
  },
  {
    field: 'competitionHonor',
    label: '获奖情况',
    component: 'Input',
    required: true,
  },
  {
    field: 'competitionScore',
    label: '分数',
    component: 'InputNumber',
    required: true,
  },

  {
    label: '备注',
    field: 'notes',
    component: 'InputTextArea',
  },
];

export const competitionInfoSchema: DescItem[] = [
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '获奖情况',
    field: 'competitionHonor',
  },
  {
    label: '比赛分数',
    field: 'competitionScore',
  },
  {
    label: '比赛类型',
    field: 'competitionStyle',
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
    label: '比赛语言',
    field: 'competitionLanguage',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
  },
  {
    label: '当前年级',
    field: 'studentCurrentGrade',
  },
  {
    label: '备注',
    field: 'notes',
  },
];
