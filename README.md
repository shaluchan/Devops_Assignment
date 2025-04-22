
# 🐳 DevOps Multi-Stage Web Scraper Assignment

This project demonstrates a multi-stage Docker setup that:
1. Scrapes a website using Node.js + Puppeteer + Chromium (build-time stage)
2. Serves the scraped data using Python + Flask (Python hosting stage)

---

## 📂 Project Structure

```
├── Dockerfile          # Multi-stage build file
├── scrape.js           # Node.js script for scraping
├── server.py           # Python Flask app
├── package.json        # Node dependencies
├── requirements.txt    # Python dependencies
└── README.md           # Documentation
```


## 🧱 Build Instructions

### Clone the Repo
```bash
git clone
```

### 🛠️ Build the Docker Image with a Website to Scrape

Use the `--build-arg` flag to set the website URL u want to scrape:

```bash
docker build --build-arg SCRAPE_URL="https://anyxyzsite.com" -t web-scraper .
```

---

## 🚀 Run the Container

```bash
docker run -p 5000:5000 web-scraper
```

---

## 🌐 Access the Scraped Data

Visit this in your browser:
```
http://localhost:5000
```
You will see a JSON output of:
- Page Title
- First Heading (h1, h2, or h3)

---

## 🔄 To Scrape a Different Site
Just rebuild the image with a new URL:
```bash
docker build --build-arg SCRAPE_URL="https://books.toscrape.com" -t web-scraper .
docker run -p 5000:5000 web-scraper
```

---

## ✅ Technologies Used
- Node.js (18-slim)
- Puppeteer + Chromium
- Python (3.10-slim)
- Flask
- Docker Multi-Stage Builds

---

## 📌 Notes
- The scraping only happens **at build time**, that's why build args are required.
- The runtime container only hosts the pre-scraped data via Flask.
- This setup keeps the final image lightweight and efficient.
```
