import { Equipment } from './equipment';
import { User } from './user';
export class Problem {
  public id: number;
  public reportDate: Date;
  public description: string;
  public userId: User;
  public equipId: Equipment;
}
