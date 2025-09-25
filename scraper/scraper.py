import requests
from bs4 import BeautifulSoup
import re
import json
import time
import os
from supabase import create_client, Client

# url of website to scrape (keep as input for user to enter)
url = input("Enter the URL of the website to scrape: ")

if "elpais.com" in url:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "lxml")
else:
    print("Invalid URL")
    exit()

articles = []

# Loop through all anchor tags on the section page
for a in soup.find_all("a", href=True):
    href = a["href"]
    title = a.get_text(strip=True)

    # Match article URLs with a date in the path (YYYY-MM-DD) to form article url
    if re.search(r"/\d{4}-\d{2}-\d{2}/", href):
        # Extract publication date from the URL
        date_match = re.search(r"(\d{4}-\d{2}-\d{2})", href)
        pub_date = date_match.group(1) if date_match else None

        # Get the short description if available
        desc_tag = a.find_next("p", class_="c_d")
        description = desc_tag.get_text(strip=True) if desc_tag else None

        # Fetch the full article page from newly formed url
        try:
            article_page = requests.get(href)
            article_soup = BeautifulSoup(article_page.text, "lxml")

            # Select paragraphs inside the article body container
            paragraphs = article_soup.select(
                "div.a_c.clearfix[data-dtm-region='articulo_cuerpo'] p"
            )

            full_text = " ".join(
                p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)
            )

        except Exception as e:
            print(f"⚠️ Failed to fetch article {href}: {e}")
            full_text = None

        # Store article data as an object 
        if full_text != None:
            articles.append({
            "title": title,
            "url": href,
            "date": pub_date,
            "description": description,
            "content": full_text
        })


        # limit requests rate to avoid spam bolckers (maybe this isnt necessary for every site?)
        time.sleep(1)

# Save all articles to JSON
with open("elpais_articles.json", "w", encoding="utf-8") as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f"✅ Saved {len(articles)} articles to elpais_articles.json")





supabase: Client = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])




# Insert articles into Supabase
for article in articles:
    try:
        data, count = supabase.table("articles").upsert(article, on_conflict=["url"]).execute()
        print(f"✅ Inserted: {article['title']}")
    except Exception as e:
        print(f"⚠️ Failed to insert {article['title']}: {e}")