from flask import Flask, render_template, request, redirect, url_for, Blueprint

from model.Switch import Switch
from module.SwitchControllerManager import SwitchControllerManager

app = Blueprint('SwitchControllerPageController', __name__)


@app.route('/')
def index():
    return render_template('SwitchControllerPage.html')


@app.route('/create-switch', methods=['POST'])
def create_switch():
    new_switch = Switch()
    new_switch.name = request.json['name']
    new_switch.gpio_pin = int(request.json['gpio_pin'])
    new_switch.icon = request.json['icon']
    new_switch.slot = 0
    SwitchControllerManager.add_data(new_switch)
    return SwitchControllerManager.get_data()


@app.route('/delete-switch', methods=['POST'])
def delete_switch():
    slot = request.json['slot']
    SwitchControllerManager.delete_data(slot)
    return SwitchControllerManager.get_data()
