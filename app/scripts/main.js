
var model = new WikiModel();
var view = new WikiView(model, $('#appcontainer'));
var controller = new WikiController(model, view);

view.init();
//mymodel.searchResults();
