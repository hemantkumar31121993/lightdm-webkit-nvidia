## Custom NVIDIA fan style LightDM Webkit greeter theme

This is a theme for LightDM Webkit (`lightdm-webkit-greeter`).

### Features

- Selecting an available user from a dropdown
- Entering their password
- Seeing their profile picture
- Restarting the computer
- Shutting the computer down
- A clock!

### How to install

Instructions will differ for every platform, but I can tell you how to install it on Arch Linux:

1. Install and enable `lightdm` and `lightdm-webkit-greeter`
2. In the terminal, `cd` to `/usr/share/lightdm-webkit/themes/`
3. Clone this repository here, it should create a folder called `lightdm-webkit-google`
4. Enable the theme in your `/etc/lightdm/lightdm-webkit-greeter.conf`

### Setting your own user picture

There are a couple of methods you can use to set your user picture in LightDM:

- Put a `jpg` of your face in your home directory as a file called `.face`

or

- Add `Icon=/path/to/your/face.png` to the bottom of `/var/lib/AccountsService/users/<youraccountname>`


### License

Copyright © 2017 Hemant Kumar hemantkumar31121993@gmail.com

This work is free to redistribute.
