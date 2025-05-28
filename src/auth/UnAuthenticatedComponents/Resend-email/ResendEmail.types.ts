export interface ResendFnParams {
  user_id: string;
}

export interface ResendEmailProps {
  resendFn: (
    data: ResendFnParams,
    notify?: boolean
  ) => Promise<{ status: number }>;
  btnClass?: string;
}
