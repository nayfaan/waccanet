#!/usr/bin/env bash
yes | python manage.py makemigrations propertyhub 
python manage.py makemigrations contactus 
python manage.py migrate 
python manage.py superuser
python manage.py runserver 0:8000