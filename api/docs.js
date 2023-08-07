const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pdf_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const pdfSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tipoDocumento: {
    type: String,
    required: true,
  },
  pdfPath: {
    type: String,
    required: true,
  }
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;

