const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/postulacion?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const pdfSchema = new mongoose.Schema({
  id_candidato: {
    type: Number,
    required: true,
  },
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

