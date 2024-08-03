import json
import os

from model.Switch import Switch


class SwitchControllerManager:
    data: list = []
    file_path = 'data/switch_controller.json'

    @staticmethod
    def create_file():
        with open(SwitchControllerManager.file_path, 'w') as file:
            json.dump([], file)
        SwitchControllerManager.renew_data()

    @staticmethod
    def renew_data():
        with open(SwitchControllerManager.file_path, 'r') as file:
            data = json.load(file)
        for item in data:
            new_item = Switch()
            new_item.__dict__.update(item)
            SwitchControllerManager.data.append(new_item)

    @staticmethod
    def get_data():
        result = [e.__dict__ for e in SwitchControllerManager.data]
        return result

    @staticmethod
    def init():
        if not os.path.exists(SwitchControllerManager.file_path):
            SwitchControllerManager.create_file()
        SwitchControllerManager.renew_data()

    @staticmethod
    def save_data():
        with open(SwitchControllerManager.file_path, 'w') as file:
            json.dump([e.__dict__ for e in SwitchControllerManager.data], file, indent=4)

    @staticmethod
    def add_data(new_data):
        SwitchControllerManager.sort_data_slot()
        for i in SwitchControllerManager.data:
            i.slot += 1
        SwitchControllerManager.data.insert(0, new_data)
        SwitchControllerManager.save_data()


    @staticmethod
    def delete_data(slot):
        SwitchControllerManager.data = [data for data in SwitchControllerManager.data if data.slot != slot]
        SwitchControllerManager.sort_data_slot()
        SwitchControllerManager.save_data()

    @staticmethod
    def sort_data_slot():
        SwitchControllerManager.data.sort(key=lambda e: e.slot)
        for i, v in enumerate(SwitchControllerManager.data):
            v.slot = i
