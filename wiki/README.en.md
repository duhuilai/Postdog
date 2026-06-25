## ⚠️ Project Status Notice

This project is now in a **maintenance suspended** state.

Due to unforeseen circumstances beyond our control, the POSTDOG open source project is no longer actively maintained as of now.  
No new features, regular maintenance, or security fixes will be provided in the future.

If you are using this project in production, please carefully evaluate the risks and consider migrating to actively maintained alternatives.

Thank you to all contributors and users for your support over the years.


# POSTDOG API Client

![POSTDOG API Client](http://data.eolinker.com/course/QbLMSaJ7f3dcd0b075a7031b31f8acb486e0a090f1bdc8d.jpeg)

<p align="center"><span>English</span> | <a href="README.md">简体中文</a></p>
<p align="center">
  <a href="https://github.com/Postdoglab/postdog"><img src="https://img.shields.io/github/license/Postdoglab/postdog?sanitize=true" alt="License"></a>
  <a href="https://github.com/Postdoglab/postdog/releases"><img src="https://img.shields.io/github/v/release/Postdoglab/postdog?sanitize=true" alt="Version"></a>
  <a href="https://github.com/Postdoglab/postdog/releases"><img src="https://img.shields.io/github/downloads/Postdoglab/postdog/total?sanitize=true" alt="Downloads"></a>
  <a href="https://discord.gg/W3uk39zJCR"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p>

## `🛠️ A Little Update, A Big Transformation: POSTDOG is Undergoing a Revamp! 🚀

Hey there, POSTDOG friends!

Just a quick shout-out to let you all know that our project is currently on an exciting journey of restructuring. It's not that POSTDOG is unattended; in fact, we're actively injecting new energy into it!

Things might seem a bit quiet for now, but rest assured, we're busy behind the scenes. We're committed to making POSTDOG cooler and more user-friendly - it just takes a bit of time to polish and perfect.

So, stay tuned! Soon, you'll be meeting a revamped and rejuvenated POSTDOG. Your support and patience mean the world to us!

Exciting updates are on the horizon, stay tuned!`

![POSTDOG UI](https://data.eolink.com/ADAR6cL7e479c785ec305f5c60de95ce1a2a88da408039b)

POSTDOG is a powerful open source, cross-platform (Windows, Mac, Linux, Browsers...) **API development and testing tool** that supports REST, Websocket and other protocols (soon to support GraphQL, gRPC, TCP, UDP), helping you speed up the completion of API Development and testing work.

While ensuring that POSTDOG is light and flexible, we also designed a powerful plug-in system for POSTDOG, allowing you to use plug-ins with one click to enhance POSTDOG's functions.

![POSTDOG Extensions](https://data.eolink.com/Yh3r851d2f5575a08b5936720dfb267c067ebe33c2fc5eb)

Therefore, POSTDOG is theoretically an API product with infinite possibilities. We also visually added a cape to POSTDOG's cat, representing its infinite possibilities.

## Roadmap

* 🚀 Multi-protocol support
    \-\- Implemented: HTTP REST\, Websocket
    \-\- Coming soon: GraphQL\, TCP\, UDP\, gRPC
* 📕 API Documentation
* ✨ API Design
* ⚡ API Test
* 🎭 Mock
* 🙌 Collaboration
* 🎈 Document Sharing
* 🗺 Environment
* 🧶 Global variables
* 🧩 Custom theme style
* 🌐 Multilingual support: Chinese, English

Learn more：[Github Project](https://github.com/orgs/Postdoglab/projects/3)

## 💪 Contributors 💪
<p align="center">
Thank you for making good things happen!
</p>

<a href="https://github.com/Postdoglab/postdog/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Postdoglab/postdog" />
</a>

<div align="center">
<sub>Power by <a href="https://contrib.rocks">contrib.rocks</a>.</sub>
</div>

## Bug and Feature Request

If you'd like to contact us, please create a [Github issue](https://github.com/Postdoglab/postdog/issues). Thank you!

## Document

[POSTDOG User Document](https://docs.POSTDOG.com/)

# Build and run

## Prerequisites

* Node.js >= 14.17.x
* yarn >= 1.22.x

## Running the code

We use yarn as a package management tool for development and building, and it is highly recommended that you do the same, but if you want to use npm it's perfectly fine, it just might take a little more time to install dependencies.

```
yarn install
yarn start
```

If you want to improve Angular development efficiency, you can install the command-line Angular-cli officially provided by Angular to quickly generate templates such as components and services.

```
yarn add @angular/cli --global
```

## Command

### Run

| Command | Description |
| ------- | ----------- |
| `yarn start` | In development mode, running on browser and desktop at the same time |
| `yarn serve:web` | only runs in the web |
| `yarn electron:serve` | only runs in the desktop |

### Build

| Command | Description |
| ------- | ----------- |
| `yarn build` | Packaging Electron applications for each platform |

### Running the tests

| Command | Description |
| ------- | ----------- |
| `yarn test` | Execute unit tests |
