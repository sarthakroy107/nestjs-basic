export enum UserRoleEnum {
  EMPLOYEE,
  CLIENT,
  ADMIN,
}

export type TUser = {
  id: string;
  name: string;
  age: number;
  role: UserRoleEnum;
  email: string;
};
