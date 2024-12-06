FROM docker.io/busybox

RUN adduser -D app
USER app
WORKDIR /home/app

COPY --chown=1000:1000 ./dist .

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
