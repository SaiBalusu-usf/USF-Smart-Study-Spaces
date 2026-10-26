import http.client
import importlib.util
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch


SOURCE = Path(__file__).resolve().parents[2] / "frontend/web_app/server.py"
spec = importlib.util.spec_from_file_location("study_dev_server", SOURCE)
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)


class DevServerSecurityTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / "index.html").write_text("public web app", encoding="utf-8")
        (self.root / ".env").write_text("fixture-only-private-value", encoding="utf-8")
        (self.root / "server.py").write_text("private server source", encoding="utf-8")
        (self.root / "components").mkdir()
        self.root_patch = patch.object(server, "WEB_ROOT", self.root, create=True)
        self.root_patch.start()
        self.addCleanup(self.temp.cleanup)
        self.addCleanup(self.root_patch.stop)
        self.httpd = server.create_server(port=0)
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()
        self.addCleanup(self.close_server)

    def close_server(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        self.thread.join(timeout=5)

    def request(self, path, method="GET"):
        connection = http.client.HTTPConnection(*self.httpd.server_address, timeout=5)
        try:
            connection.request(method, path)
            response = connection.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            connection.close()

    def test_binds_only_to_loopback(self):
        self.assertEqual(self.httpd.server_address[0], "127.0.0.1")

    def test_serves_web_root_independently_of_launch_directory(self):
        status, headers, body = self.request("/")
        self.assertEqual(status, 200)
        self.assertEqual(body, b"public web app")
        self.assertEqual(headers["X-Content-Type-Options"], "nosniff")

    def test_hidden_configuration_is_not_served(self):
        for path in ("/.env", "/%2eenv"):
            with self.subTest(path=path):
                self.assertEqual(self.request(path)[0], 403)

    def test_server_source_is_not_served_even_by_head(self):
        self.assertEqual(self.request("/server.py", "HEAD")[0], 403)

    def test_directory_listing_is_disabled(self):
        self.assertEqual(self.request("/components/")[0], 403)

    def test_resolved_paths_outside_web_root_are_rejected(self):
        self.assertFalse(server.is_public_path(self.root.parent / "outside.html"))
        self.assertTrue(server.is_public_path(self.root / "index.html"))

    def test_symlinked_index_cannot_expose_an_outside_file(self):
        with tempfile.TemporaryDirectory() as outside:
            target = Path(outside) / "private.html"
            target.write_text("outside fixture", encoding="utf-8")
            index = self.root / "index.html"
            index.unlink()
            try:
                index.symlink_to(target)
            except (OSError, NotImplementedError):
                self.skipTest("This host does not allow creating test symlinks")
            self.assertEqual(self.request("/")[0], 403)


if __name__ == "__main__":
    unittest.main()
