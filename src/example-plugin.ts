import * as $ from "jquery";
import { ExampleService } from './example-service';

// $.fn.examplePlugin = function (this: JQuery): JQuery {
//   let exampleService = new ExampleService();
//   let messageText = exampleService.getExampleMessage(this.text());
//   this.text(messageText);
//   return this;
// };

export class ExamplePlugin {
  getExampleMessage(name: string): string {
    return 'Hello, ' + name + '!';
  }
}