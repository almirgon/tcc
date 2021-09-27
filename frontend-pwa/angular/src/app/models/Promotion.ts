import { User } from "./User";

export class Promotion{
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  urlLink: string;
  voucher: string;
  date: string;
  numberLikes: number;
  soldBy: string;
  user: User
}