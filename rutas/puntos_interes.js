const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const ref = db.collection('puntos_interes');

  router.get('/', async (req, res) => {
    try {
      let query = ref;

      if (req.query.idpunto_interes) {
        query = query.where('idpunto_interes', '==', parseInt(req.query.idpunto_interes));
      }
      if (req.query.nombre) {
        query = query.where('nombre', '==', req.query.nombre);
      }
      if (req.query.tipo) {
        query = query.where('tipo', '==', req.query.tipo);
      }
      if (req.query.idmunicipio_fk) {
        query = query.where('idmunicipio_fk', '==', parseInt(req.query.idmunicipio_fk));
      }

      const snapshot = await query.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener puntos de interés' });
    }
  });

  return router;
};
