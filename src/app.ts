import express, { Express } from 'express';
import { ReceiptController } from "./controllers/receipts.controller";

const app: Express = express();
app.use(express.json());

const receiptController = new ReceiptController();


// Definir un enrutador
const router = express.Router();

// Define la ruta POST '/receipts/process'
router.post('/receipts/process', receiptController.create);

router.get('/receipts/:id/points', receiptController.getPoints);

// Usar el enrutador en la aplicación
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on 3000');
});