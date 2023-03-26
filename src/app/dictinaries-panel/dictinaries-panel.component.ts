import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminDictionary} from "../model/admindictionary";
import {Task} from "../model/task";
import {Action} from "../model/action";
import {DestroyableComponent} from "../destroyablecomponent";
import {InfoService} from "../info.service";

@Component({
  selector: 'app-dictinaries-panel',
  templateUrl: './dictinaries-panel.component.html',
  styleUrls: ['./dictinaries-panel.component.css']
})
export class DictinariesPanelComponent extends DestroyableComponent implements OnInit {
  dictionaries: AdminDictionary[] = [];

  constructor(private infoService: InfoService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.adminModel.asObservable().subscribe(
      adminModel => {
        this.dictionaries = adminModel.adminDictionaries;
      }));

    this.subscriptions.push(this.infoService.taskExecutorModel.asObservable().subscribe(
      taskExecutorModel => {
        for (let adminDictionary of this.dictionaries) {
          adminDictionary.task = this.getTaskByFileName(taskExecutorModel.tasks, adminDictionary.fileName);
        }
      }));
  }

  onSelect(d: AdminDictionary) {
    for (let dictionary of this.dictionaries) {
      if (dictionary == d) {
        if (dictionary.selected) {
          dictionary.selected = false;
          this.infoService.selectedDictionary.next(AdminDictionary.EMPTY);
        } else {
          dictionary.selected = true;
          this.infoService.selectedDictionary.next(dictionary);
        }
      } else {
        dictionary.selected = false;
      }
    }
    this.infoService.saveState();
    this.infoService.updateTaskExecutorModel();
  }

  onReindexAll() {
    this.infoService.adminModel.value.action = Action.REINDEX_ALL;
    this.infoService.updateAdminModel();
  }

  private getTaskByFileName(tasks: Task[], fileName: string): Task | null {
    for (let task of tasks) {
      if (task.fileName == fileName) {
        return task;
      }
    }
    return null;
  }
}
