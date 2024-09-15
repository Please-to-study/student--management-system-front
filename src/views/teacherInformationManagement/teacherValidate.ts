import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { isUndefined } from '@/utils/is';

export const validateTeacherName = () => {
  return async (_: RuleObject, value: string) => {
    const teacherNameRegexr = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;
    if (!value) {
      return Promise.reject('请输入教师姓名');
    }
    if (!teacherNameRegexr.test(value)) {
      return Promise.reject('请输入正确的教师姓名');
    }
    return Promise.resolve();
  };
};

export const validateTeacherPhone = () => {
  return async (_: RuleObject, value: string) => {
    const teacherPhoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!value) {
      return Promise.reject('请输入电话');
    }
    if (!teacherPhoneRegexr.test(value)) {
      return Promise.reject('请输入正确的电话');
    }
    return Promise.resolve();
  };
};

export const queryValidateTeacherName = () => {
  return async (_: RuleObject, value: string) => {
    const teacherNameRegexr = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;
    if (!isUndefined(value) && value.length && !teacherNameRegexr.test(value)) {
      return Promise.reject('请输入正确的教师姓名');
    }
    return Promise.resolve();
  };
};

export const queryValidateTeacherPhone = () => {
  return async (_: RuleObject, value: string) => {
    const teacherPhoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!isUndefined(value) && value.length && !teacherPhoneRegexr.test(value)) {
      return Promise.reject('请输入正确的电话');
    }
    return Promise.resolve();
  };
};

export const validatePureNumber = (n: number = 3) => {
  const pureNumberRegexr = new RegExp('^[0-9]{' + n + '}$');
  return async (_: RuleObject, value: string) => {
    if (!isUndefined(value) && value.length && !pureNumberRegexr.test(value)) {
      return Promise.reject('请输入正确的学号');
    }
    return Promise.resolve();
  };
};
