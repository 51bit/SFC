# SFC NES Gamepad

The Nintendo Entertainment System (or NES for short) is an 8-bit home video game console developed and manufactured by Nintendo.In Japan, the system is called the Super Famicom (SFC).

I am selling SFC NES Gamepad suite (Tranditional NES gamepad + 9 pin interface + Dupont Line Link To Alligator Clip) for microbit on https://51bit.taobao.com/ , only ship mainland of China at present, if you are out of mainland of China, you need to send me email to buy it: 648952046@qq.com .

**SFC NES Gamepad:**

![Alt text](https://github.com/51bit/SFC/raw/master/icon.png?raw=true "SFC NES Gamepad picture")

**SFC NES Gamepad suite for microbit:**

(Supporting by me as I am selling it.)

![Alt text](https://github.com/51bit/SFC/raw/master/product.jpg?raw=true "Product picture")
![Alt text](https://github.com/51bit/SFC/raw/master/product2.jpg?raw=true "Product picture")

**My 9 pin gamepad definition:**
![Alt text](https://github.com/51bit/SFC/raw/master/myDefinition.JPG?raw=true "My 9 pin gamepad definition picture")

[Other definitions](https://github.com/51bit/SFC/raw/master/otherDefinitions.JPG)

## Basic Usage

### sfcGamepad.isContainsButton without loop way

```blocks
let value = 0
let sfcGamepad: sfc.gamepad = null
let getpresskeylist: string[] = []
basic.showIcon(IconNames.Heart)
sfcGamepad = sfc.setSFC(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P2
)
basic.forever(function () {
    getpresskeylist = sfcGamepad.cachePressedKeyList(
    )
    if (sfcGamepad.isContainsButton(SFCButton.L)) {
        basic.showArrow(ArrowNames.West)
    }
    if (sfcGamepad.isContainsButton(SFCButton.R)) {
        basic.showArrow(ArrowNames.East)
    }
    if (sfcGamepad.isContainsButton(SFCButton.U)) {
        basic.showArrow(ArrowNames.North)
    }
    if (sfcGamepad.isContainsButton(SFCButton.D)) {
        basic.showArrow(ArrowNames.South)
    }
    if (sfcGamepad.isContainsButton(SFCButton.Y)) {
        basic.showString("Y")
    }
    if (sfcGamepad.isContainsButton(SFCButton.B)) {
        basic.showString("B")
    }
    if (sfcGamepad.isContainsButton(SFCButton.None)) {
        basic.showIcon(IconNames.Heart)
    }
})
```

### value.compare("L") in foreach getpresskeylist way

```blocks
let sfcGamepad: sfc.gamepad = null
let getpresskeylist: string[] = []
let value = ""
basic.showIcon(IconNames.Heart)
sfcGamepad = sfc.setSFC(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P2
)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    getpresskeylist = sfcGamepad.cachePressedKeyList(
    )
    for (let value of getpresskeylist) {
        if (value.compare("L") == 0) {
            basic.showArrow(ArrowNames.West)
        } else if (value.compare("R") == 0) {
            basic.showArrow(ArrowNames.East)
        } else if (value.compare("U") == 0) {
            basic.showArrow(ArrowNames.North)
        } else if (value.compare("D") == 0) {
            basic.showArrow(ArrowNames.South)
        } else if (value.compare("None") == 0) {
            basic.clearScreen()
        } else {
            basic.showString(value)
        }
    }
})
```

Use ``||setSFC||`` to init SFC NES Gamepad.

Use ``||cachePressedKeyList||`` to cache the pressed key list.

Use ``||isContainsButton||`` to check if the cached the pressed key list contains specified button. 

## example screenshots

![Alt text](https://github.com/51bit/SFC/raw/master/sfcpxt.png?raw=true "SFC PXT picture")
![Alt text](https://github.com/51bit/SFC/raw/master/sfcblocks.png?raw=true "SFC Blocks picture")

### connections:

![Alt text](https://github.com/51bit/SFC/raw/master/sfcpin1.jpg?raw=true "SFC 5 Pin picture")
![Alt text](https://github.com/51bit/SFC/raw/master/sfcpin2.jpg?raw=true "SFC 4 Pin picture")

## Supported targets

* for PXT/microbit

## License

MIT
