var MODEL = (function () {
  var _getPages = function (pageID) {
    let pageInfo = `../pages/${pageID}/${pageID}.html`;
    $.get(pageInfo, function (data) {
      $("#app").html(data);
    });
  };
  return {
    getPages: _getPages,
  };
})();
