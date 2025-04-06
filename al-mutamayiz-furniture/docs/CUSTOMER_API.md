# Customer Management API Documentation

## Base URL
`http://localhost:3000/api/customers`

## Authentication
All endpoints require admin authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Get All Customers
**GET** `/`

**Response:**
```json
{
  "customers": [
    {
      "id": 1,
      "name": "Ahmed Mohamed",
      "email": "ahmed@example.com",
      "contact_number": "+201234567890",
      "created_at": "2023-05-15T10:30:00.000Z",
      "orders": [
        {
          "id": 101,
          "order_number": "ORD-12345",
          "total_amount": 2500.00,
          "status": "completed"
        }
      ]
    }
  ]
}
```

### 2. Get Customer Orders
**GET** `/:id/orders`

**Response:**
```json
{
  "orders": [
    {
      "id": 101,
      "order_number": "ORD-12345",
      "total_amount": 2500.00,
      "status": "completed",
      "items": [
        {
          "product_name": "كنبة فخمة",
          "quantity": 1,
          "price": 2500.00
        }
      ]
    }
  ]
}
```

### 3. Update Customer
**PUT** `/:id`

**Request Body:**
```json
{
  "name": "Updated Name",
  "contact_number": "+201234567891"
}
```

**Response:**
```json
{
  "message": "Customer updated successfully",
  "customer": {
    "id": 1,
    "name": "Updated Name",
    "email": "ahmed@example.com",
    "contact_number": "+201234567891"
  }
}
```

### 4. Delete Customer
**DELETE** `/:id`

**Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

## Error Responses

**401 Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

**404 Not Found**
```json
{
  "message": "Customer not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "Error fetching customers",
  "error": "Error details..."
}