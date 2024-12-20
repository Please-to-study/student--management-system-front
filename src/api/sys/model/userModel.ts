/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  identity: number;
}

// 修改密码
export interface UpdatePasswordParams {
  userName: string;
  passwordOld: string;
  passwordNew: string;
  identity: number;
}

export interface UserInfoParams {
  userId: number;
  identity: number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户身份ID
  identity: number;
  // 用户名
  userName: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
