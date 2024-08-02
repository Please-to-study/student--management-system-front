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
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 80,
  },
  {
    title: '电话',
    dataIndex: 'studentPhone',
    width: 120,
  },
  {
    title: '等级',
    dataIndex: 'programRate',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'programNotes',
    width: 200,
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
    field: 'studentNumber',
    label: '学号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// 添加学生账户表单
export const accountFormSchema: FormSchema[] = [
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
          console.log("search value: ",value)
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
    label: '等级',
    field: 'programRate',
    component: 'Input',
    required: true,
  },
  {
    field: 'programNotes',
    label: '备注',
    component: 'InputTextArea',
  },
];
