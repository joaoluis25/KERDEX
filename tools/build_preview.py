"""Build a single-file, offline, demonstrative preview without third-party packages.
The source project retains separated files and a stricter same-origin CSP.
The portable preview uses SHA-256 CSP hashes for each embedded script/style.
"""
from pathlib import Path
from hashlib import sha256
from base64 import b64encode
import re

root = Path(__file__).resolve().parent.parent
files = ['i18n', 'finance', 'data', 'ui', 'app']
html = (root/'index.html').read_text(encoding='utf-8')
css = (root/'styles.css').read_text(encoding='utf-8')

def to_data(path):
    p = root/path
    mime = 'image/svg+xml' if p.suffix == '.svg' else ('image/jpeg' if p.suffix in ['.jpg','.jpeg'] else 'image/png')
    return 'data:'+mime+';base64,'+b64encode(p.read_bytes()).decode('ascii')

assets = sorted((str(p.relative_to(root)) for p in (root/'assets').rglob('*') if p.is_file()),key=len,reverse=True)
scripts = []
for f in files:
    script = (root/'src'/f'{f}.js').read_text(encoding='utf-8')
    for path in assets:
        if path in script:script = script.replace(path,to_data(path))
    scripts.append(script)
for path in assets:
    if path in html:html=html.replace(path,to_data(path))
html=re.sub(r'<link rel="stylesheet" href="styles.css">','',html)
html=re.sub(r'<link rel="manifest" href="site.webmanifest">','',html)
html=re.sub(r'\s*<script src="src/[^\"]+" defer></script>','',html)

def digest(text):return "'sha256-"+b64encode(sha256(text.encode('utf-8')).digest()).decode('ascii')+"'"
csp="default-src 'none'; script-src " + ' '.join(digest(x) for x in scripts) + "; style-src " + digest(css) + "; img-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"
html=re.sub(r'<meta http-equiv="Content-Security-Policy" content="[^"]*">',lambda m:'<meta http-equiv="Content-Security-Policy" content="'+csp+'">',html)
html=html.replace('</head>', '<style>'+css+'</style></head>')
html=html.replace('</body>', ''.join('<script>'+x+'</script>' for x in scripts)+'</body>')
output=root/'KERDEX_Beta_2.0_PREVIEW.html'
output.write_text(html,encoding='utf-8')
print(output,round(output.stat().st_size/1024),'KB')
