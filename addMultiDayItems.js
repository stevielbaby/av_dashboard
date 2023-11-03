function addMultiDayItems(jobNumber, newItems) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Invoice Template');
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  // Generate a random background color
  var bgColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  
  // Assuming the Job Number is in column 12 (or 'L')
  for (var i = 1; i <= lastRow; i++) {
    var currentJobNumber = sheet.getRange(i, 12).getValue();
    
    if (currentJobNumber === jobNumber) {
      // Insert a new row after this row and populate it with the new items
      sheet.insertRowAfter(i);
      sheet.getRange(i + 1, 1, 1, lastColumn).setValues([newItems]);
      
      // Copy formatting from the previous row to the new row
      sheet.getRange(i, 1, 1, lastColumn).copyTo(sheet.getRange(i + 1, 1, 1, lastColumn), {formatOnly: true});
      
      // Apply the random background color
      sheet.getRange(i + 1, 1, 1, lastColumn).setBackground(bgColor);
      
      break;
    }
  }
}
