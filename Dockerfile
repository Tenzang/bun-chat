# syntax=docker/dockerfile:1
FROM jarredsumner/bun:edge
WORKDIR /app
COPY . .
CMD ["bun", "main.ts"]
EXPOSE 3000
