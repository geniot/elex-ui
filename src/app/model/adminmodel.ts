import {Action} from "./action";
import {environment} from "../../environments/environment";
import {AdminDictionary} from "./admindictionary";

export class AdminModel {
  adminDictionaries: AdminDictionary[] = [];
  baseApiUrl: String = environment.BASE_API_URL;
  action: Action = Action.NONE;
}


