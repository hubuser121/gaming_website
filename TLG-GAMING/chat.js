// Message schema (mongoose example)
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: String,
  pinned: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Admin sends message
app.post('/admin/chat/send', async (req, res) => {
  const { message, pinned } = req.body;
  try {
    const msg = new Message({ message, pinned: !!pinned });
    await msg.save();
    res.json({ success: true, message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all messages (players & admin)
app.get('/chat/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get pinned messages (players)
app.get('/chat/pinned', async (req, res) => {
  try {
    const pinnedMessages = await Message.find({ pinned: true }).sort({ timestamp: -1 });
    res.json(pinnedMessages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
