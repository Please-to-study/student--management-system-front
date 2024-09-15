import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
  },
  {
    title: '当前学校',
    dataIndex: 'school',
    width: 140,
  },
  {
    title: '当前年级',
    dataIndex: 'grade',
    width: 120,
  },
  {
    title: '家庭地址',
    dataIndex: 'address',
    width: 200,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 160,
  },
  {
    title: '备注',
    dataIndex: 'notes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
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

export const calendarSchema = {
  '01': [],
  '02': [],
  '03': [],
  '04': [],
  '05': [],
  '06': [],
  '07': [],
  '08': [],
  '09': [],
  '10': [],
  '11': [],
  '12': [],
  '13': [],
  '14': [],
  '15': [],
  '16': [],
  '17': [],
  '18': [],
  '19': [],
  '20': [],
  '21': [],
  '22': [],
  '23': [],
  '24': [],
  '25': [],
  '26': [],
  '27': [],
  '28': [],
  '29': [],
  '30': [],
  '31': [],
};
