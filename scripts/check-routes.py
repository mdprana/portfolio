"""Run against production server: python3 scripts/check-routes.py URL"""
import sys
from urllib.request import urlopen

base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:3213'
for path, marker in [('/', 'Featured Projects'), ('/projects', 'Projects'),
                     ('/about', 'About Prana'), ('/contact', 'Email'),
                     ('/projects/lexa', 'Lexa')]:
    with urlopen(base + path, timeout=15) as response:
        assert response.status == 200, path
        assert marker.lower() in response.read().decode().lower(), path
    print(path, 'OK')
for path in ['/hero.png', '/portrait.jpg']:
    with urlopen(base + path, timeout=15) as response:
        assert response.status == 200 and len(response.read()) > 10000, path
    print(path, 'OK')
