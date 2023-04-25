// jQuery.noConflict();

// (function($, PLUGIN_ID) {
//   'use strict';

//   kintone.events.on('app.record.index.show', function() {
//     var config = kintone.plugin.app.getConfig(PLUGIN_ID);

//     var spaceElement = kintone.app.getHeaderSpaceElement();
//     if (spaceElement === null) {
//       throw new Error('The header element is unavailable on this page');
//     }
//     var fragment = document.createDocumentFragment();
//     var headingEl = document.createElement('h3');
//     var messageEl = document.createElement('p');

//     messageEl.classList.add('plugin-space-message');
//     messageEl.textContent = config.message;
//     headingEl.classList.add('plugin-space-heading');
//     headingEl.textContent = 'Hello kintone plugin!';

//     fragment.appendChild(headingEl);
//     fragment.appendChild(messageEl);
//     spaceElement.appendChild(fragment);
//   });
// })(jQuery, kintone.$PLUGIN_ID);

(function (PLUGIN_ID) {
  "use strict";

  // Get plug-in configuration settings
  var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);
  var CONFIG_BODY, CONFIG_COUNT, CONFIG_REVERSE;

  // Get each settings
  if (!CONFIG) {
    return false;
  }

  CONFIG_BODY = CONFIG.body;
  // CONFIG_COUNT = CONFIG.count;
  CONFIG_REVERSE = CONFIG.reverse

  kintone.events.on(
    [
      "app.record.create.submit",
      "app.record.edit.submit",
      "app.record.index.edit.submit",
    ],
    function (event) {
      // // Obtain characters in the text field
      // var rec = event.record;
      // var st = rec[CONFIG_BODY].value;
      // var st2;

      // // If the number of characters is zero, put zero in number field and return
      // if (!st) {
      //   rec[CONFIG_COUNT].value = 0;
      //   return event;
      // }

      // // Remove spaces
      // st2 = st.replace(/\s+/g, "");

      // // Enter character count into number field
      // rec[CONFIG_COUNT].value = st2.length;

      var rec = event.record
      var txt = rec[CONFIG_BODY].value

      var revTxt = txt.split("").reverse().join("")
      rec[CONFIG_REVERSE].value = revTxt
      
      return event;
    }
  );
})(kintone.$PLUGIN_ID);