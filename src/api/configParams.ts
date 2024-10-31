// 教师签约形式 config
export type AddSigningStyleParams = {
  signingName: string;
  payStyleName: string;
  signingNotes: string | null;
};

export type UpdateSigningStyleParams = AddSigningStyleParams & {
  signingId: number;
};

// 课时费计算方式 config
export type AddTeacherPayStyleParams = {
  teacherPayStyleName: string;
  basicSalary: number;
  teacherSpecialStyle: number;
  teacherPayStyleNotes: string | null;
};

export type UpdateTeacherPayStyleParams = AddTeacherPayStyleParams & {
  teacherPayStyleId: number;
};

// 课程类别表 config
export type AddCourseCategoryParams = {
  courseCategoryName: string;
  courseCategoryNotes: string | null;
};

export type UpdateCourseCategoryParams = AddCourseCategoryParams & {
  courseCategoryId: number;
};

// 比赛类型表 config
export type AddCompetitionStyleParams = {
  competitionStyleName: string;
  competitionStyleNotes: string | null;
};

export type UpdateCompetitionStyleParams = AddCompetitionStyleParams & {
  competitionStyleId: number;
};

// 权限设置 config
export type AddAdministratorParams = {
  administratorName: string;
  administratorGender: number;
  administratorAddress: string;
  administratorPassword: string;
  administratorPhone: string;
  status: number;
  administratorNotes: string | null;
};

export type UpdateAdministratorParams = AddAdministratorParams & {
  administratorId: number;
};

export type QueryAdministratorParams = {
  administratorName: string;
  status: number;
};

export type SetAdministratorStatusParams = {
  administratorId: number;
  status: number;
};
