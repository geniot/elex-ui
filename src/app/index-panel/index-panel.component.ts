import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../info.service";

@Component({
  selector: 'app-index-panel',
  templateUrl: './index-panel.component.html',
  styleUrls: ['./index-panel.component.css']
})
export class IndexPanelComponent implements OnInit {

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
  }
}
