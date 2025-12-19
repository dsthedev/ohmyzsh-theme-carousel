import os
import re
import requests

# URL of the raw markdown
MD_URL = "https://raw.githubusercontent.com/ohmyzsh/wiki/refs/heads/main/Themes.md"

# Folder to save images
IMG_DIR = "./public/images"
os.makedirs(IMG_DIR, exist_ok=True)

# Fetch markdown
res = requests.get(MD_URL)
res.raise_for_status()
md = res.text

# Regex to find all image URLs: ![alt](url)
img_urls = re.findall(r"!\[.*?\]\((https://user-images\.githubusercontent\.com/.*?)\)", md)
print(f"Found {len(img_urls)} images.")

# Download each image
for url in img_urls:
    filename = os.path.basename(url)
    path = os.path.join(IMG_DIR, filename)
    if os.path.exists(path):
        print(f"{filename} already exists, skipping.")
        continue

    print(f"Downloading {filename}...")
    r = requests.get(url)
    r.raise_for_status()
    with open(path, "wb") as f:
        f.write(r.content)

print("All images downloaded to ./images")
