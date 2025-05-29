const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/jj2025', {useNewUrlParser: true, useUnifiedTopology: true});

// Stream status model
const StreamStatus = mongoose.model('StreamStatus', {
  isLive: Boolean,
  lastStarted: Date,
  broadcasterId: String
});

app.use(cors());
app.use(express.json());

// API to check stream status
app.get('/api/stream/status', async (req, res) => {
  const status = await StreamStatus.findOne();
  res.json(status || {isLive: false});
});

// API to start stream
app.post('/api/stream/start', async (req, res) => {
  const currentStatus = await StreamStatus.findOne();
  
  if (currentStatus && currentStatus.isLive) {
    return res.status(400).json({error: "Live stream is already ongoing."});
  }
  
  await StreamStatus.deleteMany({});
  const newStatus = new StreamStatus({
    isLive: true,
    lastStarted: new Date(),
    broadcasterId: req.body.broadcasterId
  });
  
  await newStatus.save();
  res.json({success: true});
});

// API to stop stream
app.post('/api/stream/stop', async (req, res) => {
  await StreamStatus.deleteMany({});
  res.json({success: true});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
