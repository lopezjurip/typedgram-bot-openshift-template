# Typedgram Bot - Openshift template

Template repository to mount a Telegram Bot on Openshift servers written in Typescript

## [Openshift](https://openshift.redhat.com) deployment for a new app

Create an account and download **[rhc](https://developers.openshift.com/en/managing-client-tools.html)** gem. Make sure you have **Ruby** installed.

```sh
# Gem install, try with sudo if needed
$ gem install rhc

# Setup with your accout and public key,
$ rhc setup
```

Once you are ready, create a Node app:

* `APP_NAME`: Name for your app.
* `NAMESPACE`: You need a namespace in OpenShift
  * This will create your app on `https://APP_NAME-NAMESPACE.rhcloud.com`
* `TELEGRAM_TOKEN`: Your token.

```sh
rhc app create APP_NAME nodejs-0.10 \
  -e TELEGRAM_TOKEN=TELEGRAM_TOKEN \
  -n NAMESPACE \
  --from-code=https://github.com/mrpatiwi/typedgram-bot-openshift-template.git
```


## Local Development

To develop your bot locally, you need a **secure** connection to your local host. One way to achieve this is using a [ngrok](https://ngrok.com/) to create a *tunnel* to your computer.

#### Example

Once installed, create a tunnel to your app.
```sh
$ ngrok 8080

# Tunnel Status                 online
# Version                       1.7/1.7
# Forwarding                    http://SUBDOMAIN.ngrok.com -> 127.0.0.1:8080
# Forwarding                    https://SUBDOMAIN.ngrok.com -> 127.0.0.1:8080
# Web Interface                 127.0.0.1:4040
# # Conn                        0
# Avg Conn Time                 0.00ms
```

Then we set our development *environment variables*.
```sh
$ export TELEGRAM_TOKEN="TOKEN"
$ export PORT="8080"
$ export LOCAL_IP="127.0.0.1"
$ export LOCAL_URL="SUBDOMAIN.ngrok.com"
```

Now you should be able to start your bot with `npm start`.
