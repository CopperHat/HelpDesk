import { EquipType } from './equipType';
export class Equipment {
  public id: number;
  public aacquisitionDated: Date;
  public retirementDate: Date;
  public code: string;
  public name: string;
  public description: string;
  public manufactureName: string;
  public otherDetails: string;
  public equipTypeId: EquipType;
}
