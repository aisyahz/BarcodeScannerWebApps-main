// Variables
var lastScannedBarCode = "";
var listOfScannedBarCodes = [];

// Vue.js instance setup
var app = new Vue({
    el: '#app',
    data: {
        scannedProducts: listOfScannedBarCodes
    },
    methods: {
        startBarcodeScanner() {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#scanner-container"),
                },
                decoder: {
                    readers: ["ean_reader"],
                },
            }, function (err) {
                if (err) {
                    console.error("Error initializing Quagga:", err);
                    return;
                }
                Quagga.start();
            });

            Quagga.onDetected(function (result) {
                var barcode = result.codeResult.code;
                handleScannedBarcode(barcode);
                Quagga.stop();
            });
        },
        // ... (other methods go here)
 
// Handle detected barcode
function handleScannedBarcode(barcode) {
    if (!checkIfScannedCodeExists(barcode)) {
        addToTableIfCodeFound(barcode);
        listOfScannedBarCodes.push(barcode);
    }
}

// ... (rest of your existing functions)

// Global event handler
document.onkeypress = onGlobalKeyPressed;

function onGlobalKeyPressed(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

    if (charCode != 13) { // ascii 13 is return key
        lastScannedBarCode += String.fromCharCode(charCode);
    } else { // barcode reader indicate code finished with "enter"
        var lastCode = lastScannedBarCode;

        if (checkIfScannedCodeExists(lastCode) == false) {
            console.log(lastCode);
            listOfScannedBarCodes.push(lastCode);
            addToTableIfCodeFound(lastCode);            
        }

        lastScannedBarCode = ""; // zero out last code (so we do not keep adding)
    }    
}

function checkIfScannedCodeExists(scannedCode) {
    var foundIt = false;

    for (var i = 0; i < listOfScannedBarCodes.length; i++) {
        if (listOfScannedBarCodes[i] == scannedCode)
            foundIt = true;
    }

    return foundIt;
}

function addToTableIfCodeFound(lastCode) {	
	var ref = firebase.database().ref("/products/" + lastCode);

    ref.once('value', function (snapshot) {
        var obj = snapshot.val();
		
		if (obj != undefined) {
			addDynamicProductElement(lastCode, obj.name, (obj.description || ""));
            removeElement("noitems");						
		}		

    });
}

function addDynamicProductElement(code, name, description) {
    var table = document.getElementById('table1');
    var tr = document.createElement('tr');

    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));

    tr.cells[0].appendChild(document.createTextNode(code))
    tr.cells[1].appendChild(document.createTextNode(name));
    tr.cells[2].appendChild(document.createTextNode(description));

    table.appendChild(tr);
}

function removeElement(nameStr) {
    // Removes an element from the document
    var element = document.getElementById(nameStr);
	
	if ((element != undefined) && (element.parentNode != undefined))
       element.parentNode.removeChild(element);
}

}
});