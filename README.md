# Order Execution Engine Backend

A high-performance order execution engine for decentralized exchanges (DEX) with WebSocket support. This engine supports market orders with DEX routing between Raydium and Meteora, with the ability to extend to other order types and DEXs.

## Features

- **Market Order Execution**: Immediate execution at the best available price
- **DEX Routing**: Automatically routes orders to the DEX with the best price (Raydium or Meteora)
- **WebSocket API**: Real-time order status updates
- **Concurrent Processing**: Handles multiple orders concurrently with rate limiting
- **Mock DEX Integration**: Simulated DEX responses for development and testing

## Prerequisites

- Node.js 18.0.0 or higher
- PostgreSQL 14 or higher
- Redis 6 or higher (for BullMQ)
- pnpm (recommended) or npm

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mitthhuu3110/order-execution-engine-backend.git
   cd order-execution-engine-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

## Project Structure

```
src/
├── config/       # Configuration files
├── controllers/  # Request handlers
├── models/       # Database models
├── services/     # Business logic
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
├── queue/        # BullMQ queue setup
├── ws/           # WebSocket handlers
└── app.ts        # Main application file
```

## API Documentation

### Submit an Order

```http
POST /api/orders/execute
Content-Type: application/json

{
  "type": "market",
  "tokenIn": "SOL",
  "tokenOut": "USDC",
  "amountIn": 1.0,
  "slippage": 0.5
}
```

### WebSocket Connection

After submitting an order, the connection will be upgraded to WebSocket to receive real-time updates:

```json
{
  "status": "pending" | "routing" | "building" | "submitted" | "confirmed" | "failed",
  "orderId": "uuid",
  "dexUsed": "raydium" | "meteora" | null,
  "price": 1.23,
  "txHash": "transaction-hash",
  "error": "error-message"
}
```

## Development

### Running Tests

```bash
pnpm test
# or
npm test
```

### Linting

```bash
pnpm lint
# or
npm run lint
```

### Formatting

```bash
pnpm format
# or
npm run format
```

## Extending the Engine

### Adding New Order Types

1. Add a new order type to the `OrderType` enum
2. Create a new handler in `services/order/order-types/`
3. Update the order factory to support the new type

### Adding New DEX Integrations

1. Create a new DEX service in `services/dex/`
2. Implement the `IDexService` interface
3. Add the new DEX to the DEX router

## License

MIT