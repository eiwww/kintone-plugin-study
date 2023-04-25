jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  // var $message = $('.js-text-message');
  var $selectBody = $('select[name="js-select_body_field"]');
  var $selectReverse = $('select[name="js-select_reverse_field"]');
  if (!($form.length > 0 && $cancelButton.length > 0 && $selectBody.length > 0 && $selectReverse.length > 0)) {
    throw new Error('Required elements do not exist.');
  }

  function escapeHtml(htmlstr) {
    return htmlstr
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var CONF = kintone.plugin.app.getConfig(PLUGIN_ID);

  // if (config.message) {
  //   $message.val(config.message);
  // }

  function setDropDown() {
    // Retrieve field information, then set drop-down
    return KintoneConfigHelper.getFields(["SINGLE_LINE_TEXT"]).then(
      function (resp) {
        resp.forEach(function (respField) {
          var $option = $("<option>");
          switch (respField.type) {
            case "SINGLE_LINE_TEXT":
              $option.attr("value", respField.code);
              $option.text(escapeHtml(respField.label));
              $selectBody.append($option.clone());
              $selectReverse.append($option.clone());
              break;
            // case "NUMBER":
            //   $option.attr("value", respField.code);
            //   $option.text(escapeHtml(respField.label));
            //   $selectBody.append($option.clone());
            //   $selectReverse.append($option.clone());
            //   break;
            default:
              break;
          }
        });
        // Set default values
        $selectBody.val(CONF.body);
        $selectReverse.val(CONF.reverse);
      },
      function (err) {
        alert("Failed to retrieve field information");
      }
    );
  }

  $(document).ready(function () {
    // Set drop-down list
    setDropDown();
    // Set input values when 'Save' button is clicked
    $form.on("submit", function (e) {
      var config = {};
      e.preventDefault();

      config.body = $selectBody.val();
      config.reverse = $selectReverse.val();

      kintone.plugin.app.setConfig(config, function () {
        alert("The plug-in settings have been saved. Please update the app!");
        window.location.href = "/k/admin/app/flow?app=" + kintone.app.getId();
      });
    });

    // Process when 'Cancel' is clicked
    $cancelButton.on("click", function () {
      window.location.href =
        "/k/admin/app/" + kintone.app.getId() + "/plugin/";
    });
  });

  // $form.on('submit', function(e) {
  //   e.preventDefault();
  //   kintone.plugin.app.setConfig({message: $message.val()}, function() {
  //     alert('The plug-in settings have been saved. Please update the app!');
  //     window.location.href = '../../flow?app=' + kintone.app.getId();
  //   });
  // });
  // $cancelButton.on('click', function() {
  //   window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  // });
})(jQuery, kintone.$PLUGIN_ID);
