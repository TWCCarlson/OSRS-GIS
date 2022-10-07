from cgitb import handler
import http.server
import socketserver

# Request handler class
class RequestsHandler(http.server.SimpleHTTPRequestHandler):
    """
    Handles http requests
    """
    def do_GET(self):
        if self.path == '/':
            self.path = 'leafmap.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

handler_object = RequestsHandler

PORT = 8001
my_server = socketserver.TCPServer(("", PORT), handler_object)

# Start the server
print("Server started at localhost:" + str(PORT))
my_server.serve_forever()