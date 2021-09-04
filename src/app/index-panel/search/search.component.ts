import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../../info.service";
import {Action} from "../../model/action";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  disabled: boolean = false;
  @ViewChild('searchInput') searchElement: ElementRef;
  searchValue:string = "";

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.asObservable().subscribe(
      model => {
        this.disabled = model.headwords.length == 0;
        this.searchValue = this.infoService.model.value.userInputs[this.infoService.getSelectedSourceLanguage()];
        if (!this.infoService.isScreenNarrow()){
          setTimeout(()=>{ // this will make the execution after the above boolean has changed
            this.searchElement.nativeElement.focus();
          },0);
        }
      });
  }

  search($event: any) {
    // this.searchValue = $event.target.value;
    this.searchValue = this.searchElement.nativeElement.value;
    this.infoService.model.value.userInputs[this.infoService.getSelectedSourceLanguage()] = this.searchValue;
    this.infoService.model.value.action = Action.SEARCH;
    this.infoService.updateModel();
  }

  onFocusOutEvent($event: FocusEvent) {
    this.searchValue = this.searchElement.nativeElement.value;
    this.infoService.model.value.userInputs[this.infoService.getSelectedSourceLanguage()] = this.searchValue;
  }
}
