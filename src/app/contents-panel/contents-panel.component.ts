import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InfoService} from "../info.service";
import {Entry} from "../model/entry";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Action} from "../model/action";
import {environment} from "../../environments/environment";
import {DestroyableComponent} from "../destroyablecomponent";

@Component({
  selector: 'app-contents-panel',
  templateUrl: './contents-panel.component.html',
  styleUrls: ['./contents-panel.component.css']
})
export class ContentsPanelComponent extends DestroyableComponent implements OnInit {
  baseApiUrl = environment.BASE_API_URL;
  entryBody: SafeHtml;
  displayingHeadword: String;
  @ViewChild('container') myDiv: ElementRef;

  constructor(private infoService: InfoService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.model.asObservable().subscribe(
      model => {
        if (model.entries.length > 0) {
          if (this.myDiv != null && this.displayingHeadword != model.entries[0].headword) {
            this.myDiv.nativeElement.scrollTop = 0;
          }
          this.displayingHeadword = model.entries[0].headword;
          this.entryBody = this.sanitizer.bypassSecurityTrustHtml(this.collect(model.entries));
        } else {
          this.entryBody = "";
        }
      }));
  }

  private collect(entries: Entry[]): string {
    let res: string = "";
    for (let i = 0; i < entries.length; i++) {
      let entry: Entry = entries[i];
      res += '<span class="dic-name">' + entry.dicName + '</span>';
      res += '<div class="hwd">' + entry.headword + '</div>';
      res += entry.body;
      if (entries.length > 1 && i < entries.length - 1) {
        res += "<hr/>";
      }
    }
    return res;
  }

  search(event) {
    let dataId: String = event.target.getAttribute('data-id');
    let dataLink: String = event.target.getAttribute('data-link');
    if (dataLink == null) {
      let parentNode = event.target.parentNode;
      while (parentNode != null) {
        if (typeof parentNode.getAttribute === "function") {
          dataLink = parentNode.getAttribute('data-link');
          if (dataLink != null) {
            break;
          }
        }
        parentNode = parentNode.parentNode;
      }
    }
    if (dataLink != null) {
      if (dataId != null && dataLink.endsWith(".wav")) {
        let audio = new Audio();
        audio.src = this.baseApiUrl + "/wav?id=" + dataId + "&link=" + dataLink;
        audio.crossOrigin = 'anonymous';
        audio.load();
        audio.play();
      } else {
        this.infoService.model.value.ftLink = dataLink;
        this.infoService.model.value.action = Action.CONTENT_LINK;
        this.infoService.updateModel();
      }
    }
  }
}
