"""
Module that handles sending emails.
"""

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from gangplank.celery import celery


FROM_ADDRESS = 'Gangplank Chander <community@chandler.gangplank.community>'


@celery.task(bind=True, max_retries=3)
def send(self, recipient, subject, text, html, mailgun_pass):
    msg = MIMEMultipart('alternative')
    msg['subject'] = subject
    msg['From'] = FROM_ADDRESS
    msg['To'] = recipient
    msg.attach(MIMEText(text, 'plain'))
    msg.attach(MIMEText(html, 'html'))

    # TODO: move mail login/quit
    mail = smtplib.SMTP('smtp.mailgun.org', 587)
    mail.login(
        'postmaster@chandler.gangplank.community',
        mailgun_pass,
    )
    mail.sendmail(msg['From'], msg['To'], msg.as_string())
