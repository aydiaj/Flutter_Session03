#!/usr/bin/env python3
"""Regenerate standalone Session 03 HTML from the current multipage site.
The file can be read offline. Embedded DartPad still needs an online public Gist.
"""
from pathlib import Path
import base64
import mimetypes
import re
from urllib.parse import quote

root = Path(__file__).resolve().parent.parent
page = (root / 'index.html').read_text(encoding='utf-8')
styles = (root / 'css/style.css').read_text(encoding='utf-8')
page, count = re.subn(r'<link\b(?=[^>]*href="css/style\.css(?:\?[^\"]*)?")[^>]*>', '', page, count=1)
if count != 1:
    raise RuntimeError('Could not find stylesheet link in index.html')
page = page.replace('</head>', '<style>\n' + styles.replace('</style>','<\\/style>') + '\n</style></head>')

scripts = []
for path in ('js/gists.js', 'js/app.js'):
    source = (root / path).read_text(encoding='utf-8').replace('</script>', '<\\/script>')
    page, count = re.subn(r'<script\b(?=[^>]*src="' + re.escape(path) + r'")[^>]*></script>', '', page, count=1)
    if count != 1:
        raise RuntimeError(f'Missing script: {path}')
    scripts.append('<script>\n' + source + '\n</script>')
page = page.replace('</body>', '\n'.join(scripts) + '</body>')

for image in (root / 'images').iterdir():
    if not image.is_file():
        continue
    relative = 'images/' + image.name
    mimetype = mimetypes.guess_type(image.name)[0] or 'application/octet-stream'
    data = 'data:' + mimetype + ';base64,' + base64.b64encode(image.read_bytes()).decode('ascii')
    page = page.replace('../' + relative, data).replace(relative, data)

starter = (root / 'assignment/StudentName.dart').read_text(encoding='utf-8')
page = page.replace('href="assignment/StudentName.dart"', f'href="data:text/plain;charset=utf-8,{quote(starter)}"')
out = root / 'session03-standalone.html'
out.write_text(page, encoding='utf-8')
print(f'Wrote {out.name}: {out.stat().st_size:,} bytes')
