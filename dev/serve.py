"""Static dev server with caching disabled.

The default http.server lets the browser cache CSS/JS aggressively, which makes
it look like style edits had no effect. This sends no-store so every reload
reflects the files on disk.

Run:  python3 dev/serve.py 4173
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, *args):
        pass


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    handler = partial(NoCacheHandler, directory='.')
    print(f'serving on http://localhost:{port} (no-cache)')
    ThreadingHTTPServer(('127.0.0.1', port), handler).serve_forever()