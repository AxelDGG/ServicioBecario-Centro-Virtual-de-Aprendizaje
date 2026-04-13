"""
inject_responsive.py
--------------------
1. Adds a <link> to responsive.css in every HTML page that doesn't already have it.
2. Removes hard-coded width/height attributes from <video> tags.
3. Removes hard-coded width/height attributes from content <img> tags 
   (but preserves tiny inline icons ≤ 32px so they keep their size).

Run from the project root (app/ directory parent):
    python inject_responsive.py
"""

import os
import re

APP_DIR = r'c:\Users\axeld\Downloads\Uso-de-TICs\Uso-de-TICs\app'

CSS_TAG_TEMPLATE = '<link href="{depth}assets/css/responsive.css" rel="stylesheet">'
MARKER = 'responsive.css'


def get_depth_prefix(html_path: str) -> str:
    """Return relative path prefix back to app/ root from the given html file."""
    rel = os.path.relpath(html_path, APP_DIR)
    parts = rel.replace('\\', '/').split('/')
    # number of directory levels below app/
    depth = len(parts) - 1  # subtract the filename itself
    return '../' * depth


def strip_video_dimensions(content: str) -> str:
    """Remove width=... and height=... from <video ...> tags."""
    def clean_video(m):
        tag = m.group(0)
        tag = re.sub(r'\s+width\s*=\s*["\']\d+["\']', '', tag)
        tag = re.sub(r'\s+height\s*=\s*["\']\d+["\']', '', tag)
        return tag
    return re.sub(r'<video\b[^>]*>', clean_video, content, flags=re.IGNORECASE)


def strip_img_dimensions(content: str) -> str:
    """
    Remove width/height attributes from <img> tags where the image is 
    clearly a content image (width > 32 or height > 32).
    Preserve tiny inline icons (≤ 32px on both dimensions).
    """
    def clean_img(m):
        tag = m.group(0)

        # Extract current width and height values
        w_match = re.search(r'\bwidth\s*=\s*["\']?(\d+)["\']?', tag, re.IGNORECASE)
        h_match = re.search(r'\bheight\s*=\s*["\']?(\d+)["\']?', tag, re.IGNORECASE)

        w = int(w_match.group(1)) if w_match else None
        h = int(h_match.group(1)) if h_match else None

        # Keep tiny icons (both dimensions ≤ 32)
        if w is not None and h is not None and w <= 32 and h <= 32:
            return tag

        # Remove width and height from content images
        tag = re.sub(r'\s+width\s*=\s*["\']\d+["\']', '', tag)
        tag = re.sub(r'\s+height\s*=\s*["\']\d+["\']', '', tag)
        # Also handle unquoted values: width=480
        tag = re.sub(r'\s+width\s*=\s*\d+', '', tag)
        tag = re.sub(r'\s+height\s*=\s*\d+', '', tag)
        return tag

    return re.sub(r'<img\b[^>]*>', clean_img, content, flags=re.IGNORECASE)


def process_file(html_path: str):
    with open(html_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    changed = False

    # 1. Inject responsive.css link if not present
    if MARKER not in content:
        depth = get_depth_prefix(html_path)
        css_tag = CSS_TAG_TEMPLATE.format(depth=depth)
        # Insert before </head>
        new_content = content.replace('</head>', f'    {css_tag}\n</head>', 1)
        if new_content != content:
            content = new_content
            changed = True
            print(f'  [CSS injected]  {os.path.relpath(html_path, APP_DIR)}')

    # 2. Strip hard-coded video dimensions
    new_content = strip_video_dimensions(content)
    if new_content != content:
        content = new_content
        changed = True
        print(f'  [video dims]    {os.path.relpath(html_path, APP_DIR)}')

    # 3. Strip hard-coded img dimensions (content images only)
    new_content = strip_img_dimensions(content)
    if new_content != content:
        content = new_content
        changed = True
        print(f'  [img dims]      {os.path.relpath(html_path, APP_DIR)}')

    if changed:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)


def main():
    total = 0
    modified = 0

    for dirpath, dirnames, filenames in os.walk(APP_DIR):
        # Skip vendor/library directories
        dirnames[:] = [d for d in dirnames if d not in ('vendors', 'node_modules')]
        for filename in filenames:
            if filename.lower().endswith('.html'):
                path = os.path.join(dirpath, filename)
                before = os.path.getmtime(path)
                total += 1
                process_file(path)
                after = os.path.getmtime(path)
                if after > before:
                    modified += 1

    print(f'\nDone. {modified} of {total} HTML files modified.')


if __name__ == '__main__':
    main()
