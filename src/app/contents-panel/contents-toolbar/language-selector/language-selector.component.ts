import {Component, OnInit} from '@angular/core';
import {Language} from "../../../model/language";
import {InfoService} from "../../../info.service";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  selectedSourceLanguageCode: string;
  selectedTargetLanguageCode: string;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.subscribe(
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
      });
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
    for (let lang of this.infoService.model.value.sourceLanguages) {
      if (this.selectedSourceLanguageCode == lang.sourceCode) {
        lang.selected = true;
      } else {
        lang.selected = false;
      }
    }
    this.infoService.updateModel();
  }

  onChangeTarget(newValue) {
    this.selectedTargetLanguageCode = newValue;
    for (let sourceLanguage of this.infoService.model.value.sourceLanguages) {
      if (this.selectedSourceLanguageCode == sourceLanguage.sourceCode) {
        for (let targetLanguage of sourceLanguage.targetLanguages) {
          if (this.selectedTargetLanguageCode == targetLanguage.sourceCode) {
            targetLanguage.selected = true;
          } else {
            targetLanguage.selected = false;
          }
        }
      }
    }
    this.infoService.updateModel();
  }
}
