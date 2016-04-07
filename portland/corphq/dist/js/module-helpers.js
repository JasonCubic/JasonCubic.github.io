'Use Strict';
/* jshint latedef: nofunc */
/* jshint unused: false */
/* globals Handlebars, window, ACTIVE_CONTROLLER */
var helperFunctions = (function() {

  // private varialbles
  var windowsLocation = window.location;
  console.info('window.location:', windowsLocation);

  function getUrlRoot() {
    debugger;
    if (typeof ACTIVE_CONTROLLER !== 'undefined') { // ACTIVE_CONTROLLER is a global variable that should be set in _Layout.cshtml
      var path = addEndingSlashToUrlIfItIsMissing(windowsLocation.pathname);
      console.log(path);
      var controllerLocationInPath = path.toUpperCase().indexOf('/' + ACTIVE_CONTROLLER.toUpperCase() + '/');
      if (controllerLocationInPath !== -1) {
        var pathWithControllerAndAfterRemoved = path.substring(0, (controllerLocationInPath + 1));
        return windowsLocation.protocol + '//' + windowsLocation.host + pathWithControllerAndAfterRemoved;
      } else {
        return windowsLocation.protocol + '//' + windowsLocation.host + path;
      }
    } else {
      return ''; // have to use relative URL instead if global variable ACTIVE_CONTROLLER is not set
    }
  }

  function addEndingSlashToUrlIfItIsMissing(Url) {
    if (Url[Url.length - 1] !== '/') {
      return Url + '/';
    } else {
      return Url;
    }
  }

  function formatPwmsCurrency(n) {
    if (!$.isNumeric(n)) {
      return 'NULL';
    }
    var currency = parseFloat(n);
    var returnVal;
    var cents = Math.round(Math.abs(currency) * 100) % 100;
    var hasCents = (cents > 0);
    if (hasCents) {
      returnVal = String(Math.abs(currency).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      returnVal = String(Math.abs(currency)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    var isNegative = (currency < 0);
    if (isNegative) {
      returnVal = '( ' + returnVal + ' )';
    }
    return returnVal;
  }

  function getHumanReadableTime(dateString) {
    var date = getDateFromDateString(dateString);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

  function getSqlTimeFormat(dateString) { // not using UTC datetime though
    var myDate = getDateFromDateString(dateString);
    var year = myDate.getFullYear();
    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var day = ('0' + myDate.getDate()).slice(-2);
    var hour = ('0' + myDate.getHours()).slice(-2);
    var minute = ('0' + myDate.getMinutes()).slice(-2);
    var second = ('0' + myDate.getSeconds()).slice(-2);
    return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
  }

  function getDateFromDateString(dateString) {
    dateString = dateString.toString();
    dateString = dateString.trim();
    var length = dateString.length;
    var indexOfDateStart = dateString.indexOf("Date(");
    if (indexOfDateStart !== -1 && dateString.substring((length - 2), (length - 1)) === ')') {
      var startingPlace = indexOfDateStart + 5; // removes: /Date(
      var endingPlace = length - 2; // removes: )/
      dateString = parseInt(dateString.substring(startingPlace, endingPlace));
    }
    return new Date(dateString);
  }

  function caseInsensitiveStringCompare(a, b) {
    return String(a).toUpperCase() === String(b).toUpperCase();
  }

  function formatPwmsFloat(num) {
    if (!$.isNumeric(parseFloat(num))) {
      return 'NULL';
    }
    return parseFloat(num);
  }

  function searchToObject() {
    var urlPairs = windowsLocation.search.substring(1).split("&");
    var returnObj = {};
    var pair;
    $.each(urlPairs, function(pairIndex, pairValue) {
      if (pairValue.length > 0) {
        pair = pairValue.split('=');
        // returnObj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        returnObj[urldecode(pair[0])] = urldecode(pair[1]);
      }
    });
    return returnObj;
  }

  function urldecode(str) {
    //       discuss at: http://phpjs.org/functions/urldecode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //      improved by: Lars Fischer
    //      improved by: Orlando
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (http://brett-zamir.me)
    //         input by: Ratheous
    //         input by: e-mike
    //         input by: lovio
    //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      bugfixed by: Rob
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //             note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    //             note: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
    //             note: pages served as UTF-8
    //        example 1: urldecode('Kevin+van+Zonneveld%21');
    //        returns 1: 'Kevin van Zonneveld!'
    //        example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    //        returns 2: 'http://kevin.vanzonneveld.net/'
    //        example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    //        returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
    //        example 4: urldecode('%E5%A5%BD%3_4');
    //        returns 4: '\u597d%3_4'

    return decodeURIComponent((str + '')
      .replace(/%(?![\da-f]{2})/gi, function() {
        // PHP tolerates poorly formed escape sequences
        return '%25';
      })
      .replace(/\+/g, '%20'));
  }

  function ucwords(str) {
    //  discuss at: http://phpjs.org/functions/ucwords/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Waldo Malqui Silva
    // improved by: Robin
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Onno Marsman
    //    input by: James (http://www.james-bell.co.uk/)
    //   example 1: ucwords('kevin van  zonneveld');
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: ucwords('HELLO WORLD');
    //   returns 2: 'HELLO WORLD'

    return (str + '')
      .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase();
      });
  }






  return {
    getUrlRoot: getUrlRoot,
    formatPwmsFloat: formatPwmsFloat,
    caseInsensitiveStringCompare: caseInsensitiveStringCompare,
    getHumanReadableTime: getHumanReadableTime,
    getSqlTimeFormat: getSqlTimeFormat,
    formatPwmsCurrency: formatPwmsCurrency,
    searchToObject: searchToObject,
    ucwords: ucwords
  };





})();
