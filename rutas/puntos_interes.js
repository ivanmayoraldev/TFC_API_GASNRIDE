import express from 'express';

const routes = (db) => {
  const router = express.Router();
  const ref = db.collection('puntos_interes');

  router.get('/', async (req, res) => {
    try {
      let query = ref;

      if (req.query.idpunto_interes) {
        query = query.where('idpunto_interes', '==', parseInt(req.query.idpunto_interes));
      }

      if (req.query.idmunicipio_fk) {
        query = query.where('idmunicipio_fk', '==', parseInt(idmunicipio_fk));
      }

      if (req.query.nombre) {
        query = query.where('nombre', '==', req.query.nombre);
      }

      if (req.query.tipo) {
        query = query.where('tipo', '==', req.query.tipo);
      }

      if (req.query.descripcion) {
        query = query.where('descripcion', '==', req.query.descripcion);
      }

      if (req.query.url_imagen_poi) {
        query = query.where('url_imagen_poi', '==', req.query.url_imagen_poi);
      }

      if (req.query.url_poi) {
        query = query.where('url_poi', '==', req.query.url_poi);
      }

      const snapshot = await query.get();
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      res.json(datos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener puntos de interes' });
    }
  });

  return router;
};

export default routes;
