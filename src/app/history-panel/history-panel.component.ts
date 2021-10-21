import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../info.service";
import {environment} from "../../environments/environment";
import {HistoryItem} from "../model/historyitem";
import {Action} from "../model/action";

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.css']
})
export class HistoryPanelComponent implements OnInit {
  historyItems: HistoryItem[] = [];
  @ViewChild('container') myDiv: ElementRef;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.asObservable().subscribe(
      model => {
        this.historyItems = model.historyItems;
      });
  }

  onClick(historyItem: HistoryItem) {
    this.infoService.model.value.action = Action.HISTORY_LINK;
    this.infoService.setSelectedSourceLanguageCode(historyItem.sourceLanguage);
    this.infoService.setSelectedTargetLanguageCode(historyItem.sourceLanguage, historyItem.targetLanguage);
    this.infoService.model.value.historyLink = historyItem;
    this.infoService.updateModel();
  }
}
