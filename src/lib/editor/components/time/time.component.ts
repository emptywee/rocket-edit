import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { NumberConfig } from '../../configuration/config';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'time-editor',
  template: `<input class="form-control" [(ngModel)]="value" type="time" [min]="config.min" [max]="config.max"
  [required]="config.required" [title]="config.title" [placeholder]="config.placeholder" />`,
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, DoCheck, OnDestroy {

  value: any;
  subscription: any;
  config: NumberConfig;

  constructor(private interact: EditorService) { }

  ngOnInit() {
    this.config = this.interact.getConfig();
    this.subscription = this.interact.getData().subscribe(x => {
      this.value = x;
    });
  }

  ngDoCheck() {
    this.interact.postData(this.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}