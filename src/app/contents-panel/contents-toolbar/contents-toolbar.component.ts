import {Component, OnInit} from '@angular/core';
import {Dictionary} from "../../model/dictionary";
import {InfoService} from "../../info.service";
import {DestroyableComponent} from "../../destroyablecomponent";

@Component({
  selector: 'app-contents-toolbar',
  templateUrl: './contents-toolbar.component.html',
  styleUrls: ['./contents-toolbar.component.css']
})
export class ContentsToolbarComponent extends DestroyableComponent implements OnInit {
  dictionaries: Dictionary[];
  columns: Number = 3;
  isScreenNarrow: boolean = false;

  constructor(private infoService: InfoService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.model.subscribe(
      model => {
        this.dictionaries = model.dictionaries;
      }));
    this.subscriptions.push(this.infoService.changeView.asObservable().subscribe(
      columns => {
        this.columns = columns;
      }));
    this.subscriptions.push(this.infoService.changeWidth.asObservable().subscribe(
      () => {
        this.isScreenNarrow = this.infoService.isScreenNarrow();
      }));
  }

  onChangeView(n: Number) {
    if (n != this.columns) {
      this.infoService.changeView.next(n);
    }
  }

}
