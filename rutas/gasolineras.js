const express = require('express');

const routes = (db) => {
  const router = express.Router();
  const ref = db.collection('gasolineras');

  router.get('/', async (req, res) => {
    try {
      let query = ref;

      if (req.query.idgasolinera) {
        query = query.where('idgasolinera', '==', parseInt(req.query.idgasolinera));
      }

      if (req.query.idMunicipioFK) {
        query = query.where('idMunicipioFK', '==', parseInt(req.query.idMunicipioFK));
      }

      if (req.query.idCompaniaFK) {
        query = query.where('idCompaniaFK', '==', parseInt(req.query.idCompaniaFK));
      }

      if (req.query.nombre_gas) {
        query = query.where('nombre_gas', '==', req.query.nombre_gas);
      }

      if (req.query.precio_gas95) {
        query = query.where('precio_gas95', '==', parseFloat(req.query.precio_gas95));
      }

      const snapshot = await query.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener gasolineras' });
    }
  });

  return router;
};

export default routes;