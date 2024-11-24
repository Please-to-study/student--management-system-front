export type AddPayInfoParams = {
  courseCategoryId: number;
  studentId: number;
  payeeName: string;
  courseNumber: number;
  courseFee: number;
  otherFee: number;
  payPreferential: number;
  payableFee: number;
  actuallyFee: number;
  payStyle: string;
  payNotes: string | null;
};

export type QueryPayInfoParams = {
  studentNumber: string;
  studentId: number;
  courseCategoryId: number;
};

export type UpdatePayInfoParams = AddPayInfoParams & {
  payId: number;
};
