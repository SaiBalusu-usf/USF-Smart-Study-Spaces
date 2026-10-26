from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


WEB_ROOT = Path(__file__).resolve().parent
PUBLIC_EXTENSIONS = {
    ".html", ".css", ".js", ".jsx", ".json", ".webmanifest",
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp",
    ".woff", ".woff2", ".ttf",
}


def is_public_path(path):
    candidate = Path(path)
    resolved = candidate.resolve()
    try:
        lexical = candidate.relative_to(WEB_ROOT)
        relative = resolved.relative_to(WEB_ROOT.resolve())
    except ValueError:
        return False
    if any(part.startswith(".") for part in (*lexical.parts, *relative.parts)):
        return False
    return resolved.is_dir() or resolved.suffix.lower() in PUBLIC_EXTENSIONS


class CustomHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".jsx": "application/javascript",
    }

    def send_head(self):
        requested = Path(self.translate_path(self.path))
        if not is_public_path(requested):
            self.send_error(403, "Forbidden")
            return None
        if requested.is_dir():
            for name in ("index.html", "index.htm"):
                index = requested / name
                if index.exists() and not is_public_path(index):
                    self.send_error(403, "Forbidden")
                    return None
        return super().send_head()

    def list_directory(self, path):
        self.send_error(403, "Directory listing is disabled")
        return None

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


def create_server(port=8000):
    handler = partial(CustomHandler, directory=str(WEB_ROOT))
    return ThreadingHTTPServer(("127.0.0.1", port), handler)


if __name__ == '__main__':
    with create_server() as httpd:
        print("Development preview at http://127.0.0.1:8000")
        httpd.serve_forever()
