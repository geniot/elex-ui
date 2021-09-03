import {Component, OnInit} from '@angular/core';
import {InfoService} from "../../info.service";
import {Action} from "../../model/action";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  src1: string;
  srcOn1: string = "assets/start/control_start_blue_over.png";
  srcOut1: string = "assets/start/control_start_blue.png";
  srcDown1: string = "assets/start/control_start_blue_down.png";
  srcUp1: string = "assets/start/control_start_blue_over.png";
  srcDisabled1: string = "assets/start/control_start.png";

  src2: string;
  srcOn2: string = "assets/rewind/control_rewind_blue_over.png";
  srcOut2: string = "assets/rewind/control_rewind_blue.png";
  srcDown2: string = "assets/rewind/control_rewind_blue_down.png";
  srcUp2: string = "assets/rewind/control_rewind_blue_over.png";
  srcDisabled2: string = "assets/rewind/control_rewind.png";

  src3: string;
  srcOn3: string = "assets/play_back/control_play_back_blue_over.png";
  srcOut3: string = "assets/play_back/control_play_back_blue.png";
  srcDown3: string = "assets/play_back/control_play_back_blue_down.png";
  srcUp3: string = "assets/play_back/control_play_back_blue_over.png";
  srcDisabled3: string = "assets/play_back/control_play_back.png";

  src4: string;
  srcOn4: string = "assets/play/control_play_blue_over.png";
  srcOut4: string = "assets/play/control_play_blue.png";
  srcDown4: string = "assets/play/control_play_blue_down.png";
  srcUp4: string = "assets/play/control_play_blue_over.png";
  srcDisabled4: string = "assets/play/control_play.png";

  src5: string;
  srcOn5: string = "assets/fastforward/control_fastforward_blue_over.png";
  srcOut5: string = "assets/fastforward/control_fastforward_blue.png";
  srcDown5: string = "assets/fastforward/control_fastforward_blue_down.png";
  srcUp5: string = "assets/fastforward/control_fastforward_blue_over.png";
  srcDisabled5: string = "assets/fastforward/control_fastforward.png";

  src6: string;
  srcOn6: string = "assets/end/control_end_blue_over.png";
  srcOut6: string = "assets/end/control_end_blue.png";
  srcDown6: string = "assets/end/control_end_blue_down.png";
  srcUp6: string = "assets/end/control_end_blue_over.png";
  srcDisabled6: string = "assets/end/control_end.png";

  startReached: boolean = false;
  endReached: boolean = false;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.model.asObservable().subscribe(
      model => {
        this.startReached = model.startReached;
        this.endReached = model.endReached;
      });
  }

  onToStartClick($event: MouseEvent) {
    if (!this.infoService.model.value.startReached) {
      this.infoService.model.value.action = Action.TO_START;
      this.infoService.updateModel();
    }
  }

  onPageBackClick($event: MouseEvent) {
    this.infoService.pageBack();
  }

  onFastBackwardClick($event: MouseEvent) {
    if (!this.infoService.model.value.startReached) {
      this.infoService.model.value.action = Action.PREVIOUS_TEN_PAGES;
      this.infoService.updateModel();
    }
  }

  onToEndClick($event: MouseEvent) {
    if (!this.infoService.model.value.endReached) {
      this.infoService.model.value.action = Action.TO_END;
      this.infoService.updateModel();
    }
  }


  onPageForwardClick($event: MouseEvent) {
    this.infoService.pageForward();
  }

  onFastForwardClick($event: MouseEvent) {
    if (!this.infoService.model.value.endReached) {
      this.infoService.model.value.action = Action.NEXT_TEN_PAGES;
      this.infoService.updateModel();
    }
  }


}
