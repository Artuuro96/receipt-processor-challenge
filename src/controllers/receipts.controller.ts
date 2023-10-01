import { ReceiptDTO } from "../dtos/receipt-dto";
import { v4 as uuidV4 } from "uuid";
import { ReceiptResponseDTO } from "../dtos/receipt-response.dto";
import { Request, Response } from "express";
import { Util } from "../util/util";

const receipts: ReceiptDTO[] = [];
const MULTIPLE = 0.25;

export class ReceiptController {
  constructor() {
    this.getPoints = this.getPoints.bind(this);
  }

  create(req: Request<ReceiptDTO>, res: Response): Response<ReceiptResponseDTO> {
    const id = uuidV4();
    const receipt = {
      ...req.body,
      id,
    } as ReceiptDTO;
    receipts.push(receipt);
    return res.json({
      id: receipt.id
    });
  };

  getPoints(req: Request, res: Response): Response<{ points: number}> {
    const { id } = req.params
    const receipt = receipts.find(receipt => receipt.id == id);
    if(!receipt) {
      return res.status(404).json({
        message: "Receipt Not Found"
      });
    }
    return res.json({
      points: this.calculatePoints(receipt),
    });
  }

  private calculatePoints(receipt: ReceiptDTO): number {
    let points = 0;
    const total = Number(receipt.total);
    const alfaNumRegx = new RegExp(/[A-Za-z0-9_]/);

    for (const char of receipt.retailer) {
      if(alfaNumRegx.test(char)) {
        points++;
      }
    } 

    if(Util.isRounded(total)) {
      points += 50;
    }

    if(Util.isMultipleOf(total, MULTIPLE)) {
      points += 25;
    }
    points += Math.floor(receipt.items.length / 2) * 5;

    if(Util.isDayOdd(receipt.purchaseDate)) {
      points += 6;
    }

    points += Util.calculateItemPoints(receipt.items)

    if(Util.isPurchaseInRange(receipt.purchaseDate, receipt.purchaseTime)) {
      points += 10;
    }

    return points;
  }
}

