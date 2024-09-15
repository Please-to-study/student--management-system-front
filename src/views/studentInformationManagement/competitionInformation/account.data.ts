import { getAllRoleList, isAccountExist } from '@/api/demo/system';
import { BasicColumn, FormSchema } from '@/components/Table';
import { AccountListItem } from '@/api/demo/model/systemModel';
import {
  queryValidateStudentName,
  queryValidateStudentNumber,
  validateStudentPhone,
} from '@/views/studentInformationManagement/studentValidate';
import { getAllCourseInfoList } from '@/api/courseInformationManagement/courseInformationManagement';
import { getAllCompetitionList } from '@/api/competitionManagement/competitionManagement';
import { ref, unref } from 'vue';
import { getSameStudent } from '@/api/studentInformationManagement/studentInformationManagement';
import { DescItem } from "@/components/Description";

export const columns: BasicColumn[] = [
  {
    title: '学号',
    dataIndex: 'studentNumber',
    width: 140,
  },
  {
    title: '学生ID',
    dataIndex: 'studentId',
    width: 100,
    ifShow: false,
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 100,
  },
  // {
  //   title: '学生电话',
  //   dataIndex: 'studentPhone',
  //   width: 120,
  // },
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
    dataIndex: 'studentCurrentGrade',
    width: 120,
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
    label: '学生姓名',
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
    field: 'competitionName',
    label: '赛事名称',
    component: 'ApiSelect',
    // resultField: ''
    componentProps: {
      api: getAllCompetitionList,
      // api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'competitionName',
      valueField: 'competitionId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    colProps: { span: 6 },
  },
];

// 添加参赛信息表单
export const accountFormSchema: FormSchema[] = [
  {
    field: 'studentName',
    component: 'Select',
    label: '学生姓名',
    componentProps: ({ formModel, formActionType }) => {
      const studentOptions = ref<any[]>([]);
      return {
        // --todolist-- getSameStudent获取数据
        options: unref(studentOptions),
        showSearch: true,
        placeholder: '请选择学生',
        onSearch: async (value) => {
          console.log('search value: ', value);
          const { result } = await getSameStudent(value);
          studentOptions.value = result.items;
        },
      };
    },
    required: true,
  },
  // {
  //   field: 'studentPhone',
  //   label: '电话',
  //   component: 'Input',
  //   rules: [
  //     {
  //       required: true,
  //       message: '请输入电话',
  //     },
  //     {
  //       trigger: 'blur',
  //       validator: validateStudentPhone(),
  //     },
  //   ],
  // },
  {
    field: 'competitionName',
    label: '赛事名称',
    component: 'ApiSelect',
    // resultField: ''
    componentProps: {
      api: getAllCompetitionList,
      // api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'competitionName',
      valueField: 'competitionId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
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
    component: 'InputNumber',
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
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
    },
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

export const competitionInfoSchema: DescItem[] = [
  {
    label: '学号',
    field: 'studentNumber',
  },
  {
    label: '学生姓名',
    field: 'studentName',
  },
  {
    label: '学生电话',
    field: 'studentPhone',
  },
  {
    label: '赛事名称',
    field: 'competitionName',
  },
  {
    label: '获奖情况',
    field: 'competitionHonor',
  },
  {
    label: '比赛分数',
    field: 'competitionScore',
  },
  {
    label: '比赛类型',
    field: 'competitionStyle',
  },
  {
    label: '主办方',
    field: 'competitionHost',
  },
  {
    label: '报名方式',
    field: 'competitionRegister',
  },
  {
    label: '比赛语言',
    field: 'competitionLanguage',
  },
  {
    label: '比赛日期',
    field: 'competitionDate',
  },
  {
    label: '当前年级',
    field: 'competitionGrade',
  },
];
