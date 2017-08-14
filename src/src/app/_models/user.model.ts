interface AuthRule {
  isAdmin: boolean;
  isWareHouseManager: boolean;
  isDispatcherManager: boolean;
  isAtmTechnician: boolean;
  isAtmVaulter: boolean;
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
  public fullName:string;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public userPwd: string;
  public isActive: boolean;
  public authRules: AuthRule;
  public userPhones: UserPhone[];
  public userEmails: UserEmail[];
  public created: Date;
  public updated: Date;

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    userPwd: string,
    isActive: boolean,
    created: Date,
    authRules: AuthRule,
    userPhones: UserPhone[],
    userEmails: UserEmail[],
    updated: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.userPwd = userPwd;
    this.isActive = isActive;
    this.authRules = authRules;
    this.userPhones = userPhones;
    this.userEmails = userEmails;
    this.created = created;
    this.updated = updated;

  }

  User() {
    console.log('hello');
  }
}
