var conversion = {"lbs of rice": 1/0.89, 
                  "meals": 1/8.0, 
                  "weeks of groceries": 1/160.0, 
                  "lbs of pork": 1/4.14};

// recursive solution
function walkText(node, parent) {
  if (node.nodeType == 3) {
    var text = node.nodeValue;
    //var r = /\.*\$\d+(\.\d\d)?\.*/g;
    var r = /^\$\d+(,\d{3})*\.?[0-9]?[0-9]?$/;
    var original = text.match(r);

    if (original != null){
      var priceText = original.toString().trim().replace(',','');
      if(priceText.charAt(0) == "$") {
        priceText = priceText.substring(1);
      }

      chrome.storage.sync.get("currency-type", function(result) {
        var conversion_type = result['currency-type'];

        var numeric = parseFloat(priceText) * conversion[conversion_type]
        var replacedText = text.replace(r, numeric.toFixed(2).toString() + " " + conversion_type);

        if (replacedText !== text) {
          parent.replaceChild(document.createTextNode(replacedText), node);
        }
      });
    }
  }


  if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      walkText(node.childNodes[i], node);
    }
  }
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    if(key == "currency-type") {
      location.reload();
      return;
    }
  }
});

walkText(document.body, document);