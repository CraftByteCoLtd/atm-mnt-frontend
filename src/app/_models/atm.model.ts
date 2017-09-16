interface atmLocation {
  lat: Number;
  lng: Number;

}

interface atmUpdatedBy {
  fullName: string;
}


export class Atm {
  public atmMachineID?:string;
  public atmBalance?: Number;
  public atmNote?: string;
  public atmStatus?: string;
  public atmLocation?: atmLocation;
  public atmUpdatedBy?: atmUpdatedBy;
  public created?: Date;
  public updated?: Date;

  constructor() {
  }
}
