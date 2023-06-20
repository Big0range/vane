import { IUserInfo } from '@/api/system/user/types';

export interface UserState {
  token: string;
  roles: string[];
  perms: string[];
  //
  username?: string;
  avatar?: string;
  phone?: string;
  // 0:未锁屏 1:锁屏
  screenLock?: 0 | 1;
  allUserInfo: Partial<IUserInfo>;
}
