import { Staff } from './staff';
import { Status } from './status';
import { Problem } from './problem';
import { Priority } from './priority';
export class Ticket {
  public id: number;
  public solutionDate: Date;
  public problemId: Problem;
  public priorityId: Priority;
  public statusId: Status;
  public staffId: Staff;
}
