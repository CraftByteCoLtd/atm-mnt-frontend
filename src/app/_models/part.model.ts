export class Part {
  public partID?:string;
  public partDetail?: string;
  public partType?: string;
  public partStock?: number;
  public partPrice?: number;
  public partSerialNumber?: string;
  public atmMachineID?: string;
  public created: Date;
  public updated: Date;
  constructor() {
  }
}
