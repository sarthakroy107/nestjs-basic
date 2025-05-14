import { TUser, UserRoleEnum } from 'src/user/user.model';

// eslint-disable-next-line prefer-const
export let data: TUser[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    age: 28,
    role: UserRoleEnum.EMPLOYEE,
    email: 'alice.johnson@example.com',
  },
  {
    id: '2',
    name: 'Bob Smith',
    age: 35,
    role: UserRoleEnum.CLIENT,
    email: 'bob.smith@example.com',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    age: 42,
    role: UserRoleEnum.ADMIN,
    email: 'charlie.brown@example.com',
  },
  {
    id: '4',
    name: 'Diana Prince',
    age: 30,
    role: UserRoleEnum.EMPLOYEE,
    email: 'diana.prince@example.com',
  },
  {
    id: '5',
    name: 'Ethan Clark',
    age: 26,
    role: UserRoleEnum.CLIENT,
    email: 'ethan.clark@example.com',
  },
  {
    id: '6',
    name: 'Fiona Davis',
    age: 38,
    role: UserRoleEnum.ADMIN,
    email: 'fiona.davis@example.com',
  },
  {
    id: '7',
    name: 'George Miller',
    age: 24,
    role: UserRoleEnum.EMPLOYEE,
    email: 'george.miller@example.com',
  },
  {
    id: '8',
    name: 'Hannah Lee',
    age: 29,
    role: UserRoleEnum.CLIENT,
    email: 'hannah.lee@example.com',
  },
  {
    id: '9',
    name: 'Ian Moore',
    age: 33,
    role: UserRoleEnum.EMPLOYEE,
    email: 'ian.moore@example.com',
  },
  {
    id: '10',
    name: 'Julia Adams',
    age: 40,
    role: UserRoleEnum.ADMIN,
    email: 'julia.adams@example.com',
  },
];
