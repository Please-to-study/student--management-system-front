import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { isUndefined } from '@/utils/is';

export const validateStudentName = () => {
  return async (_: RuleObject, value: string) => {
    const studentNameRegexr = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;
    // console.log("validateStudentName: ", studentNameRegexr.test(value));
    if (!value) {
      return Promise.reject('请输入学生姓名');
    }
    if (!studentNameRegexr.test(value)) {
      return Promise.reject('请输入正确的学生姓名');
    }
    return Promise.resolve();
  };
};

export const validateStudentPhone = () => {
  return async (_: RuleObject, value: string) => {
    const studentPhoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    // console.log("validateStudentName: ", studentNameRegexr.test(value));
    if (!value) {
      return Promise.reject('请输入电话');
    }
    if (!studentPhoneRegexr.test(value)) {
      return Promise.reject('请输入正确的电话');
    }
    return Promise.resolve();
  };
};

export const queryValidateStudentNumber = () => {
  return async (_: RuleObject, value: string) => {
    const studentNumberRegexr = /^[0-9]{4}[1-2]{1}[0-9]{4}$/;
    if (!isUndefined(value) && value.length && !studentNumberRegexr.test(value)) {
      return Promise.reject('请输入正确的学号');
    }
    return Promise.resolve();
  };
};

export const queryValidateStudentName = () => {
  return async (_: RuleObject, value: string) => {
    const studentNameRegexr = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;
    if (!isUndefined(value) && value.length && !studentNameRegexr.test(value)) {
      return Promise.reject('请输入正确的学生姓名');
    }
    return Promise.resolve();
  };
};

export const queryValidateStudentPhone = () => {
  return async (_: RuleObject, value: string) => {
    const studentPhoneRegexr = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!isUndefined(value) && value.length && !studentPhoneRegexr.test(value)) {
      return Promise.reject('请输入正确的电话');
    }
    return Promise.resolve();
  };
};

export const validatePureNumber = (n: number = 3) => {
  const pureNumberRegexr = new RegExp('^[0-9]{' + n + '}$');
  return async (_: RuleObject, value: string) => {
    // console.log('value is : ', value);
    if (!isUndefined(value) && value.length && !pureNumberRegexr.test(value)) {
      return Promise.reject('请输入正确的学号');
    }
    return Promise.resolve();
  };
};

export const validateStudentId = () => {
  return async (_: RuleObject, value: number) => {
    // console.log('value is : ', value);
    // if (!isUndefined(value)) {
    //   return Promise.resolve();
    // }
    return Promise.resolve();
  };
};
