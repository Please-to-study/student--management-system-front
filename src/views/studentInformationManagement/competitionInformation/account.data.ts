import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 120,
  },
  {
    title: '学生电话',
    dataIndex: 'studentPhone',
    width: 120,
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
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    label: '学生姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'competitionName',
    label: '赛事名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    label: '学生姓名',
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
    field: 'studentPhone',
    label: '电话',
    component: 'Input',
    required: true,
  },
  {
    label: '赛事名称',
    field: 'competitionName',
    component: 'Select',
    componentProps: {

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
    component: 'Input',
    required: true,
  },
  {
    field: 'competitionLanguage',
    label: '比赛语言',
    component: 'Input',
    required: true,
  },
  {
    field: 'competitionDate',
    label: '比赛日期',
    component: 'Input',
    required: true,
  },
  {
    label: '比赛类型',
    field: 'competitionStyle',
    component: 'Input',
  },
  {
    label: '主办方',
    field: 'competitionHost',
    component: 'Input',
  },
  {
    label: '报名方式',
    field: 'competitionRegister',
    component: 'Input',
  },
];
