import {Component, OnInit} from '@angular/core';
import {InfoService} from "../../info.service";
import {Headword} from "../../model/headword";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent implements OnInit {
  headwords: Headword[] = [];
  selectedHeadwords: Map<string, string> = new Map();


  constructor(private infoService: InfoService) {
  }

  ngOnInit() {
    this.infoService.model.asObservable().subscribe(
      model => {
        this.headwords = model.headwords;
        this.selectedHeadwords = model.selectedHeadwords as Map<string, string>;
      });
  }


  onSelect(headword: string, index: number) {
    for (let hw of this.headwords) {
      if (hw.name == headword) {
        // if (hw.selected) {
        //   //clicking on selected headword
        //   return;
        // }
        hw.selected = true;
      } else {
        hw.selected = false;
      }
    }
    this.infoService.model.value.selectedIndex = index;
    this.infoService.model.value.userInputs[this.infoService.getSelectedSourceLanguage()] = null;
    this.infoService.setSelectedHeadword(headword);
    this.infoService.updateModel();
  }


  onMouseWheel(event) {
    this.infoService.mouseWheelChangeValue.next(event.deltaY);
  }
}
