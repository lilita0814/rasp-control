import os

import yaml

from model.Config import Config


class ConfigManager:
    config = None
    config_path = 'config.yml'

    @staticmethod
    def create_config():
        new_config = Config()
        #  set default data
        new_config.fan_pin = 1
        new_config.pump_pin = 1
        #
        with open(ConfigManager.config_path, 'w') as outfile:
            yaml.dump(new_config.__dict__, outfile, default_flow_style=False)
        print('Config file created')
        ConfigManager.renew_config()

    @staticmethod
    def renew_config():
        with open(ConfigManager.config_path, 'r') as file:
            data = yaml.safe_load(file)
        ConfigManager.config = Config()
        ConfigManager.config.__dict__.update(data)

    @staticmethod
    def get_config():
        if ConfigManager.config is None:
            ConfigManager.renew_config()
        if not os.path.exists(ConfigManager.config_path):
            ConfigManager.create_config()
        return ConfigManager.config
