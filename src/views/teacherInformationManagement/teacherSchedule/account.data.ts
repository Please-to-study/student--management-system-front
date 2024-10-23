import { FormSchema } from "@/components/Form";

export const badgeColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

export const enum MODE {
  MONTH = 'month',
  YEAR = 'year',
}

export const searchFormSchema: FormSchema[] = [
  {
    label: '任课老师',
    field: 'teacherId',
    slot: 'teacherSearch',
    colProps: { span: 6 },
  },
];
