function doPost(e) {
  var sheet = SpreadsheetApp.openById("1rFuNcONn84zRmshcZ5QoaCYvIBmjIpU3RdMYAopjA70").getActiveSheet();

  var name = e.parameter.name || "";
  var email = e.parameter.email || "";
  var score = e.parameter.score || "";

  sheet.appendRow([name, email, score, new Date()]);

  MailApp.sendEmail(
    "ankamsravya3@gmail.com",
    "New Online Quiz Response",
    "Name: " + name + "\nEmail: " + email + "\nScore: " + score
  );

  return ContentService.createTextOutput("Success");
}
