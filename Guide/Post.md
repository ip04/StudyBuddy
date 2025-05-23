# 🧑‍💻 Post API – Usage Guide

This API allows authenticated users to get, upload, like\unlike, comment, update, delete their post. All routes are protected and require a valid JWT token.

## 🔐 Authorization

All routes require the following header:

```http
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

## 📘 Get All Posts

**Endpoint:**

```http
GET /api/posts/
```

Returns posts from all users.

### ✅ Success (200):

```json
[
  {
    "_id": "post_id",
    "content": "Some text...",
    "author": "user_id",
    "likes": ["user_id1", "user_id2"],
    "comments": [],
    "createdAt": "2025-05-23T14:10:00Z"
  }
]
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## 📘 Get Feed

**Endpoint:**

```http
GET /api/posts/feed
```

Returns posts from users the authenticated user follows.

### ✅ Success (200):

```json
[
  {
    "_id": "post_id",
    "content": "Some text...",
    "author": "user_id",
    "likes": ["user_id1", "user_id2"],
    "comments": [],
    "createdAt": "2025-05-23T14:10:00Z"
  }
]
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## ✏️ Upload Post

**Endpoint:**

```http
POST /api/posts/upload
```

Creates a new post by the authenticated user.

**Body:**

```json
{
  "content": "Some text..."
}
```

### ✅ Success (201):

```json
{
  "_id": "post_id",
  "content": "Some text...",
  "author": "user_id",
  "likes": [],
  "comments": [],
  "createdAt": "2025-05-23T14:10:00Z"
}
```

### ❌ Error (e.g., 400 Bad Request):

```json
{ "message": "Content is required" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## ❤️ Like/Unlike Post

**Endpoint:**

```http
POST /api/posts/:id/like
```

Toggles a like on the specified post. If the post is already liked by the user, it will be unliked.

### ✅ Success (200):

```json
{
  "message": "Like status updated",
  "likes": ["user_id1", "user_id2"]
}
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## ✏️ Update Post

**Endpoint:**

```http
PUT /api/posts/:id/update
```

Updates the content of the specified post. Only the post’s author can update it.

**Body:**

```json
{
  "content": "some text..."
}
```

### ✅ Success (200):

```json
{
  "_id": "post_id",
  "content": "Updated text...",
  "author": "user_id",
  "likes": ["user_id1"],
  "comments": [],
  "createdAt": "2025-05-23T14:10:00Z",
  "updatedAt": "2025-05-23T14:15:00Z"
}
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Not authorized" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## ❌ Delete Post

**Endpoint:**

```http
DELETE /api/posts/:id/delete
```

Deletes the specified post. Only the post’s author can delete it.

### ✅ Success (204):

```json
{ "message": "Post deleted" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Not authorized" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## 💬 Create Comment

**Endpoint:**

```http
POST /api/posts/:id/comment
```

Adds a comment to the specified post.

**Body:**

```json
{
  "text": "some text..."
}
```

Creating comment for the post id.

### ✅ Success (201):

```json
{
  "user": "user_id",
  "text": "some text..."
}
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## ❌ Delete Comment

**Endpoint:**

```http
DELETE /api/posts/:postId/comments/:commentId
```

Deletes the specified comment from the specified post. Only the comment’s author or post’s author can delete it.

### ✅ Success (204):

```json
{ "message": "Comment deleted" }
```

### ❌ Error (e.g., 403 Forbidden):

```json
{ "message": "Not authorized" }
```

### ❌ Error (e.g., 404 Not Found):

```json
{ "message": "Post not found" }
```

```json
{ "message": "Comment not found" }
```

### ❌ Error (e.g., 500 Internal Server Error):

```json
{ "error": "Server Error" }
```

## 🗂️ Route Summary

| Method | Endpoint                                 | Description                   |
| ------ | ---------------------------------------- | ----------------------------- |
| GET    | `/api/posts/`                            | Get all posts                 |
| GET    | `/api/posts/feed`                        | Get posts from followed users |
| POST   | `/api/posts/upload`                      | Create a new post             |
| POST   | `/api/posts/:id/like`                    | Like or unlike a post         |
| POST   | `/api/posts/:id/comment`                 | Add a comment to a post       |
| PUT    | `/api/posts/:id/update`                  | Update a post                 |
| DELETE | `/api/posts/:id/delete`                  | Delete a post                 |
| DELETE | `/api/posts/:postId/comments/:commentId` | Delete a comment from a post  |
