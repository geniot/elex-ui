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

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.asObservable().subscribe(
      model => {
        this.disabled = model.headwords.length == 0;
        setTimeout(()=>{ // this will make the execution after the above boolean has changed
          this.searchElement.nativeElement.focus();
        },0);
      });
  }

  search($event: any) {
    this.infoService.model.value.userInputs[this.infoService.getSelectedSourceLanguage()] = $event.target.value.trim();
    this.infoService.model.value.action = Action.SEARCH;
    this.infoService.updateModel();
  }
}
