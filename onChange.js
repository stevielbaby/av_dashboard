function onChange(e) {
  // Get the name of the sheet where the change happened
  var sheetName = e.source.getSheetName();
  
  // Proceed only if the change happened in the 'Gigs' sheet
  if (sheetName === 'Gigs') {
    var sheet = e.source.getSheetByName('Gigs');
    var lastRow = sheet.getLastRow();
    var jobNumberColumn = 13; // Column N
    
    // Generate the job number only if the cell in the job number column is empty
    if (sheet.getRange(lastRow, jobNumberColumn).getValue() === '') {
      // Generate a new job number. You can adjust the format.
      var newJobNumber = 'JOB' + Utilities.formatDate(new Date(), 'GMT', 'yyyyMMddHHmmss');
      
      // Set the new job number
      sheet.getRange(lastRow, jobNumberColumn).setValue(newJobNumber);
    }
  }
}
