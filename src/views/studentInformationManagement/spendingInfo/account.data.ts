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
    field: 'studentName',
    label: '学生姓名',
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
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];

// 新增缴费信息表单
export const accountFormSchema: FormSchema[] = [
  {
    // 单价和课时与课程名称相关联，选定课程自动填充不可更改
    field: 'courseName',
    label: '课程名称',
    component: 'Select',
    componentProps: ({ formModel, formActionType }) => {
      return {
        // options: getCourseList,
        placeholder: '请选择课程',
        onChange: (e: any) => {
          // console.log(e)
          if (e === undefined) {
            // --todolist--
          }
          let courseTimeOptions = [];
          let payPriceOptions = [];
          formModel.courseTime = undefined; //  reset city value
          formModel.payPrice = undefined;
          const { updateSchema } = formActionType;
          updateSchema([
            {
              field: 'courseTime',
              componentProps: {
                options: courseTimeOptions,
              },
            },
            {
              field: 'payPrice',
              componentProps: {
                options: payPriceOptions,
              },
            },
          ]);
        },
      };
    },
    required: true,
  },
  {
    field: 'courseId',
    label: '课程id',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      // --todolist--  更改对应字段
      labelField: 'courseName',
      valueField: 'courseId',
    },
    required: true,
    ifShow: false,
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
    field: 'payPrice',
    label: '单价',
    component: 'Input',
    required: true,
    // defaultValue: 100,
  },
  {
    field: 'courseTime',
    label: '课时',
    component: 'Input',
    required: true,
    // defaultValue: 1,
  },
  {
    field: 'payPreferential',
    label: '优惠',
    component: 'Input',
    required: true,
    // defaultValue: 10,
  },
  {
    field: 'otherFee',
    label: '其他费用',
    component: 'Input',
    required: true,
    // defaultValue: 5,
  },
  // 实付费用自己输入、应缴金额动态计算
  {
    field: 'payableFee',
    label: '应缴金额',
    component: 'Input',
    componentProps: {
      prefix: '￥',
      bordered: false,
      allowClear: false,
    },
    required: true,
  },
  {
    field: 'actuallyPay',
    label: '实付费用',
    component: 'Input',
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

export const data: AccountListItem[] = [
  {
    id: '0',
    account: 'Jason',
    email: 'm.bwiszgfvjp@pjzccoin.ru',
    nickname: '邱霞',
    role: 'Ruth',
    createTime: '1994-04-03 02:18:29',
    remark: '至术响其快称相多质起月三水或正',
    dept: 0,
    status: '1',
  },
  {
    id: '1',
    account: 'Kevin',
    email: 'w.nqhjwvbm@wvxr.st',
    nickname: '程丽',
    role: 'Edward',
    createTime: '2017-02-18 15:59:42',
    remark: '家别保指品物角路王专',
    dept: 0,
    status: '1',
  },
  {
    id: '2',
    account: 'Susan',
    email: 's.tkp@fxwha.uy',
    nickname: '谭平',
    role: 'Kevin',
    createTime: '1996-02-28 18:43:51',
    remark: '事为样复西局族南养号交国斗说部队记也按西',
    dept: 1,
    status: '1',
  },
  {
    id: '3',
    account: 'Brian',
    email: 'n.crv@mudxsqlfq.ro',
    nickname: '邱洋',
    role: 'Sarah',
    createTime: '1974-09-23 11:23:34',
    remark: '后引条了持内证器代采火行',
    dept: 0,
    status: '1',
  },
  {
    id: '4',
    account: 'David',
    email: 'h.nqiwjklrsr@zbfkz.an',
    nickname: '曹强',
    role: 'Mark',
    createTime: '2020-12-26 08:06:06',
    remark: '月半快实革产一世群设军法改商以个段革',
    dept: 1,
    status: '0',
  },
  {
    id: '5',
    account: 'Matthew',
    email: 'e.pxvfz@orptfexwn.gb',
    nickname: '易杰',
    role: 'Deborah',
    createTime: '1997-07-08 17:32:30',
    remark: '民科属交值员见价两品质要约',
    dept: 0,
    status: '1',
  },
  {
    id: '6',
    account: 'George',
    email: 'm.yscygfxy@fftslpdd.kr',
    nickname: '龚军',
    role: 'Susan',
    createTime: '2017-02-21 21:14:14',
    remark: '同七口即里局消名样情却此心你团通',
    dept: 1,
    status: '0',
  },
  {
    id: '7',
    account: 'Robert',
    email: 'n.gergpy@hujc.cv',
    nickname: '徐娜',
    role: 'Jeffrey',
    createTime: '2024-04-28 12:58:40',
    remark: '济现后张产细色马更品理强米行节集月',
    dept: 1,
    status: '0',
  },
  {
    id: '8',
    account: 'Mark',
    email: 'c.ibhhkpi@bybctabuxg.nu',
    nickname: '史艳',
    role: 'Brenda',
    createTime: '2000-08-23 00:43:57',
    remark: '有在须装务路活且为理内制技器五海号利进',
    dept: 0,
    status: '1',
  },
  {
    id: '9',
    account: 'Kimberly',
    email: 'x.ybv@gyxk.ec',
    nickname: '龙芳',
    role: 'George',
    createTime: '1997-04-04 00:08:50',
    remark: '性好真革计议根工速叫再快身计',
    dept: 1,
    status: '1',
  },
  {
    id: '6',
    account: 'George',
    email: 'm.yscygfxy@fftslpdd.kr',
    nickname: '龚军',
    role: 'Susan',
    createTime: '2017-02-21 21:14:14',
    remark: '同七口即里局消名样情却此心你团通',
    dept: 1,
    status: '0',
  },
  {
    id: '7',
    account: 'Robert',
    email: 'n.gergpy@hujc.cv',
    nickname: '徐娜',
    role: 'Jeffrey',
    createTime: '2024-04-28 12:58:40',
    remark: '济现后张产细色马更品理强米行节集月',
    dept: 1,
    status: '0',
  },
  {
    id: '8',
    account: 'Mark',
    email: 'c.ibhhkpi@bybctabuxg.nu',
    nickname: '史艳',
    role: 'Brenda',
    createTime: '2000-08-23 00:43:57',
    remark: '有在须装务路活且为理内制技器五海号利进',
    dept: 0,
    status: '1',
  },
  {
    id: '9',
    account: 'Kimberly',
    email: 'x.ybv@gyxk.ec',
    nickname: '龙芳',
    role: 'George',
    createTime: '1997-04-04 00:08:50',
    remark: '性好真革计议根工速叫再快身计',
    dept: 1,
    status: '1',
  },
];
