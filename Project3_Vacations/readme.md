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

## Vacations (user)

1. GET /vac/all
   Query: page, pageSize

2. GET /vac/active

3. GET /vac/upcoming

4. GET /vac/followed (requires auth)

5. POST /vac/:id/follow (auth)

6. DELETE /vac/:id/follow (auth)

## Vacations (admin)

(Require requireAuth + requireAdmin)

1. POST /admin/create
   (fields: destination, description, start_date, end_date, price, image(file) )

2. PUT /admin/:id
   Update vacation. Image optional.

3. DELETE /admin/:id

4. GET /vac/admin (optional)
   Return all vacations for admin (non-paginated, use it in the admin page).

## Reports (admin)

1. GET /reports/followers

2. GET /reports/csv
   (attachment download)
