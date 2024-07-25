import socket
import webbrowser
from threading import Timer
from flask import Flask
from controller.MainPageController import app as main_page
from module.ConfigManager import ConfigManager


def open_browser():
    webbrowser.open_new_tab('http://localhost:5000/rasp-control/')


if __name__ == '__main__':
    ConfigManager.get_config()
    app = Flask(__name__,
                template_folder='templates',
                static_folder='static')
    app.register_blueprint(main_page)

    local_ip = socket.gethostbyname(socket.gethostname())
    Timer(1, open_browser).start()
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
