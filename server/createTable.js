var AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'ACCESS',
    secretAccessKey: 'SECRET',
    region: 'us-east-1' 
});

var dynamodb = new AWS.DynamoDB();

var params = {
    AttributeDefinitions: [
        { AttributeName: 'site', AttributeType: 'S'},
        { AttributeName: 'tool', AttributeType: 'S'},
    ],
    KeySchema: [
        { AttributeName: 'site', KeyType: 'HASH' }, // Primary key
        { AttributeName: 'tool', KeyType: 'RANGE' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
    TableName: "basicSitesTable"
};
// Create the table.
dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });