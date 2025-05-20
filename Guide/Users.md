# 🧑‍💻 User API – Usage Guide

This API allows authenticated users to view, update, delete their account, or change their password. All routes are protected and require a valid JWT token.

## 🔐 Authorization

All routes require the following header:

```http
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

### 📘 Get Current User Info

**Endpoint:**

```http
GET /api/users/me
```

Returns the authenticated user's info (excluding the password).

### 📘 Get User by ID

```http
GET /api/users/:id
```

Returns a specific user's public info by their ID.

**✅ Success (200):**

```json
{
  "_id": "user_id",
  "username": "test",
  "email": "test@example.com"
}
```

**❌ Error (e.g., 404 Not Found):**

```json
{ "message": "User not found" }
```

**❌ Error (e.g., 500 Internal Server Error):**

```json
{ "error": "Server Error" }
```

## ✏️ Update Current User

```http
PUT /api/users/update
```

Allows the current user to update their username.

**Request Body**

```json
{
  "username": "newUsername"
}
```

**✅ Success (200):**

```json
{
  "_id": "user_id",
  "username": "newUsername",
  "email": "john@example.com"
}
```

**❌ Error (e.g., 500 Internal Server Error):**

```json
{ "error": "Server Error" }
```

# 🔒 Change Password

```http
PUT /api/users/change-password
```

**Request Body**

```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

**✅ Success (200):**

```json
{
  "message": "Password updated successfully"
}
```

**❌ Error (e.g., 400 Bad Request):**

```json
{
  "message": "Current password is incorrect"
}
```

**❌ Error (e.g., 500 Internal Server Error):**

```json
{ "error": "Server Error" }
```

## ❌ Delete Account

```http
DELETE /api/users/delete
```

Deletes the authenticated user's account.

**✅ Success (204):**

```json
{
  "message": "Password updated successfully"
}
```

**❌ Error (e.g., 500 Internal Server Error):**

```json
{ "error": "Server Error" }
```
