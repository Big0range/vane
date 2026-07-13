type WebError = Error & { status?: number; data?: any };
interface PageQueryParam {
  page?: number;
  pageSize?: number;
}

type PromiseReturnType<T extends (...arg: any) => Promise<unknown>> = Awaited<
  ReturnType<T>
>;

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

type Ids = (string | number)[] | number | string;
