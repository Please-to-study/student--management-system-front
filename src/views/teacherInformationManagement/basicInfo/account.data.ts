import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

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
    colProps: { span: 8 },
  },
  {
    field: 'teacherPhone',
    label: '教师电话',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加教师账户
export const accountFormSchema: FormSchema[] = [
  {
    field: 'teacherName',
    label: '教师姓名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   trigger: 'blur',
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       if (!value) return resolve();
      //       isAccountExist(value)
      //         .then(resolve)
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'teacherPhone',
    label: '联系电话',
    component: 'Input',
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
