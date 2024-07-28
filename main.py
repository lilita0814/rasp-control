import socket
import webbrowser
from threading import Timer
from flask import Flask
from controller.MainPageController import app as main_page
from controller.SettingsPageController import app as settings_page
from controller.SwitchControllerPageController import app as switch_controller_page
from controller.DataController import app as data_page
from module.ConfigManager import ConfigManager
from module.SwitchControllerManager import SwitchControllerManager


def open_browser():
    webbrowser.open_new_tab('http://localhost:5000/rasp-control/')


if __name__ == '__main__':
    ConfigManager.init()
    SwitchControllerManager.init()

    app = Flask(__name__,
                template_folder='templates',
                static_folder='static')
    prefix = '/rasp-control'
    app.register_blueprint(main_page, url_prefix=prefix)
    app.register_blueprint(settings_page, url_prefix=prefix + '/settings')
    app.register_blueprint(switch_controller_page, url_prefix=prefix + '/switch-controller')
    app.register_blueprint(data_page, url_prefix=prefix + '/data')

    local_ip = socket.gethostbyname(socket.gethostname())
    Timer(1, open_browser).start()
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
