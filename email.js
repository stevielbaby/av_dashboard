function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Create custom menu
  ui.createMenu('Invoice Automation')
      .addItem('Create Invoice Email Draft', 'createInvoiceEmailDraft')
      .addToUi();
}

function createInvoiceEmailDraft() {
  // Access the spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Invoice Template");  // Assume the invoice details are in a sheet named "Invoice"
  var clientSheet = spreadsheet.getSheetByName("Clients"); // Assume client details are in a sheet named "ClientS"
  
  // Retrieve client name from the "Invoice" sheet at cell B12
  var clientName = sheet.getRange("B12").getValue();
  
  // Lookup the corresponding email address from the "Client" sheet
  var clientData = clientSheet.getRange("A:D").getValues();  // Assume column A contains client names and column B contains emails
  var email = "";
  for (var i = 0; i < clientData.length; i++) {
    if (clientData[i][1] === clientName) {
      email = clientData[i][4];
      break;
    }
  }
  
  // Retrieve other details from "Invoice" sheet
  // (same as before, no changes here)
  var totalHoursWorked = sheet.getRange("F23").getValue();
  var hourlyRate = sheet.getRange("G23").getValue();
  var additionalCosts = sheet.getRange("H23").getValue();
  var totalInvoiceAmount = sheet.getRange("I32").getValue();
  var paymentDueDate = sheet.getRange("H10").getValue();
  
  // Retrieve the show name from the "Invoice" sheet at cell C18
  var showName = sheet.getRange("C18").getValue();
  
  // Construct the email subject
  var subject = showName ? 
    `Invoice for Recent Engagement with ${showName}` : 
    "Invoice for Recent Engagement";

  // Populate the email body
  var emailBody = `Dear ${clientName},

I hope this email finds you well. I am pleased to send over the invoice for my recent engagement. The invoice details are as follows:

- Total Hours Worked: ${totalHoursWorked}
- Hourly Rate: $${hourlyRate}
- Additional Costs: $${additionalCosts}
- Total Invoice Amount: $${totalInvoiceAmount}

Payment is due by ${paymentDueDate}. Acceptable forms of payment include Zelle, Direct Deposit, Bill.com, check, and now also Electronic Funds Transfer (EFT). Please make checks and EFT payments payable to Mavriik Media Group, LLC.

Should you find any inconsistencies in the invoice or if you need any additional information, please do not hesitate to contact me for the necessary adjustments.

I appreciate your prompt attention to this invoice and am enthusiastic about our continued collaboration.

Best regards,
Steven Grier`;
  
  // Create the email draft
  GmailApp.createDraft(email, subject, emailBody);
}

