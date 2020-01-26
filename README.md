# Rocket Edit - Angular Inline Editor

 <img align="right" width="100" height="100" src="https://raw.githubusercontent.com/tensor-labs/rocket-edit/master/ngRocket.png" />
  
  ![npm](https://img.shields.io/npm/dt/rocket-edit?style=flat-square) ![npm](https://img.shields.io/npm/v/rocket-edit?style=flat-square) ![NPM](https://img.shields.io/npm/l/rocket-edit?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/tensor-labs/rocket-edit?style=flat-square)

Rocket-edit is a library of Angular (version 8+) that allows you to create editable elements.
Such technique is also known as *click-to-edit* or *edit-in-place*.

## Dependencies

Basically it does not depend on any libraries except Angular 8 itself.
For themes you may need to include Bootstrap CSS.

### Angular 8+ Version

Angular 8 is now stable. Therefore, if encountering errors using this
lib, ensure your version of Angular is compatible. The current version used to develop this lib is angular **^8.0.0**.

## Controls & Features

* [x] text
* [x] select
* [x] time
* [x] number

## Quick start

A recommended way to install ***Rocket-Edit*** is through [npm](https://www.npmjs.com/package/rocket-edit) package manager using the following command:

  `npm i rocket-edit --save`

Usage
-----

## Angular 8 and later

Import `RocketEditModule` into your app's modules:

``` typescript
import { RocketEditModule } from 'rocket-edit';

@NgModule({
  imports: [
    RocketEditModule
  ]
})
```

This makes all the `rocket-edit` components available for use in your app components.

## Demo / Example

You can find a complete example [here](https://stackblitz.com/edit/angular-lmpjrf)

```TypeScript
import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: `
    <div>
        <rocket-edit 
        type="text" 
        [(ngModel)]="editableText" 
        (Save)="save($event)">
        </rocket-edit>
    </div>
    <div>
        <rocket-edit 
        type="number" 
        [(ngModel)]="editableNumber" 
        (Save)="save($event)">
        </rocket-edit>
    </div>
    <div>
        <rocket-edit 
        type="time" 
        [(ngModel)]="editableTime" 
        (Save)="save($event)">
        </rocket-edit>
    </div>
    <div>
        <rocket-edit 
        type="select" 
        [(ngModel)]="editableSelect"
        [options]="options" 
        (Save)="save($event)">
        </rocket-edit>
  </div>`
})
export class MyComponent {
  title = 'My component!';

  editableText = 'myText';
  editableNumber = 1234567890;
  editableTime = '10:10';
  editableSelect = 2;
  options =[
    {key: 1, value: 'Apple'},
    {key: 2, value: 'Mango'},
    {key: 3, value: 'Guava'},
    {key: 4, value: 'Raspberry'}
  ];

  save(value) {
    //call to http service
    console.log('http.service: ' + value);
  }
```


## API

### Rocket Edit Directives

##### Text

```HTML
 <rocket-edit
        type="text"
        [(ngModel)]="editableText"
        (Save)="save($event)"
        [name]="editableText"
        [pattern]="pattern"
        [required]="true"
        [placeholder]="placeholder"
        [title]="title"
        [minlength]="1"
        [maxlength]="100"
        [empty]="text-to-display-if-its-empty"></rocket-edit>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`Save`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`pattern`** [`regex`] the regular expression attribute to validate and `<input>` element. Default is `null`.
* **`required`** [`boolean`] Specifies whether the `<input>` is mandatory or not.
* **`placeholder`** [`string`] Specified placeholder text for `<input>`.
* **`title`** [`string`] Specified placeholder title for `<input>`.
* **`minlength`** [`number`] the minlength attribute specifies the minimum characters for an `<input>` element. Default is `1`.
* **`maxlength`** [`number`] the maxlength attribute specifies the maximum characters for an `<input>` element. Default is `Infinity`.
* **`empty`** [`string`] Specified text to display if `<input>` element is empty or hasve no value. Default is  `Click to add`.

##### Number

```HTML
 <rocket-edit
        type="number"
        [(ngModel)]="editableNumber"
        (Save)="save($event)"
        [name]="editableNumber"
        [min]="1"
        [max]="Infinity"
        [required]="true"
        [placeholder]="placeholder"
        [title]="title"
        [empty]="text-to-display-if-its-empty"></rocket-edit>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`Save`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`min`** [`number`] the min attribute specifies the minimum value for an `<input>` element. Default is `1`.
* **`max`** [`number`] the max attribute specifies the maximum value for an `<input>` element. Default is `Infinity`.
* **`required`** [`boolean`] Specifies whether the `<input>` is mandatory or not.
* **`placeholder`** [`string`] Specified placeholder text for `<input>`.
* **`title`** [`string`] Specified placeholder title for `<input>`.
* **`empty`** [`string`] Specified text to display if `<input>` element is empty or hasve no value. Default is  `Click to add`.

##### Time

```HTML
 <rocket-edit
        type="time"
        [(ngModel)]="editableTime"
        (Save)="save($event)"
        [name]="editableTime"
        [required]="true"
        [title]="title"
        [step]="any | 1 | 2 | 3"
        [empty]="text-to-display-if-its-empty"></rocket-edit>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`Save`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`required`** [`boolean`] Specifies whether the `<input>` is mandatory or not.
* **`title`** [`string`] Specified placeholder title for `<input>`.
* **`step`** [`number`] The step attribute specifies the legal number intervals for seconds or milliseconds in a time field. Default is `1`.
* **`empty`** [`string`] Specified text to display if `<input>` element is empty or hasve no value. Default is  `Click to add`.

##### Select

```HTML
 <rocket-edit
        type="select"
        [(ngModel)]="editableSelect"
        (Save)="save($event)"
        [name]="editableSelect"
        [required]="true"
        [title]="title"
        [options]="options"
        [empty]="text-to-display-if-its-empty"></rocket-edit>
```

* **`type`** [`string`] Specifies the type `<input>` element to display.
* **`Save`** [`event handler`] The expression specified will be invoked whenever the form is save via a click on save button.
The `$event` argument will be the value return of the input send.
* **`name`** [`string`] Defines the name of an `<input>` element. Default is `undefined`.
* **`required`** [`boolean`] Specifies whether the `<input>` is mandatory or not.
* **`title`** [`string`] Specified placeholder title for `<input>`.
* **`options`** [`Array[{Value:string, Key: any }]`] Array of items from which to select. Should be an array of objects with `Value` and `Key` properties.
* **`empty`** [`string`] Specified text to display if `<input>` element is empty or hasve no value. Default is  `Click to add`.


# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/tensor-labs/Rocket-Edit/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

# Development

1. To generate all `*.js`, `*.js.map` and `*.d.ts` files:

    `npm run build`

2. To debug :

    `npm run build:watch`

## Authors
[Vijay Yadav](https://github.com/yadavgvijay)

## License

[The MIT License (MIT)](https://github.com/tensor-labs/Rocket-Edit/blob/master/LICENCE.md)
