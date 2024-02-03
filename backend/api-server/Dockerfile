FROM python:3.9.11

ENV PYTHONUNBUFFERED 1

WORKDIR /src/api-server
# 参照元:コンテナ
ADD requirements.txt ./

RUN pip install --upgrade pip\
    && pip install --upgrade setuptools\
    && pip install -r requirements.txt