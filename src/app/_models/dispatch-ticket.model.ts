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
  deposit: number;
  badBill: number;
  dtAtmStatus: string;
}

export class DispatchTicket {
  public dtID?: string;
  public dtResponsiblePersons: ResponsiblePerson[];
  public dtAtms: DtAtm[];
  public dtTechnicianTickets: TechnicianTicket[];
  public dtStatus: string;
  public dtWithdrawBalance: number;
  public created?: Date;
  public updated?: Date;
  public id:string;
  public _id:string;
  constructor() {

  }
}
