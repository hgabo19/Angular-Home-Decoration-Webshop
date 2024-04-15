export class WishlistItem {
  id?: string = '';
  decorationId: string;
  userId: string;
  name: string;
  price: number;
  date: Date;

  constructor(
    userId: string,
    decorationId: string,
    name: string,
    date: Date,
    price: number
  ) {
    this.userId = userId;
    this.decorationId = decorationId;
    this.name = name;
    this.date = date;
    this.price = price;
  }
}
