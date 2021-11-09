var MODEL = (function () {
  function _getPages(pageID) {
    let pageInfo = `../pages/${pageID}/${pageID}.html`;
    $.get(pageInfo, function (data) {
      $("#app").html(data);
    });
  }
  return {
    getPages: _getPages,
  };
})();
