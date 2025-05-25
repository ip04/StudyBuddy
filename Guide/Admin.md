# 🧑‍💻 Admin API – Usage Guide

This API allows authenticated group admins and modifiers to manage join requests, remove members or posts, and promote or demote members to/from admin or modifier roles. It also allows the group creator to delete the group. All routes are protected and require a valid JWT token.

## 🔐 Authorization

All routes require the following header:

```http
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

## 📘 Approve Join Request

**Endpoint:**

```http
POST /api/groups/admin/:groupId/approve/:userId
```

Approves a user's join request for a closed group, adding them to the group's members. Accessible by admins and modifiers.

### ✅ Success (200):

```json
{ "message": "The join request approved" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "User is not in the join requests list" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins or modifiers can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Decline Join Request

**Endpoint:**

```http
POST /api/groups/admin/:groupId/decline/:userId
```

Declines a user's join request for a closed group, removing them from the join requests list. Accessible by admins and modifiers.

### ✅ Success (200):

```json
{ "message": "The join request declined" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "User is not in the join requests list" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins or modifiers can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Remove Member

**Endpoint:**

```http
DELETE /api/groups/admin/:groupId/remove/:userId
```

Removes a member from the group. Accessible by admins and modifiers, but modifiers cannot remove admins or other modifiers.

### ✅ Success (200):

```json
{ "message": "Member was removed successfully" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "The user not in the group" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins or modifiers can perform this action" }
```

```json
{ "message": "Modifier can't remove admin or other modifier" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Remove Post

**Endpoint:**

```http
DELETE /api/admin/:postId/remove
```

Deletes a post from the group. Accessible by admins, modifiers (if the post author is not an admin or modifier), or the post's author.

### ✅ Success (200):

```json
{ "message": "Post deleted successfully" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins or modifiers can perform this action" }
```

```json
{ "message": "Not authorized to delete this post" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Promote to Admin

**Endpoint:**

```http
POST /api/groups/admin/:groupId/promoteToAdmin/:userId
```

Promotes a group member to an admin role. Accessible by admins only.

### ✅ Success (200):

```json
{ "message": "The user promoted to admin" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "The user not in the group" }
```

```json
{ "message": "The user already admin" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Cancel Admin Promotion

**Endpoint:**

```http
POST /api/groups/admin/:groupId/cancelPromoteToAdmin/:userId
```

Removes a member from the admin role. Accessible by admins only.

### ✅ Success (200):

```json
{ "message": "Member was removed from admins successfully" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "The user not in the group" }
```

```json
{ "message": "The user not in the admins list" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Promote to Modifier

**Endpoint:**

```http
POST /api/groups/admin/:groupId/promoteToModifier/:userId
```

Promotes a group member to a modifier role. Accessible by admins only.

### ✅ Success (200):

```json
{ "message": "The user promoted to modifier" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "The user not in the group" }
```

```json
{ "message": "The user already modifier" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Cancel Modifier Promotion

**Endpoint:**

```http
POST /api/groups/admin/:groupId/cancelPromoteToModifier/:userId
```

Removes a member from the modifier role. Accessible by admins only.

### ✅ Success (200):

```json
{ "message": "Member was removed from modifiers successfully" }
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "The user not in the group" }
```

```json
{ "message": "The user not in the modifiers list" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Only admins can perform this action" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Group not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "message": "Server error" }
```

## 📘 Delete Group

**Endpoint:**

```http
DELETE /api/groups/admin/:id/delete
```

Deletes the specified group. Accessible only by the group creator.

### ✅ Success (200):

```json
{ "message": "Group deleted" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Not authorized" }
```

```json
{ "message": "Only the group creator can delete the group" }
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

| Method | Endpoint                                                     | Description                    |
| ------ | ------------------------------------------------------------ | ------------------------------ |
| POST   | `/api/groups/admin/:groupId/approve/:userId`                 | Approve a join request         |
| POST   | `/api/groups/admin/:groupId/decline/:userId`                 | Decline a join request         |
| DELETE | `/api/groups/admin/:groupId/remove/:userId`                  | Remove a member from the group |
| DELETE | `/api/groups/admin/:postId/remove`                           | Delete a post from the group   |
| POST   | `/api/groups/admin/:groupId/promoteToAdmin/:userId`          | Promote a member to admin      |
| POST   | `/api/groups/admin/:groupId/cancelPromoteToAdmin/:userId`    | Cancel an admin promotion      |
| POST   | `/api/groups/admin/:groupId/promoteToModifier/:userId`       | Promote a member to modifier   |
| POST   | `/api/groups/admin/:groupId/cancelPromoteToModifier/:userId` | Cancel a modifier promotion    |
| DELETE | `/api/groups/admin/:id/delete`                               | Delete the group               |
