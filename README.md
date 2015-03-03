# NodeArduino
## Set up
### node !!! Please use node v 0.12.0

    curl -L git.io/nodebrew | perl - setup
    sudo vim .bashrc
add **export PATH=$HOME/.nodebrew/current/bin:$PATH** to the end of .bashrc

    source .bashrc
    nodebrew ls-remote
    nodebrew install v0.12.0
    nodebrew use v0.12.0
    node -v

### socket.io

	npm install socket.io

### serialport

	npm install serialport

### johnny-five

    git clone git://github.com/rwldrn/johnny-five.git && cd johnny-five
    npm install

### firmata

    npm install firmata