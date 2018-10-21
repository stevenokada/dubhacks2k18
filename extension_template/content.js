var conversion = {"bags of rice": 300}

var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var r = /^\$?[0-9]+(\.[0-9][0-9])?$/;
            var original = text.match(r);

            if (original != null){


            var numeric = parseFloat(original.toString().substring(1)) * conversion["bags of rice"]



            var replacedText = text.replace(r, numeric.toString() + " bags of rice");

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }

          }
        }
    }
}
