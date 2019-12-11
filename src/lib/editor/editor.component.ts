import { Component, OnInit, ViewChild, ViewContainerRef, AfterContentInit, ComponentFactoryResolver, forwardRef, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { TextComponent } from './components/text/text.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GlobalConfig, BaseConfig } from './configuration/config';
import { EditorService } from './services/editor.service';
import { delay } from 'rxjs/operators';
import { SelectComponent } from './components/select/select.component';
import { NumberComponent } from './components/number/number.component';
import { TimeComponent } from './components/time/time.component';
import { PasswordComponent } from './components/password/password.component';

const defaultCnf: GlobalConfig = {
  type: 'text',
  name: '',
  required: false,
  placeholder: '',
  title: '',
  min: 0,
  max: Infinity,
  minlength: 0,
  maxlength: 100,
  pattern: undefined,
  options: [],
  step: 'any',
  selectPlaceholder: 'Click to add'
};

@Component({
  selector: 'rocket-edit',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    },
  EditorService],
  entryComponents: [TextComponent, PasswordComponent, NumberComponent, TimeComponent, SelectComponent]
})
export class EditorComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container : ViewContainerRef;
  @Output() public Save: EventEmitter<any> = new EventEmitter();
  @Input() type;
  @Input() pattern;
  @Input() name;
  @Input() placeholder;
  @Input() title;
  @Input() required;
  @Input() min;
  @Input() max;
  @Input() minlength;
  @Input() maxlength;
  @Input() options;
  @Input() step;
  @Input() selectPlaceholder;

  private _value = '';
  private preValue = '';
  private focusOutTriggered = false;

  config: BaseConfig;
  editing = false;
  subscription: any;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any { return this._value; }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  constructor(private cfr: ComponentFactoryResolver, private editorService: EditorService) { }

  public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  public registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

  ngOnInit() {
    this.editorService.setConfig(this.initializeConfig());
    this.subscription = this.editorService.getData().pipe(delay(0)).subscribe(x => {
      if (x !== undefined) {
        this.value = x;
      }
    })
  }

  ngAfterContentInit() {
    let component: any;
    switch (this.type) {
      case 'text':
        component = TextComponent;
        break;
      case 'password':
        component = PasswordComponent;
        break;
      case 'select':
        component = SelectComponent;
        break;
      case 'number':
        component = NumberComponent;
        break;
      case 'time':
        component = TimeComponent;
        break;
      default:
        component = TextComponent;
        break;
    }
    this.container.clear();
    const factory = this.cfr.resolveComponentFactory(component);
    const ref = this.container.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

  initializeConfig(): GlobalConfig {
    return {
      type: this.type ? this.type : defaultCnf.type,
      name: this.name ? this.name : defaultCnf.name,
      placeholder: this.placeholder ? this.placeholder : defaultCnf.placeholder,
      required: this.required ? this.required : defaultCnf.required,
      min: this.min ? this.min : defaultCnf.min,
      max: this.max ? this.max : defaultCnf.max,
      minlength: this.minlength ? this.minlength : defaultCnf.minlength,
      maxlength: this.maxlength ? this.maxlength : defaultCnf.maxlength,
      options: this.options ? this.options : defaultCnf.options,
      pattern: this.pattern ? this.pattern : defaultCnf.pattern,
      title: this.title ? this.title : defaultCnf.title,
      step: this.step ? this.step : defaultCnf.step,
      selectPlaceholder: this.selectPlaceholder ? this.selectPlaceholder : defaultCnf.selectPlaceholder
    };
  }

  writeValue(value: any) {
    this._value = value;
  }

  edit(value) {
    this.editorService.postData(value);
    this.preValue = value;
    this.editing = true;
    setTimeout(_ => this.container.element.nativeElement.nextSibling.children[0].focus());
   }

   save(value) {
    this.Save.emit(value);
    this.editing = false;
  }

  cancel() {
    this.editorService.postData(this.preValue);
    this._value = this.preValue;
    this.editing = false;
  }

  showText() {
    if (this.value === null || this.value === undefined) {
      return this.selectPlaceholder;
    } else if (this.value.toString().trim().length === 0) {
      return this.selectPlaceholder;
    } else {
      if (this.type !== 'select') {
        return this.value;
      } else {
        const r = this.options.find(x => x.key === this.value);
          if(r === undefined) {
          return this.selectPlaceholder;
        }
        return r.value === null ? this.selectPlaceholder : r.value;
      }
    }
  }

  focusout(event) {
    if(event.relatedTarget && event.relatedTarget.id === 'editor-button-save') {
      this.focusOutTriggered = true;
    } else {
      if(!this.focusOutTriggered) {
        this.cancel();
      }
      this.focusOutTriggered = false;
    }
  }

  validate() {
    return this.container.element.nativeElement.nextSibling.children[0].validity.valid;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
