function onEdit(e) {
  var sheet = e.source.getActiveSheet(); // Get the active sheet
  
  // Check if the active sheet is 'Gigs'
  if (sheet.getName() !== 'Gigs') {
    return; // Exit the function if it's not the 'Gigs' sheet
  }
  
  var range = e.range;
  
  // Your existing code
  if (range.getColumn() == 9) {
    var status = range.getValue();
    
    if (status === 'Done') {
      var ui = SpreadsheetApp.getUi();
      var response = ui.alert('Would you like to generate an invoice?', ui.ButtonSet.YES_NO);
      
      if (response == ui.Button.YES) {
        generateInvoice(range.getRow());
        
        
        

      }
    }
  }
}


function generateInvoice(row) {
  var gigSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Gigs');
  var invoiceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Invoice Template');
  var clientSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Clients'); 
  var data = gigSheet.getRange(row, 1, 1, 17).getValues()[0];  // Assuming Q:Q is the 17th column
  
  var client = data[0];  // A:A
  var location = data[1];  // B:B
  var shift = data[3];  // D:D
  var hourlyRate = data[4];  // E:E
  var productionCompany = data[6];  // G:G
  var showDate = data[7];  // H:H
  var position = data[10];  // K:K
  var jobNumber = data[11];  // L:L
  var showName = data[16];  // Q:Q

  
  // Add these lines to get the street address and city, state, zip from the Clients sheet.
// Assuming that the client name in the Clients sheet is in column A and is unique.
var clientNames = clientSheet.getRange('A:A').getValues();
var clientRowIndex = -1;
for (var i = 0; i < clientNames.length; i++) {
  if (clientNames[i][0] === client) {
    clientRowIndex = i + 1;
    break;
  }
}

if (clientRowIndex !== -1) {
  var streetAddress = clientSheet.getRange('B' + clientRowIndex).getValue();
  var cityStateZip = clientSheet.getRange('C' + clientRowIndex).getValue();
  var attnValue = clientSheet.getRange('E' + clientRowIndex).getValue();  // Get the ATTN value
  var phoneNumber = clientSheet.getRange('G' + clientRowIndex).getValue();  // Get the phone number
} else {
  var streetAddress = '';
  var cityStateZip = '';
  var attnValue = ''; 
  var phoneNumber = '';
}

   invoiceSheet.activate();

// Get the 'InvoiceNumbers' sheet
  var invoiceNumbersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('config');
  
  // Search for the client's last invoice number
var lastRow = invoiceNumbersSheet.getLastRow();
var clientColumn = invoiceNumbersSheet.getRange('A3:A' + lastRow).getValues();
var invoiceNumberColumn = invoiceNumbersSheet.getRange('B3:B' + lastRow).getValues();

var lastInvoiceNumber = "0"; // Default value
var rowIndexToUpdate = -1; // To keep track of which row to update
for (var i = 0; i < clientColumn.length; i++) {
  if (clientColumn[i][0] === client) {
    lastInvoiceNumber = invoiceNumberColumn[i][0];
    rowIndexToUpdate = i + 3; // +3 because the range starts at A3
    break;
  }
}

if (typeof lastInvoiceNumber === 'string') {
  var numericPart = parseInt(lastInvoiceNumber.match(/\d+/)[0] || "0");
  // ... (rest of the code)
} else {
  Logger.log("lastInvoiceNumber is not a string. It's a " + typeof lastInvoiceNumber);
  Logger.log("Value: " + lastInvoiceNumber);
  return;
}

// Extract numeric part and increment
var numericPart = parseInt(lastInvoiceNumber.match(/\d+/)[0] || "0");
var newNumericPart = numericPart + 1;

// Replace the numeric part in the existing string
var newInvoiceNumber = lastInvoiceNumber.replace(/\d+/, newNumericPart);

if (rowIndexToUpdate != -1) {
  // Update the existing row
  invoiceNumbersSheet.getRange(rowIndexToUpdate, 2).setValue(newInvoiceNumber);
} else {
  // If the client is new, append a new row
  invoiceNumbersSheet.appendRow([client, newInvoiceNumber]);
}

// Populate the new invoice number in the Invoice Template
invoiceSheet.getRange('H7').setValue(newInvoiceNumber);  // Assuming H7 is where the invoice number should go

// Initialize lineItems array
  var lineItems = [];

// Loop through the Gigs sheet to find rows with the same job number
for (var i = 1; i <= gigSheet.getLastRow(); i++) {
var rowData = gigSheet.getRange(i, 1, 1, 18).getValues()[0];  // Adjust this range based on your actual columns
if (rowData[12] === jobNumber) {  // Assuming Job Number is in column 13
  lineItems.push(rowData);
}
}

// Loop through lineItems and populate the Invoice sheet
for (var j = 0; j < lineItems.length; j++) {
var item = lineItems[j];

}
  
  // Populate the Invoice Template Sheet
  invoiceSheet.getRange('B12').setValue(client);
  invoiceSheet.getRange('F20').setValue(location);
  invoiceSheet.getRange('F23').setValue(shift);
  invoiceSheet.getRange('G23').setValue(hourlyRate);
  invoiceSheet.getRange('C18').setValue(productionCompany);
  invoiceSheet.getRange('B23').setValue(showDate);
  invoiceSheet.getRange('C23').setValue(position);
  invoiceSheet.getRange('C20').setValue(jobNumber);
  invoiceSheet.getRange('F18').setValue(showName);
  invoiceSheet.getRange('B13').setValue(streetAddress);  // Street Address
  invoiceSheet.getRange('B14').setValue(cityStateZip);   // City, State, Zip
  invoiceSheet.getRange('C11').setValue(attnValue);      // ATTN Value
  invoiceSheet.getRange('B15').setValue(phoneNumber);    


  // You can also send an email here if needed.
}

