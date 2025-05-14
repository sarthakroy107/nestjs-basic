export enum UserRoleEnum {
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export type TUser = {
  id: string;
  name: string;
  age: number;
  role: UserRoleEnum;
  email: string;
};
