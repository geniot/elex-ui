import {Component, OnInit} from '@angular/core';
import {AdminDictionary} from "../model/admindictionary";
import {environment} from "../../environments/environment";
import {Action} from "../model/action";
import {Task} from "../model/task";
import {TaskStatus} from "../model/taskstatus";
import {DictionaryStatus} from "../model/dictionarystatus";
import {DestroyableComponent} from "../destroyablecomponent";
import {InfoService} from "../info.service";

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent extends DestroyableComponent implements OnInit {
  selectedDictionary!: AdminDictionary | null;
  task: Task | null = new Task();
  baseApiUrl: String = environment.BASE_API_URL;

  constructor(private infoService: InfoService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.selectedDictionary.asObservable().subscribe(
      dictionary => {
        if (dictionary == AdminDictionary.EMPTY) {
          this.selectedDictionary = null;
        } else {
          this.selectedDictionary = dictionary;
        }
        this.task = null;
      }));

    this.subscriptions.push(this.infoService.adminModel.asObservable().subscribe(
      adminModel => {
        for (let dictionary of adminModel.adminDictionaries) {
          if (dictionary.selected) {
            this.infoService.selectedDictionary.next(dictionary);
            return;
          }
        }
        this.infoService.selectedDictionary.next(AdminDictionary.EMPTY);
      }));

    this.subscriptions.push(this.infoService.taskExecutorModel.asObservable().subscribe(
      taskExecutorModel => {
        for (let task of taskExecutorModel.tasks) {
          if (task.fileName != null && task.fileName == this.infoService.selectedDictionary.value.fileName) {
            this.task = task;
            return;
          }
        }
        this.task = null;
      }));
  }

  onReindex() {
    this.infoService.adminModel.value.action = Action.REINDEX;
    this.infoService.updateAdminModel();
  }

  getTaskColor(status: TaskStatus) {
    if (status == TaskStatus.RUNNING) {
      return "blue";
    } else if (status == TaskStatus.SUCCESS) {
      return "green";
    } else if (status == TaskStatus.FAILURE) {
      return "red";
    }
    return "blue";
  }

  onDownload(selectedDictionary: AdminDictionary, type: string) {
    const url = this.baseApiUrl + "/download?id=" + selectedDictionary.id + "&type=" + type;
    window.open(url);
  }

  changeStatusTxt(status: DictionaryStatus) {
    if (status == DictionaryStatus.ENABLED) {
      return "DISABLE";
    } else {
      return "ENABLE";
    }
  }

  onChangeStatus() {
    this.infoService.adminModel.value.action = Action.TOGGLE_DICTIONARY_STATE;
    this.infoService.updateAdminModel();
  }
}
