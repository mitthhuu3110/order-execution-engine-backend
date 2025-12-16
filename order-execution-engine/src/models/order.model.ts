import { OrderStatus } from '../types/order-status';
import { OrderType } from '../types/order-type';
import { Dex } from '../types/dex';

export interface Order {
  id: string;

  type: OrderType;

  tokenIn: string;
  tokenOut: string;
  amountIn: number;

  status: OrderStatus;

  chosenDex?: Dex;

  quotedPrice?: number;
  executedPrice?: number;

  txHash?: string;

  errorReason?: string;

  createdAt: Date;
  updatedAt: Date;
}