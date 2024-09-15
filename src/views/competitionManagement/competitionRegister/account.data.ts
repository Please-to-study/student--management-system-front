import { BasicColumn, FormSchema } from '@/components/Table';
import { getSpecialCompetitionList } from '@/api/competitionManagement/competitionManagement';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '比赛预报名ID',
    dataIndex: 'competitionRegisterId',
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
    title: '学生ID',
    dataIndex: 'studentId',
    width: 120,
    ifShow: false,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'studentGender',
    width: 120,
  },
  {
    title: '当前年级',
    dataIndex: 'studentCurrentGrade',
    width: 120,
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
    width: 120,
  },
  {
    title: '赛事介绍',
    dataIndex: 'introduce',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'competitionRegisterNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
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
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'studentId',
    label: '学生姓名',
    slot: 'custom',
    colProps: {
      xl: 6,
    },
  },
];

// 比赛预报名表单
export const accountFormSchema: FormSchema[] = [
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
    label: '参赛学生',
    field: 'studentId',
    required: true,
    slot: 'studentSearch',
  },
  {
    label: '备注',
    field: 'competitionRegisterNotes',
    component: 'InputTextArea',
  },
];

export const competitionRegisterSchema: DescItem[] = [
  {
    label: '比赛预报名ID',
    field: 'competitionRegisterId',
  },
  {
    label: '赛事ID',
    field: 'competitionId',
  },
  {
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '学生ID',
    field: 'studentId',
  },
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '性别',
    field: 'studentGender',
  },
  {
    label: '当前年级',
    field: 'studentCurrentGrade',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
  },
  {
    label: '赛事介绍',
    field: 'introduce',
  },
  {
    label: '备注',
    field: 'competitionRegisterNotes',
  },
];
