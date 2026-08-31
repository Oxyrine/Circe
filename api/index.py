import sys
import os

# Insert parent directory so server and pipeline packages can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import OuroborosHandler

handler = OuroborosHandler
app = handler
application = handler
