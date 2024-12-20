import { BasicColumn, FormSchema } from '@/components/Table';
import { queryValidateStudentNumber } from '@/views/studentInformationManagement/studentValidate';
import { DescItem } from '@/components/Description';
import {getCompetitionLanguageInfoList} from "@/api/configManagement";

const genderMap = new Map([
  ['1', '男'],
  ['2', '女'],
]);

export const columns: BasicColumn[] = [
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
    title: '性别',
    dataIndex: 'studentGender',
    customRender: ({ value }) => {
      return genderMap.get(value);
    },
    width: 80,
  },
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 120,
  },
  {
    title: 'OJ账号',
    dataIndex: 'studentAccount',
    width: 120,
  },
  {
    title: '编程语言ID',
    dataIndex: 'competitionLanguageId',
    width: 120,
    ifShow: false,
  },
  {
    title: '编程语言',
    dataIndex: 'competitionLanguageName',
    width: 100,
  },
  {
    title: '等级',
    dataIndex: 'programRate',
    width: 200,
  },
  {
    title: '当前年级',
    dataIndex: 'studentCurrentGrade',
    width: 120,
  },
  {
    title: '当前学校',
    dataIndex: 'studentSchool',
    width: 140,
  },
  {
    title: '备注',
    dataIndex: 'programNotes',
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
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    label: '编程能力评级ID',
    field: 'programRateId',
    component: 'Input',
    ifShow: false,
  },
  {
    label: '学生',
    field: 'studentId',
    // required: true,
    slot: 'studentSearch',
  },
  {
    label: '编程语言',
    field: 'competitionLanguageId',
    component: 'ApiSelect',
    componentProps: {
      api: getCompetitionLanguageInfoList,
      params: {},
      resultField: 'items',
      labelField: 'competitionLanguageName',
      valueField: 'competitionLanguageId',
    },
    required: true,
  },
  {
    label: '等级',
    field: 'programRate',
    component: 'Input',
    required: true,
  },
  {
    field: 'programNotes',
    label: '备注',
    component: 'InputTextArea',
  },
];

export const programRateSchema: DescItem[] = [
  // {
  //   label: '学生ID',
  //   field: 'studentId',
  // },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '性别',
    render: (value) => {
      return genderMap.get(value);
    },
    field: 'studentGender',
  },
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: 'OJ账号',
    field: 'studentAccount',
  },
  {
    label: '编程语言',
    field: 'competitionLanguageName',
  },
  {
    label: '等级',
    field: 'programRate',
  },
  {
    label: '当前年级',
    field: 'studentCurrentGrade',
  },
  {
    label: '当前学校',
    field: 'studentSchool',
  },
  {
    label: '备注',
    field: 'programNotes',
  },
];
