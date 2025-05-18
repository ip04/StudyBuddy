# How to use StudyBuddy📚 API

## Authorization:🔒

### Sign Up

**Endpoint:**  
`POST /api/auth/signup`

**Description:**  
Create a new user account with a username, email, and password.

### Request

**URL:**  
`POST base_url/api/auth/signup`

**Headers:**

```http
Content-Type: application/json
```

**Body:**

```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "123456"
}
```

**Response**

**✅ Success (201 Created):**

```json
{ "message": "User created seccessfully" }
```

**❌ Error (e.g., 400 Bad Request):**

```json
{ "error": "error.message" }
```

---

### Login

**Endpoint:**  
`POST /api/auth/login`

**Description:**  
login user account with a email and password.

### Request

**URL:**  
`POST base_url/api/auth/login`

**Headers:**

```http
Content-Type: application/json
```

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response**

**✅ Success (200):**

```json
{ "token": token }
```

**❌ Error (e.g., 400 Bad Request):**

```json
{ "message": "Invalid credentials" }
```

**❌ Error (e.g., 500):**

```json
{ "error": "Server Error" }
```
