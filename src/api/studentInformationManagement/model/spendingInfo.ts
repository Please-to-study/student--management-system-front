export type AddSpendingInfoParams = {
  courseId: string;
  studentName: string;
  studentPhone: string;
  payPrice: number;
  courseTime: number;
  payPreferential: number;
  otherFee: number;
  payableFee: number;
  actuallyPay: number;
  payStyle: string;
  payee: string;
  payNotes: string | null;
};

export type QuerySpendingInfoParams = {
  studentNumber: string;
  studentName: string;
  courseId: string;
};
