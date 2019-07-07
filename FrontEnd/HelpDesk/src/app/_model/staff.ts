import { Ticket } from './ticket';
export class Staff {
  public id: number;
  public firtsName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public password: string;
  public joinDate: Date;
  public leftDate: Date;
  public maxTicket: Ticket;
}
