import { ItemSaveSettings } from "dynamoose/dist/Item";
import Model from "../../models";
import { validateGetUserById, validateListUserByDateJoined, validateUserObj } from "./validate";
import { promisifyCallback } from "../../util/promiseUtil";

class User {
  async getUserById(id: string) {
    const payload = await validateGetUserById({ id });
    const user = await Model.User.query("id").eq(payload.id).exec();
    return user[0];
  }

  async saveUser(param: any) {
    const userObj = await validateUserObj(param);
    const user = new Model.User(userObj);
    const saveOpt: ItemSaveSettings = { overwrite: false };
    const savedUserObj = await promisifyCallback(user.save.bind(user), saveOpt);
    return savedUserObj;
  }

  async listUserByDateJoined(param: any) {
    const payload = await validateListUserByDateJoined(param);
    console.log({ date: payload.date });
    const users = await Model.User.query("dateJoined")
      .eq(parseInt(payload.date))
      .sort("descending")
      .using("dateJoinedIndex")
      .exec();
    console.log("Getting USERS", users);
    return users;
  }
}

export default User;
