
enum SFCButton {
    //% block="None"
    None = 0,
    //% block="Right shoulder"
    RSH = 4,
    //% block="Left shoulder"
    LSH,
    //% block="X"
    X,
    //% block="A"
    A,
    //% block="Right"
    R,
    //% block="Left"
    L,
    //% block="Down"
    D,
    //% block="Up"
    U,
    //% block="Start"
    Start,
    //% block="Select"
    Select,
    //% block="Y"
    Y,
    //% block="B"
    B
}


/**
 * SFC NES Gamepad
 */
//% weight=100 color=#0fbc11 icon=""
namespace sfc {
    let keys = ["0", "0", "0", "0", "RSH", "LSH", "X", "A", "R", "L", "D", "U", "Start", "Select", "Y", "B"]
    export class gamepad {
        data: DigitalPin;
        latch: DigitalPin;
        clk: DigitalPin;
        keylist: string[];

        gamepad() {
            this.data = DigitalPin.P0
            this.latch = DigitalPin.P1
            this.clk = DigitalPin.P2
        }

        /**
         * Get SFC gamepad reading value for developer
         */
        //% blockId=getSFCReading block="%sfcGamepad|get SFC gamepad reading value for developer" blockExternalInputs=false
        //% weight=4 advanced=true
        getSFCReading(): number {
            pins.digitalWritePin(this.latch, 1)
            pins.digitalWritePin(this.latch, 0)
            let word = 0
            for (let i = 0; i <= 15; i++) {
                pins.digitalWritePin(this.clk, 0)
                word = word + (pins.digitalReadPin(this.data) << i)
                pins.digitalWritePin(this.clk, 1)
            }
            return word
        }


        /**
         * Cache SFC gamepad press key list
         */
        //% blockId=cachePressedKeyList block="%sfcGamepad|cache SFC gamepad press key list" blockExternalInputs=false
        //% weight=90
        //% blockSetVariable=getpresskeylist
        cachePressedKeyList(): string[] {
            let words: string[] = []
            //read 1 times
            //for (let t = 0; t <= 0; t++) {
                let reading: number = this.getSFCReading()
                if(reading == 65535 && words.indexOf("0")==-1) words.push("None");
                else
                {
                    for (let i = 15; i >= 0; i--) {
                        let keyname = keys[15-i]
                        let presskey: number = (reading >> i) & 1
                        if (presskey != 1 && words.indexOf(keyname)==-1)
                            words.push(keyname);
                    }
                }
            //}
            this.keylist = words
            return words;
        }

        /**
         * is Contains Button
         * @param button button string, eg: SFCButton.None
         */
        //% blockId=isContainsButton block="is %sfcGamepad| Cache key list contains button:%button"
        //% weight=80
        isContainsButton(button: SFCButton): boolean {
            return this.keylist.indexOf(keys[button]) != -1;
        }
    }

    /**
     * Set SFC
     * @param pin1 set pin1, eg: DigitalPin.P0
     * @param pin2 set pin2, eg: DigitalPin.P1
     * @param pin3 set pin3, eg: DigitalPin.P2
     */
    //% blockId=setSFC block="set SFC pins : |data pin %pin1|latch pin %pin2|clk pin %pin3" blockExternalInputs=false
    //% weight=100
    //% pin1.fieldEditor="gridpicker" pin1.fieldOptions.columns=4
    //% pin2.fieldEditor="gridpicker" pin2.fieldOptions.columns=4
    //% pin3.fieldEditor="gridpicker" pin3.fieldOptions.columns=4
    //% blockSetVariable=sfcGamepad
    export function setSFC(pin1: DigitalPin = DigitalPin.P0, pin2: DigitalPin = DigitalPin.P1, pin3: DigitalPin = DigitalPin.P2): gamepad {
        let sfc = new gamepad();
        sfc.data = pin1;
        sfc.latch = pin2;
        sfc.clk = pin3;
        return sfc;
    }
}