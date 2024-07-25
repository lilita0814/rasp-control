from flask import Flask, render_template, Blueprint

from module.ConfigManager import ConfigManager

prefix = '/rasp-control/'
app = Blueprint('mainPageController', __name__)


@app.route(prefix)
def index():
    return render_template('mainPage.html')


@app.route(prefix + 'settings')
def settings_page():
    return render_template('settingsPage.html', config=ConfigManager.get_config())
