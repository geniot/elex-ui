import {Action} from "./action";
import {TaskStatus} from "./taskstatus";

export class Task {
  fileName!: string;
  action!: Action;
  status!: TaskStatus;
  progress!: number;
  ftIndexSize!: string;
}
