var _ = require('underscore'),
    tesseract = require('node-tesseract'),
    fs = require('fs');

var Extractor = function(){
  this.filesPath = __dirname + '/documents/';
  this.exportPath = __dirname + '/data_extracted/';
}

Extractor.prototype.process = function(callback) {
  var _this = this,
      _callback = callback;

  fs.readdir(_this.filesPath, function(err, files){
    if(err) {
      console.log('Error while reading files.');
      console.log(err);
      _callback();
    } else {
      var filesCount = files.length;
      _this.extract(0, files, function(){
        _callback();
      });
    }
  });
}

Extractor.prototype.extract = function(count, files, callback) {
  var _this = this,
      _count = count,
      _files = files,
      _callback = callback,
      filePath = _this.filesPath + _files[_count];

  tesseract.process(filePath, function(err, text){
    console.log('Processing ' + filePath);
    if(err) {
      console.log('Error while processing.');
      console.log(err);
      _callback();
    } else {
      //console.log(text);
      var exportedName = _this.exportPath + Date.now() + '-' + _files[_count];
      _this.isReceipt(text, function(isReceipt){
        if(isReceipt) {
          console.log('It\'s a receipt!');
          exportedName = exportedName + '_receipt';
        } else {
          console.log('I\'m not saying that this is NOT a receipt, but I couldn\'t identify it as such.')
        }
        fs.writeFile(exportedName + '.txt', text, function(err){
          if(err) {
            console.log(err);
            console.log('Error while exporting data for' + _files[_count] + '\n');
          } else {
            console.log('Data exported to: ' + exportedName + '.txt' + '\n');
          }
          if(_count === _files.length-1) {
            _callback();
          } else {
            _count++;
            _this.extract(_count, _files, _callback);
          }
        });
      });
    }
  });
};

Extractor.prototype.isReceipt = function(text, callback) {
  var _this = this,
      _text = text,
      _callback = callback,
      // meaning: words that we should look for in a receipt (regex)
      receiptIdentifiers = [/receipt/i, /total/i],
      isReceipt = false;

  _.each(receiptIdentifiers, function(identifier){
    var textMatch = _text.match(identifier);
    if(typeof textMatch !== "undefined" && textMatch !== null) {
      isReceipt = true;
    }
  });

  _callback(isReceipt);

}

var extractor = new Extractor();
extractor.process(function(){
  console.log('DONE!');
});