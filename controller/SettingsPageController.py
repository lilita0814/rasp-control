import shutil

from flask import render_template, Blueprint, request, make_response

from module.ConfigManager import ConfigManager

app = Blueprint('settingsPageController', __name__)


@app.route('/')
def index():
    return render_template('settingsPage.html', config=ConfigManager.get_data())


@app.route('/save', methods=['POST'])
def save():
    data = request.json
    fan_pin = int(data.get("fan_pin"))
    pump_pin = int(data.get("pump_pin"))

    ConfigManager.data.fan_pin = fan_pin
    ConfigManager.data.pump_pin = pump_pin
    ConfigManager.save_data()
    print('config save success')
    return 'save success'


@app.route('/upload-bg', methods=['POST'])
def upload_bg():
    #  set default
    if request.args.get('is_upload') is None:
        shutil.copy('static/img/default_background.jpg', 'static/img/background.jpg')
    else:
        #  upload
        file = request.files['image']
        file.save('static/img/background.jpg')
    return 'success'


