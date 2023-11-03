function addAnotherDay() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Gigs');
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  
  // Insert a new row after the last row
  sheet.insertRowAfter(lastRow);
  
  // Copy last row, formulas, and formatting
  sheet.getRange(lastRow, 1, 1, lastColumn).copyTo(sheet.getRange(lastRow + 1, 1, 1, lastColumn));
  
  // Clear out Date, Shift, and Time (assuming these are in columns 8, 4, 18 respectively)
  sheet.getRange(lastRow + 1, 8).clearContent();
  sheet.getRange(lastRow + 1, 4).clearContent();
  sheet.getRange(lastRow + 1, 18).clearContent();
  
  // Copy the job number from the previous row (assuming Job Number is in column 13)
  var jobNumber = sheet.getRange(lastRow, 13).getValue();
  sheet.getRange(lastRow + 1, 13).setValue(jobNumber);
  
  // Apply the same background color as the previous row to the new row
  var bgColor = sheet.getRange(lastRow, 1, 1, lastColumn).getBackground();
  sheet.getRange(lastRow + 1, 1, 1, lastColumn).setBackground(bgColor);

  // Set specific formulas and VLOOKUPs
  // For column C to look up the address of the location in column B on the Locations sheet
  sheet.getRange(lastRow + 1, 3).setFormula('=VLOOKUP(B' + (lastRow + 1) + ',Locations!A:B,2,FALSE)');
  
  // For column F to get the product of column D and E
  sheet.getRange(lastRow + 1, 6).setFormula('=D' + (lastRow + 1) + '*E' + (lastRow + 1));
  
  // For column J to get the email address of the client in column A from the Clients sheet
  sheet.getRange(lastRow + 1, 10).setFormula('=VLOOKUP(A' + (lastRow + 1) + ',Clients!A:B,2,FALSE)');
}
