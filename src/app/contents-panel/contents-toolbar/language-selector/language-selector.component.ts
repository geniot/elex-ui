import {Component, OnInit} from '@angular/core';
import {Language} from "../../../model/language";
import {InfoService} from "../../../info.service";
import {DestroyableComponent} from "../../../destroyablecomponent";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent extends DestroyableComponent implements OnInit {
  selectedSourceLanguageCode: string;
  selectedTargetLanguageCode: string;

  constructor(public infoService: InfoService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.infoService.model.subscribe(
      model => {
        //setting defaults from local storage if any
        if (model.sourceLanguages.length > 0) {
          for (let lang of model.sourceLanguages) {
            if (lang.selected) {
              this.selectedSourceLanguageCode = lang.sourceCode;
              for (let targetLang of lang.targetLanguages) {
                if (targetLang.selected) {
                  this.selectedTargetLanguageCode = targetLang.sourceCode;
                  return;
                }
              }
            }
          }
        }
      }));
  }

  sourceLanguages() {
    return this.arrayFromLanguages(this.infoService.model.value.sourceLanguages);
  }

  targetLanguages() {
    if (this.selectedSourceLanguageCode != null) {
      for (let lang of this.infoService.model.value.sourceLanguages) {
        if (this.selectedSourceLanguageCode == lang.sourceCode) {
          return this.arrayFromLanguages(lang.targetLanguages);
        }
      }
    }
    return [];
  }

  arrayFromLanguages(languages: Language[]): Array<string> {
    let resultingArray: Array<string> = [];
    for (let lang of languages) {
      resultingArray.push(lang.sourceCode);
    }
    return resultingArray;
  }

  onChangeSource(newValue) {
    this.selectedSourceLanguageCode = newValue;
    this.infoService.setSelectedSourceLanguageCode(newValue);
    this.infoService.updateModel();
  }

  onChangeTarget(newValue) {
    this.selectedTargetLanguageCode = newValue;
    this.infoService.setSelectedTargetLanguageCode(this.selectedSourceLanguageCode, newValue);
    this.infoService.updateModel();
  }

  onReverse() {
    this.infoService.setSelectedSourceLanguageCode(this.selectedTargetLanguageCode);
    this.infoService.setSelectedTargetLanguageCode(this.selectedTargetLanguageCode, this.selectedSourceLanguageCode);
    this.infoService.updateModel();
  }
}
