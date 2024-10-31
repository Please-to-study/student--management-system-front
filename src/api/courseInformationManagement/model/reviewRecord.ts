export type QueryReviewRecordParams = {
  studentId: number;
  learningRecordDate: string;
  courseName: string;
  teacherName: string;
};

export type IdentityReviewRecordParams = {
  learningRecordId: number;
  administratorId: number;
  reviewRecordContent: string;
};

export type IdentityReviewRecordList = IdentityReviewRecordParams[];
