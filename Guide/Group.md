# 🧑‍💻 Groups API – Usage Guide

This API allows authenticated users to create, join, leave, and manage groups, as well as retrieve group information. All routes are protected and require a valid JWT token. Note that group posts are only accessible to group members (implementation pending).

## 🔐 Authorization

All routes require the following header:

```http
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

## 📘 Create Group

**Endpoint:**

```http
POST /api/groups/create
```

Creates a new group with the authenticated user as the creator and admin.

**Body:**

```json
{
  "name": "Group name",
  "description": "Group description",
  "isClosed": false
}
```

### ✅ Success (201):

```json
{
  "message": "Group created successfully",
  "data": {
    "_id": "group_id",
    "name": "Group name",
    "description": "Group description",
    "isClosed": false,
    "members": ["user_id"],
    "admins": ["user_id"],
    "createdBy": "user_id",
    "createdAt": "2025-05-25T12:13:00Z"
  }
}
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Get All Groups

**Endpoint:**

```http
GET /api/groups/
```

Returns a list of all groups, including their members' usernames.

### ✅ Success (200):

```json
[
  {
    "_id": "group_id",
    "name": "Group name",
    "description": "Group description",
    "isClosed": false,
    "members": [
      { "_id": "user_id", "username": "username" }
    ],
    "admins": ["user_id"],
    "createdBy": "user_id",
    "createdAt": "2025-05-25T12:13:00Z"
  }
]
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Join Group

**Endpoint:**

```http
POST /api/groups/:id/join
```

Allows the authenticated user to join a group. For open groups, the user is added as a member immediately. For closed groups, a join request is sent for admin approval.

### ✅ Success (200):

For open groups:

```json
{
  "message": "Joined group",
  "data": {
    "_id": "group_id",
    "name": "Group name",
    "description": "Group description",
    "isClosed": false,
    "members": ["user_id1", "user_id2"],
    "admins": ["user_id1"],
    "createdBy": "user_id1",
    "createdAt": "2025-05-25T12:13:00Z"
  }
}
```

For closed groups:

```json
{ "message": "Waiting for admin approval" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "Already a member" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Cancel Join Group Request

**Endpoint:**

```http
POST /api/groups/:id/cancel
```

Cancels a pending join request for a closed group.

### ✅ Success (200):

```json
{ "message": "Join request canceled" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "Already a member" }
```

```json
{ "message": "You have not requested to join this group" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Leave Group

**Endpoint:**

```http
POST /api/groups/:id/leave
```

Allows the authenticated user to leave a group. If the user is the creator, ownership is transferred to another admin or member, or the group is deleted if no members remain.

### ✅ Success (200):

```json
{ "message": "Left group successfully" }
```

If the group is deleted (no members remain):

```json
{ "message": "Group deleted as no members remain" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "Not a member of the group" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 🗂️ Route Summary

| Method | Endpoint                     | Description                          |
| ------ | ---------------------------- | ------------------------------------ |
| POST   | `/api/groups/create`         | Create a new group                   |
| GET    | `/api/groups/`               | Get all groups                       |
| POST   | `/api/groups/:id/join`       | Join a group or request to join      |
| POST   | `/api/groups/:id/cancel`     | Cancel a join request for a group    |
| POST   | `/api/groups/:id/leave`      | Leave a group                        |