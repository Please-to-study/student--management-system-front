import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';
import { getAllCourseInfoList } from '@/api/courseInformationManagement/courseInformationManagement';
import { getAllTeacherBasicInfoList } from '@/api/teacherInformationManagement/teacherInformationManagement';
import { DescItem } from '@/components/Description';

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
    title: '比赛组别',
    dataIndex: 'competitionStyle',
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
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
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
    field: 'competitionName',
    label: '赛事名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'competitionHonor',
    label: '获奖情况',
    component: 'Input',
    colProps: { span: 8 },
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
    field: 'competitionStyle',
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
  },
  {
    label: '赛事介绍',
    field: 'introduce',
  },
];
