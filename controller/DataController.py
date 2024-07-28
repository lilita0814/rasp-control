from flask import Blueprint

from module.SwitchControllerManager import SwitchControllerManager

app = Blueprint('DataController', __name__)


@app.route('/get-switch-controller')
def get_switch_controller():
    return SwitchControllerManager.get_data()
