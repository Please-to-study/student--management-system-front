import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
  },
  {
    title: '布置教师',
    dataIndex: 'teacherName',
    width: 120,
  },
  {
    title: '资料类型',
    dataIndex: 'materialsStyle',
    width: 120,
  },
  {
    title: '作业题目',
    dataIndex: 'materialsTitle',
    width: 200,
  },
  {
    title: '作业介绍',
    dataIndex: 'materialsIntroduce',
    width: 200,
  },
  {
    title: '日期',
    dataIndex: 'materialsDate',
    width: 140,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'materialsTitle',
    label: '作业题目',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
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
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '性别',
    field: 'gender',
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
    field: 'school',
    label: '当前学校',
    component: 'Input',
    // required: true,
  },
  {
    field: 'grade',
    label: '当前年级',
    component: 'Input',
    // required: true,
  },

  {
    label: '家庭地址',
    field: 'address',
    component: 'Input',
    // required: true,
  },
  {
    label: '电话',
    field: 'phone',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'notes',
    component: 'InputTextArea',
  },
];

