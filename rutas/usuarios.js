const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const ref = db.collection('usuarios'); // Coleccion de FireStore

  router.get('/', async (req, res) => {
    try {
      const snapshot = await ref.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(datos);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });

  return router;
};
