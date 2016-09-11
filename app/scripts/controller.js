var WikiController = function(model, view){
    this._model = model;
    this._view = view;

    var _self = this;

    this._view.formSubmitted.attach(function(){
      _self.updateKeyword();
      _self.queryResult();
    });
};

WikiController.prototype = {
    updateKeyword: function(){
      var keyword = this._view._elements.input.val();
      if(keyword){
        this._model.setKeyword(keyword);
      }
    },
    queryResult: function(){
      this._model.searchResults();
    }
};
