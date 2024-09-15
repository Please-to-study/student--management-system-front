import { BasicColumn, FormSchema } from '@/components/Table';
import {
  queryValidateTeacherName,
  queryValidateTeacherPhone,
  validateTeacherName,
  validateTeacherPhone,
} from '@/views/teacherInformationManagement/teacherValidate';
import { DescItem } from '@/components/Description';

export const columns: BasicColumn[] = [
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '联系电话',
    dataIndex: 'teacherPhone',
    width: 140,
  },
  {
    title: '性别',
    dataIndex: 'teacherGender',
    width: 80,
  },
  {
    title: '家庭地址',
    dataIndex: 'teacherAddress',
    width: 200,
  },
  {
    title: '密码',
    dataIndex: 'teacherPassword',
    width: 120,
  },
  {
    title: '教授课程',
    dataIndex: 'teacherCourse',
    width: 120,
  },
  {
    title: '签约形式(全职，兼职)',
    dataIndex: 'teacherSigning',
    width: 200,
  },
  {
    title: '课时费计算方式',
    dataIndex: 'teacherPayStyle',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'teacherNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateTeacherName(),
      },
    ],
  },
  {
    field: 'teacherPhone',
    label: '教师电话',
    component: 'Input',
    colProps: { span: 6 },
    rules: [
      {
        trigger: 'blur',
        validator: queryValidateTeacherPhone(),
      },
    ],
  },
];

// 添加教师账户
export const accountFormSchema: FormSchema[] = [
  {
    field: 'teacherId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入教师姓名',
      },
      {
        trigger: 'blur',
        validator: validateTeacherName(),
      },
    ],
  },
  {
    field: 'teacherPhone',
    label: '联系电话',
    component: 'InputNumber',
    rules: [
      {
        required: true,
        message: '请输入电话',
      },
      {
        trigger: 'blur',
        validator: validateTeacherPhone(),
      },
    ],
    required: true,
  },
  {
    field: 'teacherPassword',
    label: '密码',
    component: 'Input',
    required: true,
    defaultValue: '123456',
  },
  {
    label: '性别',
    field: 'teacherGender',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: '1',
          key: '1',
        },
        {
          label: '女',
          value: '2',
          key: '2',
        },
      ],
    },
    required: true,
  },
  {
    field: 'teacherAddress',
    label: '家庭地址',
    component: 'Input',
    // required: true,
  },
  // todolist 签约形式和课时费计算相关联，前端写死还是通过api获取？
  {
    field: 'teacherSigning',
    label: '签约形式',
    component: 'Select',
    required: true,
  },

  {
    label: '课时费计算',
    field: 'teacherPayStyle',
    component: 'Select',
    required: true,
  },
  {
    label: '备注',
    field: 'teacherNotes',
    component: 'InputTextArea',
  },
];

export const teacherInfoSchema: DescItem[] = [
  {
    label: '教师姓名',
    field: 'teacherName',
  },
  {
    label: '联系电话',
    field: 'teacherPhone',
  },
  {
    label: '性别',
    field: 'teacherGender',
  },
  {
    label: '家庭地址',
    field: 'teacherAddress',
  },
  {
    label: '密码',
    field: 'teacherPassword',
  },
  {
    label: '教授课程',
    field: 'teacherCourse',
  },
  {
    label: '签约形式(全职，兼职)',
    field: 'teacherSigning',
  },
  {
    label: '课时费计算方式',
    field: 'teacherPayStyle',
  },
  {
    label: '备注',
    field: 'teacherNotes',
  },
];
