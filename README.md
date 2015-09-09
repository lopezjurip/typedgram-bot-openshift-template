# [Typedgram Bot](https://github.com/mrpatiwi/typedgram-bot) - Openshift template
[![Build Status][ci-image]][ci-url] [![dependencies][dependencies-image]][dependencies-url]

Template repository to mount a Telegram Bot on Openshift servers written in Typescript

## [Openshift](https://openshift.redhat.com) deployment

Create an account and download **[rhc](https://developers.openshift.com/en/managing-client-tools.html)** gem. Make sure you have **Ruby** installed.

```sh
# Gem install, try with sudo if needed
$ gem install rhc

# Setup with your accout and public key,
$ rhc setup
```

Once you are ready, use this template as seed:

* `APP_NAME`: Name for your app.
* `NAMESPACE`: You need a namespace in OpenShift
  * This will create your app on `https://APP_NAME-NAMESPACE.rhcloud.com`
  * You can create a namespace with `rhc domain create NAMESPACE`
* `TELEGRAM_TOKEN`: Your token.

Also, this will create a new directory called `APP_NAME` on the current directory.

```sh
rhc app create APP_NAME nodejs-0.10 \
  -e TELEGRAM_TOKEN=TELEGRAM_TOKEN \
  -n NAMESPACE \
  --from-code=https://github.com/mrpatiwi/typedgram-bot-openshift-template.git
```

You can set or change any time the Telegram Token with:
```sh
rhc set-env TELEGRAM_TOKEN=TELEGRAM_TOKEN -a APP_NAME -n NAMESPACE
```

Let's set the deployment remote repository to OpenShift and name it `openshift`:
```sh
$ cd APP_NAME
$ git config --get remote.origin.url | xargs git remote add openshift
```

Now to deploy an update it is easy as:
```sh
$ git push openshift master
```

Finally, let's set the `origin` remote to your personal repository:
```sh
$ git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
$ git push origin master
```

Where `USERNAME` is your git username and `REPOSITORY` is your bot's home repository.

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


[ci-image]: https://travis-ci.org/mrpatiwi/typedgram-bot-openshift-template.svg
[ci-url]: https://travis-ci.org/mrpatiwi/typedgram-bot-openshift-template
[dependencies-image]: https://david-dm.org/mrpatiwi/typedgram-bot-openshift-template.svg
[dependencies-url]: https://david-dm.org/mrpatiwi/typedgram-bot-openshift-template
