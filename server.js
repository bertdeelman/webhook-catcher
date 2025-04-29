const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let events = [];
let acceptingWebhooks = true;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/webhook/:customer', (req, res) => {
  if (!acceptingWebhooks) {
    return res.status(503).send('Webhook catcher is OFF');
  }

  const customer = req.params.customer;
  const event = {
    id: Date.now(),
    customer,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  };

  events.unshift(event);
  if (events.length > 100) {
    events.pop();
  }

  res.status(200).send('Webhook received');
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.post('/toggle', (req, res) => {
  acceptingWebhooks = !acceptingWebhooks;
  res.json({ acceptingWebhooks });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
