import os
import importlib

env = os.environ.get('ENV', 'default')
config = importlib.import_module('config.' + env)
