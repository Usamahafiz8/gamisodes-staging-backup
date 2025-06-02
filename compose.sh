#!/usr/bin/env sh

VERSION=$(curl -sL https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d'"' -f 4)
URL="https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m)"
OUTPUT="/usr/local/bin/docker-compose"

sudo curl -fsSL ${URL} -o ${OUTPUT}
sudo chmod +x ${OUTPUT}
