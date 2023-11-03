function addAndClearRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get the last row number in the sheet
  var lastRow = sheet.getLastRow();
  
  // Insert a new row after the last row
  sheet.insertRowAfter(lastRow);
  
  // Get range corresponding to the last row and the newly inserted row
  var lastRowRange = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn());
  var newRowRange = sheet.getRange(lastRow + 1, 1, 1, sheet.getLastColumn());
  
  // Copy formatting and formulas from the last row to the new row
  lastRowRange.copyTo(newRowRange);
  
  // Capture the formulas from the new row
  var formulas = newRowRange.getFormulas()[0];
  
  // Clear the content of the new row
  newRowRange.clearContent();
  
  // Reapply the formulas
  newRowRange.setFormulas([formulas]);
  
  // Generate a new job number and insert it into the first cell of the new row
  var jobNumber = 'JOB' + Utilities.formatDate(new Date(), 'GMT', 'yyyyMMddHHmmss');
  sheet.getRange(lastRow + 1, 12).setValue(jobNumber);
}
