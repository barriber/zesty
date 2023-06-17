FROM python:3.7-slim

# git clone https://github.com/spulec/moto before building
ADD moto /moto/
COPY moto/run.sh /Users/bariber/bari/zesty/moto
ENV PYTHONUNBUFFERED 1
ENV AWS_ACCESS_KEY_ID=xxx
ENV AWS_SECRET_ACCESS_KEY=xxx

WORKDIR /moto/
RUN pip3 --no-cache-dir install --upgrade pip setuptools \
    && pip3 install awscli

ENTRYPOINT ["/moto/run.sh"]

EXPOSE 4000



