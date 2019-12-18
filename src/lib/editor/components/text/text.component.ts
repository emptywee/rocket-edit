import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { TextConfig } from '../../configuration/config';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'text-editor',
  template: `<input class="form-control" [(ngModel)]="value" type="text" 
  [required]="config.required" [title]="config.title" [placeholder]="config.placeholder" 
  [maxlength]="config.maxlength" [minlength]="config.minlength" [pattern]="config.pattern" />`,
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, DoCheck, OnDestroy {

  value: any;
  subscription: any;
  config: TextConfig;

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