import {Component, OnInit} from '@angular/core';
import {Dictionary} from "../../model/dictionary";
import {InfoService} from "../../info.service";

@Component({
  selector: 'app-contents-toolbar',
  templateUrl: './contents-toolbar.component.html',
  styleUrls: ['./contents-toolbar.component.css']
})
export class ContentsToolbarComponent implements OnInit {
  dictionaries: Dictionary[];

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.subscribe(
      model => {
        this.dictionaries = model.dictionaries;
      });
  }

}
