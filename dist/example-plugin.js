import * as $ from "jquery";
import { ExampleService } from './example-service';
$.fn.examplePlugin = function () {
    let exampleService = new ExampleService();
    let messageText = exampleService.getExampleMessage(this.text());
    this.text(messageText);
    return this;
};
//# sourceMappingURL=example-plugin.js.map