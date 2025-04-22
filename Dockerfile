# Scraper stage
FROM node:18-slim AS scraper

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app

COPY package.json ./
COPY scrape.js ./

RUN apt-get update && apt-get install -y chromium \
  && apt-get clean && rm -rf /var/lib/apt/lists/* \
  && npm install

# Accept build-time argument
ARG SCRAPE_URL=https://example.com
ENV SCRAPE_URL=${SCRAPE_URL}

RUN node scrape.js

# Hosting stage
FROM python:3.10-slim AS host

WORKDIR /app
COPY --from=scraper /app/scraped_data.json ./
COPY server.py requirements.txt ./

RUN pip install -r requirements.txt
EXPOSE 5000

CMD ["python", "server.py"]
