export class ReceiptDTO {
  id?: string;
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: ItemDTO[];
  total: string;
}

export class ItemDTO {
  shortDescription: string;
  price: string;
}