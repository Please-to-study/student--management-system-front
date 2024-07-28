import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
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
  },
  {
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'studentPhone',
    label: '电话',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
  },
  {
    field: 'studentName',
    label: '姓名',
    component: 'Input',
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
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
    label: '性别',
    field: 'studentGender',
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
    label: '电话',
    field: 'studentPhone',
    component: 'Input',
    required: true,
  },
  {
    label: 'OJ账号',
    field: 'studentAccount',
    component: 'Input',
  },
  {
    field: 'studentSchool',
    label: '当前学校',
    component: 'Input',
    // required: true,
  },
  {
    field: 'studentEnterGrade',
    label: '入学年级',
    component: 'Input',
    // required: true,
  },
  {
    field: 'studentCurrentGrade',
    label: '当前年级',
    component: 'Input',
    // required: true,
  },

  {
    label: '家庭地址',
    field: 'studentAddress',
    component: 'Input',
    // required: true,
  },
  {
    label: '备注',
    field: 'studentNotes',
    component: 'InputTextArea',
  },
];
