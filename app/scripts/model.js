var WikiModel = function(){
  this._keyword = null;
  this._searhresults = null;

  this.resultsUpdate = new WikiEvent(this);
  this.keywordAssigned = new WikiEvent(this);
};

WikiModel.prototype = {
  searchResults: function(){
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';

    //Build link
    var page = 'https://en.wikipedia.org/?curid=';
    var _self = this;
    return $.get({
      url: api+_self._keyword+cb,
      success: function(data){
        _self._searhresults = data;
        _self.resultsUpdate.notify();
      },
      //jsonp: ''
      dataType: 'jsonp'
    });
  },
  setKeyword: function(keyword){
    this._keyword = keyword;
    this.keywordAssigned.notify({keyword: keyword});
  }
};
