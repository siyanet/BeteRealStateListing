#!/bin/sh
set -e

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Daphne server..."
daphne -b 0.0.0.0 -p 8000 bete.asgi:application
