import { defHttp } from '@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  UserInfoParams,
  UpdatePasswordParams,
} from './model/userModel';

import { ErrorMessageMode } from '#/axios';
import { isUndefined } from '@/utils/is';
import { useUserStore } from '@/store/modules/user';
import { CommonFetchResult } from '@/api/model/baseModel';

// const BASE_URL = 'http://localhost:8080/codeManageSystem';

enum Api {
  Login = '/user/login',
  Logout = '/user/logout',
  RESETPASSWORD = '/user/changePwd',
  GetUserInfo = '/user/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

export enum Identity {
  Student = 2,
  Administrator = 1,
  Teacher = 0,
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      // url: BASE_URL + Api.Login,
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function resetPassword(params: UpdatePasswordParams) {
  return defHttp.post<CommonFetchResult>(
    { url: Api.RESETPASSWORD, params },
    { isTransformResponse: false },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(params: UserInfoParams) {
  // debugger;
  let searchParams: UserInfoParams = {
    userId: -1,
    identity: -1,
  };
  if (isUndefined(params)) {
    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;
    searchParams.userId = userInfo.userId as number;
    searchParams.identity = userInfo.identity;
  } else {
    searchParams = params;
  }
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, params: searchParams },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
