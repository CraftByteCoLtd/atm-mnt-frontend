import { Part } from './part.model';
import { User } from './user.model';


interface ResponsiblePerson {
  fullName: string;
  userName: string;
  id: string;
}

export class TechnicianTicket {
  public tTicketID?: string;
  public tTicketCreated?: Date;
  public tTicketSymptom?: string;
  public tTicketSolution?: string;
  public tTicketCreatedBy: User;
  public tTicketResponsiblePerson: ResponsiblePerson;
  public tTicketStatus: string;
  public tTicketRepairedPart?: Part;
  public atmMachineID: any;
  public updated?: Date;
  public id:string;
  constructor() {
    this.tTicketResponsiblePerson = {
      fullName: "",
      id: "",
      userName: ""
    }
  }
}
