﻿export class SampleModule {
  constructor(element: Element) {
    this.el = element;
  }

  private el: Element;

  logElement(): void {
    console.log(this.el);
  }
  getTagName(): string{
    return this.el.tagName;
  }
}