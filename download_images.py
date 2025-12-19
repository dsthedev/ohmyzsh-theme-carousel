import os
import re
import requests
from urllib.parse import urlparse, unquote

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
# Capture any http(s) URL inside the parentheses so images hosted under
# different GitHub paths (e.g. /assets/...) are included.
img_urls = re.findall(r"!\[.*?\]\((https?://[^\s)]+)\)", md)
print(f"Found {len(img_urls)} images.")

# Map common Content-Type values to file extensions
CTYPE_TO_EXT = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
}

def filename_for_url_and_response(url, response):
    """Return a filename for `url`, using the existing extension if present,
    otherwise inferring from response headers. If detection fails, force .jpg.
    """
    parsed = urlparse(url)
    base = os.path.basename(unquote(parsed.path))
    name, ext = os.path.splitext(base)

    if ext:
        return base

    ctype = response.headers.get("Content-Type", "").split(";")[0].lower()
    ext = CTYPE_TO_EXT.get(ctype, "")
    if ext:
        return name + ext

    return name + ".jpg"

# Download each image using a single streamed GET.
for url in img_urls:
    try:
        r = requests.get(url, stream=True, timeout=30)
        r.raise_for_status()
    except Exception as e:
        print(f"Failed to GET {url}: {e}")
        continue

    filename = filename_for_url_and_response(url, r)
    path = os.path.join(IMG_DIR, filename)
    if os.path.exists(path):
        print(f"{filename} already exists, skipping.")
        r.close()
        continue

    print(f"Downloading {filename} from {url}...")
    with open(path, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    r.close()

print(f"All images downloaded to {IMG_DIR}")
