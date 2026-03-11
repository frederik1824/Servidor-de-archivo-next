const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Directorio para guardar las fotos (Se crea si no existe)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Servir la carpeta de fotos de forma pública
app.use('/uploads', express.static(uploadDir));

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'proof-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Límite aumentado a 10MB
});

app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se envió ninguna foto' });

    // IMPORTANTE: Aquí generamos la URL pública usando tu IP y el PUERTO DE HOST (3001)
    const fileUrl = `http://72.62.167.179:3001/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => console.log(`🚀 Media Server listo en puerto ${PORT}`));
