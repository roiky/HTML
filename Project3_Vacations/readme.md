# Quick overview

This app demonstrates:

1. User registration & login (bcrypt + JWT)
2. Role system: user / admin
3. Vacations resource: CRUD by admin
4. Follow / Unfollow vacations by users
5. Reports endpoint that returns counts (JSON + CSV)
6. File uploads (images) for vacations
7. React client that displays vacations, allows follow/unfollow, and admin pages

# Main API routes

## Auth

1. POST /auth/register
   Body: { first_name, last_name, email, password }

2. POST /auth/login
   Body: { email, password }

3. PUT /auth/setAdmin/:id
   Path param: id — set given user to admin (used for tests).
