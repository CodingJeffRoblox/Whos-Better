# Server Setup Instructions

## Overview
The Node.js server provides server-side verification for admin actions and user management to ensure security. The frontend should not be trusted for sensitive operations.

## Prerequisites
- Node.js installed (v14 or higher)
- Firebase project with Realtime Database enabled

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: "who-s-better-27d26"
3. Click on the gear icon (Settings) next to "Project Overview"
4. Select "Project settings"
5. Go to the "Service accounts" tab
6. Click "Generate new private key"
7. Select "Node.js" as the key type
8. Click "Generate"
9. Save the downloaded JSON file as `service-account-key.json` in the project root
10. **IMPORTANT**: Never commit this file to version control (add to .gitignore)

### 3. Environment Variables (Optional)
You can set the PORT environment variable:
```bash
export PORT=3001
```

### 4. Start the Server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 3001 (or the PORT environment variable).

## API Endpoints

### Authentication
All endpoints (except `/health`) require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

### Public Endpoints
- `GET /health` - Health check

### User Endpoints
- `GET /api/verify-status` - Verify user status and role
- `GET /api/verify-admin` - Verify admin status (requires admin role)
- `GET /api/tickets` - Get user's tickets
- `POST /api/tickets` - Create a new support ticket
- `GET /api/tickets/:ticketId` - Get specific ticket
- `POST /api/tickets/:ticketId/messages` - Add message to ticket

### Admin Endpoints (require admin role)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:uid` - Get specific user
- `PUT /api/admin/users/:uid/role` - Change user role
- `PUT /api/admin/users/:uid/status` - Change user status (ban/suspend/activate)
- `GET /api/admin/tickets` - Get all tickets
- `PUT /api/admin/tickets/:ticketId/close` - Close a ticket

## Security Features

### Token Verification
- All requests verify Firebase ID tokens server-side
- Tokens are validated using Firebase Admin SDK
- Expired or invalid tokens are rejected

### Role Verification
- Admin endpoints verify user role from Firebase Realtime Database
- Cannot modify role/status through direct Firebase client calls
- Server enforces business rules (e.g., cannot ban other admins)

### Status Verification
- User status (active/suspended/banned) is verified server-side
- Suspended/banned users cannot access protected endpoints
- Status changes are logged and tracked

### Ticket Access Control
- Users can only access their own tickets
- Admins can access all tickets
- Closed tickets are read-only and inaccessible to users

## Frontend Integration

The frontend should call server endpoints for sensitive operations instead of direct Firebase calls:

### Example: Verify Admin Status
```javascript
async function verifyAdminStatus() {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch('http://localhost:3001/api/verify-admin', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.isAdmin;
}
```

### Example: Ban User (Admin Only)
```javascript
async function banUser(uid) {
    const token = await auth.currentUser.getIdToken();
    const response = await fetch(`http://localhost:3001/api/admin/users/${uid}/status`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'banned' })
    });
    return await response.json();
}
```

## Firebase Security Rules

While the server provides verification, you should also add Firebase Security Rules as an additional layer:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && (auth.uid == $uid || root.child('users/' + auth.uid + '/role').val() == 'admin')",
        ".write": "auth != null && (auth.uid == $uid || root.child('users/' + auth.uid + '/role').val() == 'admin')"
      }
    },
    "tickets": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$ticketId": {
        ".write": "auth != null && (data.child('userId').val() == auth.uid || root.child('users/' + auth.uid + '/role').val() == 'admin')"
      }
    },
    "battles": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Troubleshooting

### Service Account Key Error
If you get an error about the service account key:
- Ensure `service-account-key.json` exists in the project root
- Verify the key is for the correct Firebase project
- Check that the key file is not corrupted

### Port Already in Use
If port 3001 is already in use:
- Set a different PORT environment variable
- Or stop the process using port 3001

### Token Verification Failed
If token verification fails:
- Ensure the Firebase client SDK is properly initialized
- Check that the token is not expired
- Verify the token is passed in the correct format: `Bearer <token>`

## Production Deployment

For production deployment:
1. Use environment variables for sensitive data
2. Enable HTTPS
3. Use a process manager like PM2
4. Set up proper logging
5. Configure rate limiting
6. Add input validation and sanitization

## Notes

- The server runs on port 3001 by default
- The frontend should call `http://localhost:3001` for local development
- In production, update the API base URL to your server's domain
- Keep the service account key secure and never commit it to version control
