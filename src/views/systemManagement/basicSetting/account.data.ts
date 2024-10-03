import { BasicColumn, FormSchema } from '@/components/Table';
import { DescItem } from '@/components/Description';
import {
  validateStudentName,
  validateStudentPhone,
  queryValidateStudentNumber,
  queryValidateStudentName,
} from '@/views/studentInformationManagement/studentValidate';

const genderMap = new Map([
  ['1', '男'],
  ['2', '女'],
]);

const statusMap = new Map([
  [0, '正在学习'],
  [1, '已结业'],
  [2, '中途退费'],
  [3, '临时停课'],
]);

export const columns: BasicColumn[] = [
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
    title: '姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: 'OJ账号',
    dataIndex: 'studentAccount',
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
    title: '当前学校',
    dataIndex: 'studentSchool',
    width: 140,
  },
  {
    title: '入学年级',
    dataIndex: 'studentEnterGrade',
    width: 140,
  },
  {
    title: '当前年级',
    dataIndex: 'studentCurrentGrade',
    width: 120,
  },
  {
    title: '电话',
    dataIndex: 'studentPhone',
    width: 160,
  },
  {
    title: '家庭地址',
    dataIndex: 'studentAddress',
    ellipsis: true,
    width: 200,
  },
  {
    title: '报名日期',
    dataIndex: 'studentTime',
    width: 160,
  },
  {
    title: '学习状态',
    dataIndex: 'studentStatus',
    customRender: ({ value }) => {
      return statusMap.get(value);
    },
    width: 160,
  },
  {
    title: '备注',
    dataIndex: 'studentNotes',
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
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateStudentName(),
      },
    ],
  },
  {
    field: 'studentSchool',
    label: '当前学校',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        // validator: queryValidateStudentName(),
      },
    ],
  },
];

// 添加学生账户表单
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

export const studentSchema: DescItem[] = [
  {
    field: 'studentNumber',
    label: '学号',
  },
  {
    field: 'studentName',
    label: '姓名',
  },
  {
    label: '性别',
    field: 'studentGender',
  },
  {
    label: '电话',
    field: 'studentPhone',
  },
  {
    label: 'OJ账号',
    field: 'studentAccount',
  },
  {
    field: 'studentSchool',
    label: '当前学校',
  },
  {
    field: 'studentEnterGrade',
    label: '入学年级',
  },
  {
    field: 'studentCurrentGrade',
    label: '当前年级',
  },

  {
    label: '家庭地址',
    field: 'studentAddress',
  },
  {
    label: '备注',
    field: 'studentNotes',
  },
];