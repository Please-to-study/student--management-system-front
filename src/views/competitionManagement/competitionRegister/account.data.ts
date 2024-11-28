import { BasicColumn, FormSchema } from '@/components/Table';
import { getCompetitionList } from '@/api/competitionManagement/competitionManagement';
import { DescItem } from '@/components/Description';
import { formatToDate, formatToDateTime } from '@/utils/dateUtil';

const genderMap = new Map([
  ['1', '男'],
  ['2', '女'],
]);

export const columns: BasicColumn[] = [
  {
    title: '比赛预报名ID',
    dataIndex: 'competitionRegisterId',
    width: 120,
    ifShow: false,
  },
  {
    title: '赛事ID',
    dataIndex: 'competitionId',
    width: 120,
    ifShow: false,
  },
  {
    title: '赛事名称',
    dataIndex: 'competitionName',
    width: 120,
  },
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
    width: 120,
  },
  {
    title: '赛事组别',
    dataIndex: 'competitionGroup',
    width: 120,
  },
  {
    title: '赛事年度',
    dataIndex: 'competitionYear',
    width: 120,
  },
  {
    title: '当前年级',
    dataIndex: 'studentCurrentGrade',
    width: 120,
  },
  {
    title: '比赛日期',
    dataIndex: 'competitionDate',
    customRender: ({ value }) => {
      return formatToDate(value);
    },
    width: 120,
  },
  {
    title: '赛事介绍',
    dataIndex: 'introduce',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'competitionRegisterNotes',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'competitionName',
    label: '赛事名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 6 },
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

// 比赛预报名表单
export const accountFormSchema: FormSchema[] = [
  {
    label: '比赛预报名ID',
    field: 'competitionRegisterId',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'competitionId',
    label: '赛事名称',
    component: 'ApiSelect',
    componentProps: {
      api: getCompetitionList,
      params: {
        competitionName: '',
        competitionLanguage: '',
        competitionYear: '',
        isFuture: true,
      },
      resultField: 'items',
      labelField: 'competitionLabel',
      valueField: 'competitionId',
    },
    required: true,
  },
  {
    label: '参赛学生',
    field: 'studentId',
    slot: 'studentSearch',
    // rules: [
    //   {
    //     required: true,
    //     validator: async (_, value) => {
    //       console.log('validator value is ', value);
    //       if (isUndefined(value)) {
    //         // return Promise.resolve();
    //         return Promise.reject('学生不能为空');
    //       }
    //       return Promise.resolve();
    //     },
    //     trigger: 'change',
    //   },
    // ],
  },
  {
    label: '备注',
    field: 'competitionRegisterNotes',
    component: 'InputTextArea',
  },
];

export const competitionRegisterSchema: DescItem[] = [
  {
    label: '比赛预报名ID',
    field: 'competitionRegisterId',
  },
  {
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '性别',
    field: 'studentGender',
    render: (value) => {
      return genderMap.get(value);
    },
  },
  {
    label: '赛事组别',
    field: 'competitionGroup',
  },
  {
    label: '赛事年度',
    field: 'competitionYear',
  },
  {
    label: '当前年级',
    field: 'studentCurrentGrade',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
    render: (value) => {
      return formatToDate(value);
    },
  },
  {
    label: '赛事介绍',
    field: 'introduce',
  },
  {
    label: '备注',
    field: 'competitionRegisterNotes',
  },
];
