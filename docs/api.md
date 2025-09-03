# PetPicShowcase API Documentation

This document provides comprehensive documentation for the PetPicShowcase API, including endpoints, request/response formats, authentication requirements, and usage examples.

## Authentication

All API endpoints require authentication unless explicitly marked as public. Authentication is handled using session cookies for browser-based requests and API tokens for programmatic access.

### Session-based Authentication

For browser-based requests, authentication is handled using session cookies. Users can authenticate by sending a POST request to the `/login` endpoint with their credentials.

### API Token Authentication

For programmatic access, API tokens can be used. Tokens should be included in the `Authorization` header of the request using the Bearer scheme:

```
Authorization: Bearer YOUR_API_TOKEN
```

## Endpoints

### User Management

#### POST /api/register

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "subscriptionTier": "basic",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### POST /api/login

Authenticate a user and create a session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "subscriptionTier": "basic"
}
```

#### POST /api/logout

End the current user session.

**Response:**
```json
{
  "success": true
}
```

### Gallery Management

#### GET /api/galleries

Get all galleries for the authenticated user.

**Response:**
```json
{
  "galleries": [
    {
      "id": "gallery-123",
      "title": "My Pet Gallery",
      "description": "Photos of my pet",
      "templateId": "template-1",
      "photoCount": 10,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/galleries

Create a new gallery.

**Request Body:**
```json
{
  "title": "My Pet Gallery",
  "description": "Photos of my pet",
  "templateId": "template-1"
}
```

**Response:**
```json
{
  "id": "gallery-123",
  "title": "My Pet Gallery",
  "description": "Photos of my pet",
  "templateId": "template-1",
  "userId": "user-123",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### GET /api/galleries/:id

Get a specific gallery by ID.

**Response:**
```json
{
  "id": "gallery-123",
  "title": "My Pet Gallery",
  "description": "Photos of my pet",
  "templateId": "template-1",
  "userId": "user-123",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "photos": [
    {
      "id": "photo-1",
      "imageUrl": "https://example.com/photo1.jpg",
      "caption": "My pet",
      "order": 0
    }
  ],
  "template": {
    "id": "template-1",
    "name": "Classic",
    "description": "A clean, minimalist design",
    "thumbnail": "https://example.com/template1.jpg"
  }
}
```

#### PUT /api/galleries/:id

Update a gallery.

**Request Body:**
```json
{
  "title": "Updated Gallery Title",
  "description": "Updated description",
  "templateId": "template-2"
}
```

**Response:**
```json
{
  "id": "gallery-123",
  "title": "Updated Gallery Title",
  "description": "Updated description",
  "templateId": "template-2",
  "userId": "user-123",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

#### DELETE /api/galleries/:id

Delete a gallery.

**Response:**
```json
{
  "success": true
}
```

### Photo Management

#### POST /api/photos

Add a photo to a gallery.

**Request Body:**
```json
{
  "galleryId": "gallery-123",
  "imageData": "base64-encoded-image-data",
  "caption": "My pet",
  "order": 0
}
```

**Response:**
```json
{
  "id": "photo-1",
  "galleryId": "gallery-123",
  "imageUrl": "https://example.com/photo1.jpg",
  "caption": "My pet",
  "order": 0,
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### PUT /api/photos/:id

Update a photo.

**Request Body:**
```json
{
  "caption": "Updated caption",
  "order": 1
}
```

**Response:**
```json
{
  "id": "photo-1",
  "galleryId": "gallery-123",
  "imageUrl": "https://example.com/photo1.jpg",
  "caption": "Updated caption",
  "order": 1,
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

#### DELETE /api/photos/:id

Delete a photo.

**Response:**
```json
{
  "success": true
}
```

#### POST /api/photos/reorder

Reorder photos in a gallery.

**Request Body:**
```json
{
  "galleryId": "gallery-123",
  "photoOrders": [
    { "id": "photo-1", "order": 2 },
    { "id": "photo-2", "order": 1 },
    { "id": "photo-3", "order": 0 }
  ]
}
```

**Response:**
```json
{
  "success": true
}
```

### Template Management

#### GET /api/templates

Get all available templates.

**Response:**
```json
{
  "templates": [
    {
      "id": "template-1",
      "name": "Classic",
      "description": "A clean, minimalist design",
      "thumbnail": "https://example.com/template1.jpg"
    },
    {
      "id": "template-2",
      "name": "Modern",
      "description": "Bold typography and dynamic layouts",
      "thumbnail": "https://example.com/template2.jpg"
    }
  ]
}
```

#### GET /api/templates/:id

Get a specific template by ID.

**Response:**
```json
{
  "id": "template-1",
  "name": "Classic",
  "description": "A clean, minimalist design",
  "thumbnail": "https://example.com/template1.jpg",
  "cssClass": "template-classic"
}
```

### Subscription Management

#### POST /api/subscriptions/create-checkout

Create a checkout session for subscription.

**Request Body:**
```json
{
  "plan": "premium",
  "successUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

**Response:**
```json
{
  "sessionId": "cs_123",
  "url": "https://checkout.stripe.com/pay/cs_123"
}
```

#### GET /api/subscriptions/current

Get the current user's subscription.

**Response:**
```json
{
  "id": "sub-123",
  "plan": "premium",
  "status": "active",
  "currentPeriodEnd": "2023-02-01T00:00:00.000Z"
}
```

#### POST /api/subscriptions/cancel

Cancel the current user's subscription.

**Response:**
```json
{
  "success": true
}
```

### Social Features

#### GET /api/social/feed

Get the social feed.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "photos": [
    {
      "id": "photo-1",
      "imageUrl": "https://example.com/photo1.jpg",
      "caption": "My pet",
      "user": {
        "id": "user-123",
        "email": "user@example.com"
      },
      "likes": 5,
      "comments": 2,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST /api/social/like

Like a photo.

**Request Body:**
```json
{
  "photoId": "photo-1"
}
```

**Response:**
```json
{
  "success": true,
  "likeId": "like-123"
}
```

#### DELETE /api/social/like/:photoId

Unlike a photo.

**Response:**
```json
{
  "success": true
}
```

#### POST /api/social/comment

Add a comment to a photo.

**Request Body:**
```json
{
  "photoId": "photo-1",
  "content": "Great photo!"
}
```

**Response:**
```json
{
  "id": "comment-123",
  "photoId": "photo-1",
  "userId": "user-123",
  "content": "Great photo!",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### DELETE /api/social/comment/:id

Delete a comment.

**Response:**
```json
{
  "success": true
}
```

### Challenge Management

#### GET /api/challenges

Get all challenges.

**Query Parameters:**
- `status` (optional): Filter by status (active, upcoming, past)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "challenges": [
    {
      "id": "challenge-123",
      "title": "Cutest Nap",
      "description": "Share photos of your pet napping",
      "startDate": "2023-01-01T00:00:00.000Z",
      "endDate": "2023-01-31T00:00:00.000Z",
      "submissionCount": 10,
      "createdBy": {
        "id": "user-123",
        "email": "user@example.com"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

#### GET /api/challenges/:id

Get a specific challenge by ID.

**Response:**
```json
{
  "id": "challenge-123",
  "title": "Cutest Nap",
  "description": "Share photos of your pet napping",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-01-31T00:00:00.000Z",
  "createdBy": {
    "id": "user-123",
    "email": "user@example.com"
  },
  "submissions": [
    {
      "id": "submission-1",
      "photoId": "photo-1",
      "userId": "user-456",
      "user": {
        "email": "user2@example.com"
      },
      "photo": {
        "imageUrl": "https://example.com/photo1.jpg",
        "caption": "My pet napping"
      },
      "createdAt": "2023-01-02T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/challenges

Create a new challenge.

**Request Body:**
```json
{
  "title": "Cutest Nap",
  "description": "Share photos of your pet napping",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-01-31T00:00:00.000Z"
}
```

**Response:**
```json
{
  "id": "challenge-123",
  "title": "Cutest Nap",
  "description": "Share photos of your pet napping",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2023-01-31T00:00:00.000Z",
  "createdBy": "user-123",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

#### POST /api/challenges/:id/submit

Submit a photo to a challenge.

**Request Body:**
```json
{
  "photoId": "photo-1"
}
```

**Response:**
```json
{
  "id": "submission-1",
  "challengeId": "challenge-123",
  "photoId": "photo-1",
  "userId": "user-123",
  "createdAt": "2023-01-02T00:00:00.000Z"
}
```

#### DELETE /api/challenges/:challengeId/submit/:photoId

Remove a submission from a challenge.

**Response:**
```json
{
  "success": true
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages in case of failure.

### Error Response Format

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or invalid credentials
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `INTERNAL_ERROR`: Server error

## Rate Limiting

API requests are subject to rate limiting to prevent abuse. The current limits are:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit information is included in the response headers:

- `X-RateLimit-Limit`: The maximum number of requests allowed per minute
- `X-RateLimit-Remaining`: The number of requests remaining in the current window
- `X-RateLimit-Reset`: The time at which the current rate limit window resets (Unix timestamp)

When the rate limit is exceeded, the API returns a 429 Too Many Requests response with a Retry-After header indicating how long to wait before making another request.

## Webhooks

PetPicShowcase provides webhooks for real-time notifications of events. Webhook endpoints can be configured in the user's account settings.

### Available Webhook Events

- `gallery.created`: A new gallery is created
- `gallery.updated`: A gallery is updated
- `gallery.deleted`: A gallery is deleted
- `photo.added`: A photo is added to a gallery
- `photo.updated`: A photo is updated
- `photo.deleted`: A photo is deleted
- `subscription.created`: A subscription is created
- `subscription.updated`: A subscription is updated
- `subscription.canceled`: A subscription is canceled
- `challenge.created`: A challenge is created
- `challenge.submission.added`: A submission is added to a challenge

### Webhook Payload Format

```json
{
  "event": "gallery.created",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "data": {
    "id": "gallery-123",
    "title": "My Pet Gallery",
    "userId": "user-123"
  }
}
```

## SDK and Client Libraries

PetPicShowcase provides official client libraries for easy integration:

- JavaScript/TypeScript: `@petpicshowcase/js-sdk`
- Python: `petpicshowcase-python`
- Ruby: `petpicshowcase-ruby`
- PHP: `petpicshowcase/php-sdk`

## API Versioning

The API is versioned to ensure backward compatibility. The current version is v1.

API versions are specified in the URL path:

```
https://api.petpicshowcase.com/v1/galleries
```

## Support

For API support, please contact api-support@petpicshowcase.com or visit our developer forum at https://developers.petpicshowcase.com.

