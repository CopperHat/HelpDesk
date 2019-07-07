import { UserType } from './userType';
export class User {
  public id: number;
  public firtsName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phone: string;
  public userTypeId: UserType;
}
