# 🧑‍💻 Friend Requests API – Usage Guide

This API allows authenticated users to manage friend requests and friendships, including sending, accepting, declining friend requests, and retrieving friend and friend request lists. All routes are protected and require a valid JWT token.

## 🔐 Authorization

All routes require the following header:

```http
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

## 📘 Send Friend Request

**Endpoint:**

```http
POST /api/friends/:id/send-request
```

Sends a friend request to the user with the specified `id`.

### ✅ Success (200):

```json
{ "message": "Friend request sent" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "Already requested or friends" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "User not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Accept Friend Request

**Endpoint:**

```http
POST /api/friends/:id/accept-request
```

Accepts a friend request from the user with the specified `id`. Adds both users to each other's friends list and removes the request.

### ✅ Success (200):

```json
{ "message": "Friend request accepted" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "No friend request from this user" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "User not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Decline Friend Request

**Endpoint:**

```http
DELETE /api/friends/:id/decline-request
```

Declines a friend request from the user with the specified `id`. Removes the request from the authenticated user's friend requests list.

### ✅ Success (200):

```json
{ "message": "Friend request declined" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "No friend request from this user" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "User not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Get Friend Requests List

**Endpoint:**

```http
GET /api/friends/requests-list
```

Returns a list of user IDs who have sent friend requests to the authenticated user.

### ✅ Success (200):

```json
["user_id1", "user_id2"]
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Get Friends List

**Endpoint:**

```http
GET /api/friends/friends-list
```

Returns a list of user IDs who are friends with the authenticated user.

### ✅ Success (200):

```json
["user_id1", "user_id2"]
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 🗂️ Route Summary

| Method | Endpoint                           | Description                         |
| ------ | ---------------------------------- | ----------------------------------- |
| POST   | `/api/friends/:id/send-request`    | Send a friend request               |
| POST   | `/api/friends/:id/accept-request`  | Accept a friend request             |
| DELETE | `/api/friends/:id/decline-request` | Decline a friend request            |
| GET    | `/api/friends/requests-list`       | Get list of pending friend requests |
| GET    | `/api/friends/friends-list`        | Get list of friends                 |
