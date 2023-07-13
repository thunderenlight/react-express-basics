// Load the AWS SDK for JS
var AWS = require("aws-sdk");
var fs = require("fs");
AWS.config.update({region: "us-east-1"});

// -----------------------------------------
// Create the document client interface for DynamoDB
var documentClient = new AWS.DynamoDB.DocumentClient();

console.log("Loading site data into DynamoDB");

var siteData = JSON.parse(fs.readFileSync('../dummyData.json', 'utf8'));
siteData.forEach(function(site) {
  var params = {
    TableName: "basicSitesTable",
    Item: {
      "user":  site.user,
      "site": site.site,
      "id":  site.id,
      "issueCount": site.issueCount,
      "tool": site.tool
    }
  };

  documentClient.put(params, function(err, data) {
    if (err) {
      console.error("Can't add site. Darn. Well I guess TE needs to write better scripts.");
    } else {
      console.log("Succeeded adding an item for this site: ", site.site);
    }
  });
});