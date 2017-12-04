import { TechnicianTicket } from './technician-ticket.model';
import { User } from './user.model';
import { Atm } from './atm.model';

interface ResponsiblePerson {
  fullName: string;
  userName: string;
  id: string;
}

interface AtmLocation {
  lat: Number;
  lng: Number;

}
interface DtAtm{
  atm: Atm;
  remainingBefore: number;
  actualRemaining:number;
  deposit: number;
  badBill: number;
  dtAtmStatus: string;
  dtRefilledMoney: number;
  dtEstLoadDay:number;
  isSelected:boolean;
}

interface ManualTask{
  taskTitle: string;
  taskDetail: string;
  taskStatus: boolean; 
}

export class DispatchTicket {
  public dtID?: string;
  public dtAssignmentDate: Date;
  public dtResponsiblePersons: ResponsiblePerson[];
  public dtAtms: DtAtm[];
  public dtTechnicianTickets: TechnicianTicket[];
  public dtManualTasks: ManualTask[];
  public dtStatus: string;
  public dtWithdrawBalance: number;
  public created?: Date;
  public updated?: Date;
  public id:string;
  public _id:string;
  constructor() {

  }
}
