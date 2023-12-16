cp -b /configs/postfix/main.cf /etc/postfix/main.cf
cp /configs/postfix/sasl_passwd /etc/postfix/
chmod 600 /etc/postfix/sasl_passwd
postmap hash:/etc/postfix/sasl_passwd
rm /etc/postfix/sasl_passwd