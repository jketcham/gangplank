import importlib
import os


class Config(dict):
    """Application config, based on flask's app config"""
    def __init__(self, defaults=None):
        dict.__init__(self, defaults or {})

    def load_env(self, var):
        self[var] = os.environ.get(var)

    def load_module(self, config):
        if isinstance(config, str):
            config = importlib.import_module(config)
        for key in dir(config):
            if key.isupper():
                self[key] = getattr(config, key)


config = Config()
