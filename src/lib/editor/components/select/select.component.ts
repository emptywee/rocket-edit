import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { SelectConfig } from '../../configuration/config';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'select-editor',
  template: `<select class="form-control" [(ngModel)]="value" [required]="config.required" (change)="updateValue($event)">
  <option *ngFor="let item of config.options" [ngValue]="item.key">
      {{ item.value}}
  </option>
</select>`,
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit, OnDestroy {

  value: any;
  subscription: any;
  config: SelectConfig;

  constructor(private interact: EditorService) { }

  ngOnInit() {
    this.config = this.interact.getConfig();
    this.subscription = this.interact.getData().subscribe(x => {
      this.value = x;
    });
  }

  updateValue(value) {
    this.interact.postData(this.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}