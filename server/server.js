const express = require('express')
const  AWS = require('aws-sdk')

const app = express(); 
app.use(express.json());

// Configure AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: 'ACCESSKEY',
    secretAccessKey: 'SECRET',
    region: 'us-east-1' 
});
  
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const TableName = 'basicSitesTable'; // Replace with your DynamoDB table name
  
  app.get('/api/sites', (req, res) => {
    const params = {
      TableName
    };
  
    dynamodb.scan(params, (err, data) => {
      if (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Failed to fetch items' });
      } else {
        const items = data.Items;
        res.status(200).json(items);
      }
    });
  });

  app.post('/api/sites', (req, res) => {
    const { site, issueCount, id, tool} = req.body;
  
    const params = {
      TableName,
      Item: {
        site,
        issueCount,
        id,
        tool
      }
    };
    dynamodb.put(params, (err, data) => {
        if (err) {
          console.error('Error putting item:', err);
          res.status(500).json({ error: 'Failed to submit item' });
        } else {
          console.log('Item inserted successfully');
          res.status(200).json({ message: 'Item submitted successfully' });
        }
      });
    });
  
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });