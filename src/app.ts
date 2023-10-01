import express, { Express } from 'express';
import { ReceiptController } from "./controllers/receipts.controller";

const app: Express = express();
app.use(express.json());

const receiptController = new ReceiptController();


const router = express.Router();

router.post('/receipts/process', receiptController.create);

router.get('/receipts/:id/points', receiptController.getPoints);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Server is running on ' + process.env.PORT);
});