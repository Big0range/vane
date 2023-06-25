type WebError = Error & { status?: number; data?: any };
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    // md5 加密盐
    MD5_SALT: string;
    // mysql 配置
    MYSQL_DATABASE: string;
    MYSQL_COMM_ALERT: string;
    MYSQL_HOST: string;
    MYSQL_PORT: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    // redis 配置
    REDIS_DB: string;
    REDIS_PORT: string;
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    SESSION_SECRET: string;
    SESSION_EXPIRE: string;
    // jwt 配置
    PRIVATE_KEY: string;
    PUBLIC_KEY: string;
    TOKEN_TYPE: string;
    // cos 配置
    COS_SECRET_ID: string;
    COS_SECRET_KEY: string;
    COS_REGION: string;
    COS_BUCKET: string;
    //
    pm_id: string;
    NODE_APP_INSTANCE: string;
  }
}
interface PageQueryParam {
  page?: number;
  pageSize?: number;
}

type PromiseReturnType<T extends (...arg: any) => Promise<unknown>> = Awaited<
  ReturnType<T>
>;
