import {Component, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../model/dictionary";
import {environment} from "../../../../environments/environment";
import {InfoService} from "../../../info.service";
import {HttpParams} from "@angular/common/http";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dictionary-button',
  templateUrl: './dictionary-button.component.html',
  styleUrls: ['./dictionary-button.component.css']
})
export class DictionaryButtonComponent implements OnInit {
  baseApiUrl = environment.BASE_API_URL;
  items: MenuItem[];

  @Input() dictionary: Dictionary;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.updateCSS();
    this.items = [
      {
        label: 'About Dictionary',
        command: () => {
          this.infoService.onAbout(this.dictionary);
        }
        // items: [{
        //   label: 'New',
        //   icon: 'pi pi-fw pi-plus',
        //   items: [
        //     {label: 'Project'},
        //     {label: 'Other'},
        //   ]
        // },
        //   {label: 'Open'},
        //   {label: 'Quit'}
        // ]
      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //     {label: 'Delete', icon: 'pi pi-fw pi-trash'},
      //     {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      //   ]
      // }
    ];
  }


  onClick() {
    this.dictionary.selected = !this.dictionary.selected;
    this.updateCSS();
    this.infoService.updateModel();
  }

  private updateCSS(): void {
    if (this.dictionary.selected) {
      const params = new HttpParams()
        .set('dicId', this.dictionary.id);
      this.enableDictionaryCSS(this.infoService.cssUrl + "?" + params.toString(), String("id_" + this.dictionary.id));
    } else {
      this.disableDictionaryCSS(String("id_" + this.dictionary.id));
    }
  }

  enableDictionaryCSS(url, cssId) {
    if (document.getElementById(cssId) == null) {
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
    } else {
      (document.getElementById(cssId) as HTMLLinkElement).disabled = false;///i fit's already there, enable it
    }
  }

  disableDictionaryCSS(cssId) {
    if (document.getElementById(cssId) != null) {
      (document.getElementById(cssId) as HTMLLinkElement).disabled = true;
    }
  }
}
