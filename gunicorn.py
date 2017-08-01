import os

if os.environ.get('ENV') == 'dev':
    reload = True

bind = '0.0.0.0:80'
