import { ItemDTO } from "src/dtos/receipt-dto";

export class Util {
  static isRounded(number: number): boolean {
    return number % 1 === 0;
  }

  static isMultipleOf(number: number, multiple: number): boolean {
    return number % multiple === 0;
  }

  static isDayOdd(date: string): boolean {
    return (new Date(date).getDate() % 2) !== 0;
  }

  static isPurchaseInRange(date: string, time: string): boolean {
    const fullPurchaseDate = new Date(`${date}T${time}:00`);
    const startDate = new Date(`${date}T14:00:00`);
    const endDate = new Date(`${date}T16:00:00`);

    return (fullPurchaseDate > startDate) && (fullPurchaseDate < endDate);
  }

  static calculateItemPoints(items: ItemDTO[]): number {
    return items.reduce((points, item) => {
      const { shortDescription, price} = item;
      if(shortDescription.trim().length % 3 === 0) {
        return points + Math.ceil(Number(price)*0.2);
      }
      return points;
    }, 0);
  }
}