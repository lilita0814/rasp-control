import os
import json
from model.Config import Config


class ConfigManager:
    data = Config()
    file_path = 'data/config.json'

    @staticmethod
    def create_file():
        with open(ConfigManager.file_path, 'w') as file:
            json.dump(
                {'fan_pin': 1,
                 'pump_pin': 1}
                , file)
        ConfigManager.renew_data()

    @staticmethod
    def renew_data():
        with open(ConfigManager.file_path, 'r') as file:
            data = json.load(file)
        if data is not None:
            ConfigManager.data.__dict__.update(data)

    @staticmethod
    def get_data():
        return ConfigManager.data

    @staticmethod
    def init():
        if not os.path.exists(ConfigManager.file_path):
            ConfigManager.create_file()
        ConfigManager.renew_data()

    @staticmethod
    def save_data():
        with open(ConfigManager.file_path, 'w') as file:
            json.dump(ConfigManager.data.__dict__, file, indent=4)
