import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../info.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.css']
})
export class HistoryPanelComponent implements OnInit {
  baseApiUrl = environment.BASE_API_URL;
  @ViewChild('container') myDiv: ElementRef;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
  }

}
