#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python server/manage.py collectstatic --no-input
python server/manage.py makemigrations propertyhub
python server/manage.py makemigrations contactus
python server/manage.py migrate
python server/manage.py superuser