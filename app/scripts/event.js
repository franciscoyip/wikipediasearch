var WikiEvent = function(sender){
  this._sender = sender;
  this._listeners = [];
};

WikiEvent.prototype = {
  attach: function(listener){
    this._listeners.push(listener);
  },
  notify: function(args){
    var _self = this;
    this._listeners.forEach(function(listener){
      listener(_self._sender, args);
    });
  }
};
