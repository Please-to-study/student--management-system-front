import { BasicColumn, FormSchema } from '@/components/Table';
import {
  validateStudentPhone,
  queryValidateStudentNumber,
  queryValidateStudentName,
} from '@/views/studentInformationManagement/studentValidate';
import {
  getAllCourseInfoList,
  getSpecialCourseInfoList,
} from '@/api/courseInformationManagement/courseInformationManagement';
import { ref, unref } from "vue";
import { getSameStudent } from "@/api/studentInformationManagement/studentInformationManagement";
import { DescItem } from "@/components/Description";

export const columns: BasicColumn[] = [
  {
    title: '缴费ID',
    dataIndex: 'payId',
    width: 120,
    ifShow: false,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    width: 120,
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
    title: '缴费时间',
    dataIndex: 'payTime',
    width: 120,
  },
  {
    title: '单价',
    dataIndex: 'payPrice',
    width: 120,
  },
  {
    title: '课时',
    dataIndex: 'courseTime',
    width: 120,
  },
  {
    title: '优惠',
    dataIndex: 'payPreferential',
    width: 120,
  },
  {
    title: '应缴金额',
    dataIndex: 'payableFee',
    width: 120,
  },
  {
    title: '实付费用',
    dataIndex: 'actuallyPay',
    width: 120,
  },
  {
    title: '其他费用',
    dataIndex: 'otherFee',
    width: 120,
  },
  {
    title: '支付方式',
    dataIndex: 'payStyle',
    width: 120,
  },
  {
    title: '收款人',
    dataIndex: 'payee',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'payNotes',
    width: 200,
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
    label: '姓名',
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
    field: 'courseName',
    label: '课程名称',
    component: 'ApiSelect',
    // resultField: ''
    componentProps: {
      api: getAllCourseInfoList,
      // api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'courseName',
      valueField: 'courseId',
      // labelField: 'roleName',
      // valueField: 'roleValue',
    },
    colProps: { span: 6 },
  },
];

// 新增缴费信息表单
export const accountFormSchema: FormSchema[] = [
  {
    // 单价和课时与课程名称相关联，选定课程自动填充不可更改
    field: 'courseName',
    label: '课程名称',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: getAllCourseInfoList,
        // options: getAllCourseInfoList,
        placeholder: '请选择课程',
        labelField: 'courseName',
        valueField: 'courseId',
        onChange: async (e: any) => {
          // if (!isUndefined(e)) {
          //   // --todolist--  根据e.courseId 拿到
          //   const { result } = getSpecialCourseInfoList({ courseId: e.courseId, courseAddress: ''});
          // }
          const { result } = await getSpecialCourseInfoList({
            courseId: e.courseId,
            courseAddress: '',
          });
          formModel.courseTime = result.courseTime;
          formModel.payPrice = result.payPrice;
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'courseTime',
              componentProps: {
                disabled: true,
              },
            },
            {
              field: 'payPrice',
              componentProps: {
                disabled: true,
              },
            },
          ]);
        },
      };
    },
    required: true,
  },
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
  {
    field: 'studentPhone',
    label: '电话',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入电话',
      },
      {
        trigger: 'blur',
        validator: validateStudentPhone(),
      },
    ],
  },
  {
    field: 'payPrice',
    label: '单价',
    component: 'InputNumber',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee = formModel.payPrice * formModel.courseTime - formModel.payPreferential - formModel.otherFee;
        },
      };
    },
    // defaultValue: 100,
  },
  {
    field: 'courseTime',
    label: '课时',
    component: 'InputNumber',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee = formModel.payPrice * formModel.courseTime - formModel.payPreferential - formModel.otherFee;
        },
      };
    },
    // defaultValue: 1,
  },
  {
    field: 'payPreferential',
    label: '优惠',
    component: 'InputNumber',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee = formModel.payPrice * formModel.courseTime - formModel.payPreferential - formModel.otherFee;
        },
      };
    },
    // defaultValue: 10,
  },
  {
    field: 'otherFee',
    label: '其他费用',
    component: 'InputNumber',
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.payableFee = formModel.payPrice * formModel.courseTime - formModel.payPreferential - formModel.otherFee;
        },
      };
    },
  },
  // 实付费用自己输入、应缴金额动态计算
  {
    field: 'payableFee',
    label: '应缴金额',
    component: 'InputNumber',
    componentProps: {
      prefix: '￥',
      bordered: false,
      disabled: true,
      // allowClear: false,
    },
    required: true,
  },
  {
    field: 'actuallyPay',
    label: '实付费用',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'payStyle',
    label: '支付方式',
    component: 'Input',
    required: true,
  },
  {
    field: 'payee',
    label: '收款人',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'payNotes',
    component: 'InputTextArea',
  },
];

export const spendingSchema: DescItem[] = [
  {
    label: '缴费ID',
    field: 'payId',
  },
  {
    label: '课程名称',
    field: 'courseName',
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
    label: '缴费时间',
    field: 'payTime',
  },
  {
    label: '单价',
    field: 'payPrice',
  },
  {
    label: '课时',
    field: 'courseTime',
  },
  {
    label: '优惠',
    field: 'payPreferential',
  },
  {
    label: '应缴金额',
    field: 'payableFee',
  },
  {
    label: '实付费用',
    field: 'actuallyPay',
  },
  {
    label: '其他费用',
    field: 'otherFee',
  },
  {
    label: '支付方式',
    field: 'payStyle',
  },
  {
    label: '收款人',
    field: 'payee',
  },
  {
    label: '备注',
    field: 'payNotes',
  },
];

