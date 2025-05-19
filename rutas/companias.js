const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const ref = db.collection('companias');

  router.get('/', async (req, res) => {
    try {
      let query = ref;

      if (req.query.idcompania) {
        query = query.where('idcompania', '==', parseInt(req.query.idcompania));
      }

      if (req.query.nombre_comp) {
        query = query.where('nombre_comp', '==', req.query.nombre_comp);
      }


      const snapshot = await query.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener compañías' });
    }
  });

  return router;
};
