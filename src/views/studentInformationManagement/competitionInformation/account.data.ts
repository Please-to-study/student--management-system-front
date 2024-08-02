import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';

export const columns: BasicColumn[] = [
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 140,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 100,
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
  {
    title: '当前年级',
    dataIndex: 'competitionGrade',
    width: 120,
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
    label: '学生姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'competitionName',
    label: '赛事名称',
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
    required: true,
  },
  {
    field: 'studentName',
    component: 'Select',
    label: '姓名',
    componentProps: ({ formModel, formActionType }) => {
      return {
        // --todolist-- getSameStudent获取数据
        showSearch: true,
        placeholder: '请选择学生',
        onSearch: (value) => {
          console.log('search value: ', value);
          let studentOptions = [];
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'studentName',
              componentProps: {
                options: studentOptions,
              },
            },
          ]);
        },
      };
    },
    required: true,
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
    field: 'competitionGrade',
    label: '当前年级',
    component: 'Input',
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
