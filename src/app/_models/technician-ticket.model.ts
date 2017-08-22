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
  public tTicketCreatedBy?: any;
  public tTicketResponsiblePerson: ResponsiblePerson;
  public tTicketStatus: string;
  public tTicketRepairedParts?: [any];
  public atmMachine?: any
  public updated?: Date
  constructor() {
    this.tTicketResponsiblePerson = {
      fullName: "",
      id: "",
      userName: ""
    }
  }
}
