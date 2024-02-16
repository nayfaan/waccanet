#!/usr/bin/env bash
python manage.py makemigrations propertyhub
python manage.py makemigrations contactus
python manage.py migrate
python manage.py superuser
python manage.py collectstatic --noinput
gunicorn --bind :8000 server.wsgi:application