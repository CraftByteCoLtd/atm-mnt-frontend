interface AuthRule {
  isAdmin: boolean;
  isWareHouseManager: boolean;
  isDispatcherManager: boolean;
  isAtmTechnician: boolean;
  isAtmVaulter: boolean;
  isTreasurer:boolean;
}

interface UserEmail {
  email: string;
  desc: string;
}

interface UserPhone {
  number: string;
  desc: string;
}

export class User {
  public fullName?:string;
  public firstName?: string;
  public lastName?: string;
  public userName?: string;
  public userPwd?: string;
  public isActive?: boolean;
  public authRules?: AuthRule;
  public userPhones?: UserPhone[];
  public userEmails?: UserEmail[];
  public created: Date;
  public updated: Date;
  constructor() {
  }
}
