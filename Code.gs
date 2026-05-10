// ===== DIGITAL STORE — Google Apps Script Backend =====
// Deploy as Web App: Execute as "Me", Access "Anyone"

const SHEET_NAME = 'Orders';
const scriptProp = PropertiesService.getScriptProperties();

// Run this ONCE to link your spreadsheet
function initialSetup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', spreadsheet.getId());

  // Create headers if sheet is new
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postal', 'payment', 'items', 'subtotal', 'total']);
    sheet.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#0066ff').setFontColor('#ffffff');
  }
}

// Handles POST requests from checkout form
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    const newRow = headers.map(header =>
      header === 'Date' ? new Date() : (e.parameter[header] || '')
    );

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
