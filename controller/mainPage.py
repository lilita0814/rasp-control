from flask import Flask, render_template, Blueprint

prefix = '/rasp-control/'
app = Blueprint('mainPageController', __name__)


@app.route(prefix)
def index():
    return render_template('mainPage.html')
