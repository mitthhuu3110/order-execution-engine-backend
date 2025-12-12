export enum OrderStatus {
  PENDING = 'pending',
  ROUTING = 'routing',
  BUILDING = 'building',
  SUBMITTED = 'submitted',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
}

export enum OrderType {
  MARKET = 'market',
  // LIMIT = 'limit',    // For future implementation
  // SNIPER = 'sniper',  // For future implementation
}

export enum DexProvider {
  RAYDIUM = 'raydium',
  METEORA = 'meteora',
}

export interface Order {
  id: string;
  type: OrderType;
  status: OrderStatus;
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut?: number;
  price?: number;
  slippage: number;
  dexUsed?: DexProvider;
  txHash?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderCreateInput {
  type: OrderType;
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  slippage: number;
}

export interface OrderUpdateInput {
  status?: OrderStatus;
  amountOut?: number;
  price?: number;
  dexUsed?: DexProvider;
  txHash?: string;
  error?: string;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  dexUsed?: DexProvider;
  price?: number;
  txHash?: string;
  error?: string;
}

export interface OrderExecutionResult {
  success: boolean;
  order: Order;
  error?: string;
}
