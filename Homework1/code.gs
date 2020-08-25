// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  DocumentApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Dialog')
      .addItem('Open', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('index');
  DocumentApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Recipe Puppy');
}

function puppySearch(ing, food){
  var response = UrlFetchApp.fetch("http://www.recipepuppy.com/api/?i=" + ing + "&q=" + food);
  var items = JSON.parse(response.getContentText()).results;
  var txt = DocumentApp.getActiveDocument().getBody().editAsText();
  Logger.log(items)
  for (i in items){
    var item = items[i];
    txt.appendText("Name: " + item.title + "\n");
    txt.appendText("Ing: " + item.ingredients + "\n");
    txt.appendText("Url: " + item.href + "\n");
    txt.appendText("Img-Url: " + item.thumbnail + "\n\n");
  }
}