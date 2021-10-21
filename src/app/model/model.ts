import {Language} from "./language";
import {Entry} from "./entry";
import {Dictionary} from "./dictionary";
import {Headword} from "./headword";
import {Action} from "./action";
import {HistoryItem} from "./historyitem";

export class Model {
  sourceLanguages: Language[] = [];
  dictionaries: Dictionary[] = [];
  headwords: Headword[] = [];
  entries: Entry[] = [];
  historyItems: HistoryItem[] = [];
  startReached: boolean = false;
  endReached: boolean = false;

  selectedHeadwords: Map<string, string> = new Map();
  userInputs: Map<string, string> = new Map();
  ftLink: String;
  historyLink: HistoryItem;
  visibleSize: number = 0;
  selectedIndex: number = 0;
  searchResultsFor: string;

  action: Action = Action.INIT;
  baseApiUrl:String;
  exactMatch:boolean = false;
}


