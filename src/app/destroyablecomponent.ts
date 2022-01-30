import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Injectable()
export class DestroyableComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
