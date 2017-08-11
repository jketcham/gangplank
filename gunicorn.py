import os

if os.environ.get('ENV') == 'dev':
    logfile = '-'
    loglevel = 'debug'
    reload = True

bind = '0.0.0.0:8000'
