# KeneyaSira API

The repository for the API of KeneyaSira


## Installation

## Prerequisites

* install NVM (node version manager) on your machine
    * if you use zsh add this your config
    ```
        export NVM_DIR="$HOME/.nvm"
        [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
        [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
        # place this after nvm initialization!
        autoload -U add-zsh-hook
        load-nvmrc() {
          local node_version="$(nvm version)"
          local nvmrc_path="$(nvm_find_nvmrc)"
          if [ -n "$nvmrc_path" ]; then
            local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
            if [ "$nvmrc_node_version" = "N/A" ]; then
              nvm install
            elif [ "$nvmrc_node_version" != "$node_version" ]; then
              nvm use
            fi
          elif [ "$node_version" != "$(nvm version default)" ]; then
            echo "Reverting to nvm default version"
            nvm use default
          fi
        }
        add-zsh-hook chpwd load-nvmrc
        load-nvmrc
    ```
* install docker [https://www.docker.com/get-started]
* installer nestjs cli [https://docs.nestjs.com/]

## Available Commands
```bash
> make
```

## Launching Project
```bash
> make run
```
## Running Tests

To run tests, run the following command

```bash
> make test
```

## Api documentation

To access the swagger documentation

```bash
> curl localhost:API_PORT/api
```

## Configuration

copy the included .env.example to .env.development and fill the values