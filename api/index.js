import companiasRoutes from '../rutas/companias.js';
import gasolinerasRoutes from '../rutas/gasolineras.js';
import municipiosRoutes from '../rutas/municipios.js';
import puntosInteresRoutes from '../rutas/puntos_interes.js';
import usuariosRoutes from '../rutas/usuarios.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/companias", companiasRoutes(db));
app.use("/gasolineras", gasolinerasRoutes(db));
app.use("/municipios", municipiosRoutes(db));
app.use("/puntos_interes", puntosInteresRoutes(db));
app.use("/usuarios", usuariosRoutes(db));

app.use(express.static(path.join(__dirname, "../public")));

export default function handler(req, res) {
  return app(req, res);
}