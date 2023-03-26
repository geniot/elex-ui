import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../info.service";
import {FullTextHit} from "../model/fulltexthit";
import {environment} from "../../environments/environment";
import {Action} from "../model/action";
import {DestroyableComponent} from "../destroyablecomponent";

@Component({
  selector: 'app-fulltext-panel',
  templateUrl: './fulltext-panel.component.html',
  styleUrls: ['./fulltext-panel.component.css']
})
export class FulltextPanelComponent extends DestroyableComponent implements OnInit {
  baseApiUrl = environment.BASE_API_URL;
  searchResults: FullTextHit[];
  searchResultsFor: string;
  @ViewChild('container') myDiv: ElementRef;

  constructor(public infoService: InfoService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.ftModel.asObservable().subscribe(
      model => {
        if (this.myDiv != null && this.searchResultsFor != model.searchResultsFor) {
          this.myDiv.nativeElement.scrollTop = 0;
        }
        this.searchResultsFor = model.searchResultsFor;
        this.searchResults = model.searchResults;
      }));
  }

  onClick(text: string) {
    this.infoService.model.value.ftLink = text;
    this.infoService.model.value.action = Action.FT_LINK;
    this.infoService.selectedHeadword.next(text);
    this.infoService.updateModel();
  }

  getDictionaryNameById(dictionaryId: number) {
    return this.infoService.getDictionaryNameById(dictionaryId);
  }

  onAdminClick($event: MouseEvent) {
    if ($event.ctrlKey) {
      this.infoService.onAdmin();
    }
  }
}
