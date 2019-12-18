
//-----------------------------------------------
/**
* Function doGet: Parse received data from GET request, 
  get and store data which is corresponding with header row in Google Spreadsheet
*/
function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters
  var result = 'Ok'; // assume success
  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }
  else {
    var sheet_id = '10NShVMi_ipFIMIRWSsfOnRVHIBdgAijb2tzWqMHhOKk'; 		// Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		// get Active sheet
    var newRow = sheet.getLastRow() + 1;						
    var rowData = [];
	var Curr_Date = new Date(); 
    rowData[0] = Curr_Date; 											// Date in column A
	var Curr_Time = Utilities.formatDate(Curr_Date, "Asia/Jakarta", 'HH:mm:ss');
	rowData[1] = Curr_Time; 											// Time in column B
    for (var param in e.parameter) {
      Logger.log('In for loop, param=' + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'LDR': //Parameter
          rowData[2] = value; //Value in column C
          break;
        case 'Button': //Parameter
          rowData[3] = value; //Value in column D
          break;  
        case 'LDR1': //Parameter
          rowData[4] = value; //Value in column C
          break;
        case 'Button1': //Parameter
          rowData[5] = value; //Value in column D
          break;  
        case 'LDR2': //Parameter
          rowData[6] = value; //Value in column C
          break;
        case 'Button2': //Parameter
          rowData[7] = value; //Value in column D
          break;  
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));
    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }
  // Return result of operation
  return ContentService.createTextOutput(result);
}
/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}
//-----------------------------------------------
// End of file
//-----------------------------------------------
