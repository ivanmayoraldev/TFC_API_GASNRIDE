import express from 'express';

const routes = (db) => {
  const router = express.Router();
  const ref = db.collection('municipios');

  router.get('/', async (req, res) => {
    try {
      let query = ref;

      if (req.query.idmunicipio) {
        query = query.where('idmunicipio', '==', parseInt(req.query.idmunicipio));
      }
      if (req.query.nombre) {
        query = query.where('nombre', '==', req.query.nombre);
      }
      if (req.query.codigo_Territorial) {
        query = query.where('codigo_Territorial', '==', req.query.codigo_Territorial);
      }
      if (req.query.num_gasolineras) {
        query = query.where('num_gasolineras', '==', parseInt(req.query.num_gasolineras));
      }

      const snapshot = await query.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener municipios' });
    }
  });

  return router;
};

export default routes;