from flask import render_template, Blueprint

app = Blueprint('mainPageController', __name__)


@app.route('/')
def index():
    return render_template('mainPage.html')

