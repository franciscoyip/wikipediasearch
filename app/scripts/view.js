var WikiView = function(model, container){
  this._model = model;
  this._elements = {container: container};

  var _self = this;

  //Attach Model Lister
  this._model.resultsUpdate.attach(function(){
    _self.renderResult();
  });

  this.formSubmitted = new WikiEvent(this);

};

WikiView.prototype = {
  init: function(){

    var _self = this;

    var randomlink = $('<a>');
    var title = 'Click for a random article';
    randomlink.attr({
      href:'https://en.wikipedia.org/wiki/Special:Random',
      target:'_blank',
      title:title
    }).html(title);
    this._elements.randomlink = randomlink;
    this._elements.form = $('<form>').addClass('form-inline');
    this._elements.input = $('<input>').addClass('form-control').attr({type:'text'});
    this._elements.inputicon = $('<span>').addClass('search glyphicon glyphicon-search');
    this._elements.resultcontainer = $('<div>').addClass('resultinner');
    //Attach Listeners to HTML elements
    this._elements.form.submit(function(e){
      e.preventDefault();
      _self.formSubmitted.notify();
    });

    this._elements.inputicon.click(function(){
      _self._elements.form.submit();
    });

    this.render();
  },
  render: function(){
    this._elements.container.append(this._elements.randomlink);
    this._elements.form.append(this._elements.input).append(this._elements.inputicon);
    this._elements.container.append(this._elements.form);
    this._elements.container.append(this._elements.resultcontainer);
  },
  renderResult: function(){

    var searchresult = this._model._searhresults;
    var urlprefix = 'https://en.wikipedia.org/?curid=';
    if('query' in searchresult && 'pages' in searchresult['query']){
      var pages = searchresult['query']['pages'];
      this._elements.resultcontainer.empty();
      var div = $('<div>').addClass('list-group');
      for(var pageid in pages){
        var a = $('<a>').addClass('list-group-item');
        var page = pages[pageid];
        a.html(page.title).attr({
          href: urlprefix+pageid,
          title:page.title,
          target:'_blank'
        });
        div.append(a);
      }
      this._elements.resultcontainer.append(div);
    }
  }
};
