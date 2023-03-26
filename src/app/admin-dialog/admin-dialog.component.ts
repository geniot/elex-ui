import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AboutModel} from "../model/aboutmodel";
import {LayoutConfig} from "../model/layoutconfig";
import {cloneDeep} from 'lodash-es'
import {IOutputData} from "angular-split";

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit, AfterContentInit {
  keys: string[] = [];
  values: string[] = [];

  splitLayoutLocalStorageName = 'elex-admin-splitLayoutLocalStorageName';
  config: LayoutConfig = new LayoutConfig();
  defaultConfig: LayoutConfig = new LayoutConfig();
  @ViewChild('focusElement') focusElement: ElementRef;

  constructor(public ref: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig) {
    let aboutModel: AboutModel = dynamicDialogConfig.data.aboutModel;
    this.keys = Object.keys(aboutModel.abouts);
    this.values = Object.values(aboutModel.abouts);
  }

  ngOnInit(): void {
    if (localStorage.getItem(this.splitLayoutLocalStorageName)) {
      this.config = JSON.parse(localStorage.getItem(this.splitLayoutLocalStorageName) || '{}')
    } else {
      this.resetConfig()
    }
  }

  resetConfig() {
    this.config = cloneDeep(this.defaultConfig)
    localStorage.removeItem(this.splitLayoutLocalStorageName)
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.focusElement.nativeElement.focus();
    }, 50);
  }

  onDragEnd(e: IOutputData) {
    this.config.columns[0].size = e.sizes[0] as number;
    this.config.columns[1].size = e.sizes[1] as number;
    // this.config.columns[2].size = e.sizes[2] as number;
    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem(this.splitLayoutLocalStorageName, JSON.stringify(this.config))
  }
}
