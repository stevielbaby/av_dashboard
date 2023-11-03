function autoSortSheet() {
  // Define the Spreadsheet and Sheet objects
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Gigs'); // Change to your sheet name if different
  
  // Get all values in the sheet
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var allValues = sheet.getRange(3, 1, lastRow - 2, lastCol).getValues();
  
  // Sort rows considering the "Done" status in Column I (index 8) and date in Column H (index 7)
  allValues.sort(function(a, b) {
    if (a[8] === "Done" && b[8] !== "Done") {
      return 1;
    }
    if (b[8] === "Done" && a[8] !== "Done") {
      return -1;
    }
    return a[7] > b[7] ? 1 : a[7] < b[7] ? -1 : 0;
  });
  
  // Write back the sorted rows to the sheet, starting at row 3
  sheet.getRange(3, 1, allValues.length, lastCol).setValues(allValues);
}
