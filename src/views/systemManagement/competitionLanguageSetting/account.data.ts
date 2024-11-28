import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'competitionLanguageId',
    width: 120,
  },
  {
    title: '比赛语言名称',
    dataIndex: 'competitionLanguageName',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'competitionLanguageNotes',
    width: 200,
  },
];

// 添加账户
export const competitionLanguageFormSchema: FormSchema[] = [
  {
    field: 'competitionLanguageId',
    label: '',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'competitionLanguageName',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'competitionLanguageNotes',
    component: 'InputTextArea',
  },
];
