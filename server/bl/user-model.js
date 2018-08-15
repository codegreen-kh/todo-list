import * as db from '../utils/DBUtils';

export class UserModel {
  constructor(id, firstName, lastName, email, password){
    this.id = id;
    this.firstName = firstName ? firstName.trim() : null;
    this.lastName = lastName ? lastName.trim() : null;
    this.email = email ? email.trim().toLowerCase() : null;
    this.password = password;
  }

  async validate() {
    let errors = [];

    if(!this.firstName || !this.firstName.trim()) {
      errors.push('First name is empty.');
    }

    if(!this.lastName || !this.lastName.trim()) {
      errors.push('Last name is empty.');
    }

    if(!this.email || !this.email.trim()) {
      errors.push('Email field is empty.');
    } else if(!validateEmail(this.email)) {
      errors.push('Email is not valid.')
    } else if(await isRegistered(this.email)) {
      errors.push('User is already registered.');
    }

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    async function isRegistered(email) {
      let doc = await db.findUserByEmail(email);
      console.log(doc);
      return doc != null;
    }

    if(!this.password || !this.password.trim()) {
      errors.push('Password field is empty.');
    }

    return errors;
  };

  save() {
    let res = db.createUser(this);
    this.id = res.id;
  };

  static async findUser(email) {
    let user = await db.findUserByEmail(email);
    return user;
  };

}