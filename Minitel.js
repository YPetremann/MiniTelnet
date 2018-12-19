var net = require('net')
const P = Promise

NUL = `\x00`
ESC = `\x1B`
GRAPHIC_MODE = `\x0E`
TEXT_MODE = `\x0F`

HORIZONTAL = 0
VERTICAL = 1

// Cursor moves
LEFT = `\x08`
RIGHT = `\x09`
DOWN = `\x0A`
UP = `\x0B`

// Cursor positionning
HOME = `\x0D`
LINE_END = `\x18`//

MOVE = `\x1F`
TOP_LEFT = `\x1E`
TOP_RIGHT = `${MOVE}Ai`
BOTTOM_LEFT = `${MOVE}XB`
BOTTOM_RIGHT = `${MOVE}Xi`
CENTER = `${MOVE}LU`

// DRCS
DRCS_C_HD = `${MOVE}#`
DRCS_G0_HD = `${DRCS_C_HD}   BI`
DRCS_G1_HD = `${DRCS_C_HD}   CI`
DRCS_C_FT = `0`
DRCS_FT = `${MOVE}AA`

STAN_G0 = `${ESC}(@`
DRCS_G0 = `${ESC}( B`
STAN_G0 = `${ESC})c`
DRCS_G0 = `${ESC}) C`

// Cursor visibility
// Preceeded by 27
CURSOR_SHOW = `\x11`
CURSOR_HIDE = `\x14`

REPEAT = `\x12`
// Clear screen
CLEARSCREEN = `\x0C`
CLEARSOS = `${ESC}[1J`
CLEAREOS = `${ESC}[J`
CLEARSES = `${ESC}[2J`
CLEARSOL = `${ESC}[1K`
CLEAREOL = `\x18`
CLEARSEL = `${ESC}[2K`
CLEARSTATUS = `${MOVE}@A${CLEAREOL}${DOWN}`

// Font type
// Preceeded by 27
// DOUBLE-HEIGHT and DOUBLE may not work on certain Minitels
SIZE_NORMAL = 76
SIZE_DOUBLE_HEIGHT = 77
SIZE_DOUBLE_WIDTH = 78
SIZE_DOUBLE = 79


// Colors (+80 for background, +64 for text)
// Preceeded by 27
// 64->71 txt color black, red, green, yellow, blue, magenta, cyan, white
// 80->87 bg color black, red, green, yellow, blue, magenta, cyan, white
BLACK = 0
RED = 1
GREEN = 2
YELLOW = 3
MAGENTA = 4
BLUE = 5
CYAN = 6
WHITE = 7

// Blink
// Preceeded by 27
BLINK_ON = 72
BLINK_OFF = 73

// Incrustation
// Preceeded by 27
INCRUSTATION_ON = 75
INCRUSTATION_OFF = 74

// Underline
UNDERLINE_ON = 90
UNDERLINE_OFF = 89

// Underline
LINE_MASK_ON = 88
LINE_MASK_OFF = 95

// Video mode
VIDEO_INVERT = 93
VIDEO_STANDARD = 92
VIDEO_TRANSPARENT = 94

// Speeds
SPEED_75 = 0
SPEED_300 = 1
SPEED_4800 = 100
SPEED_9600 = 111 // ??? Minitel 2 ???

// Bip
BIP = 7

// Accents
// ACCUTE = 65
// GRAVE = 66
// CIRCUMFLEX = 67
// UMLAUT = 72

SUB_ARTICLE_SEPARATOR = 31

// Preceeded by 25
SPE_CHAR_POUND = 35
SPE_CHAR_DOLLAR = 36
SPE_CHAR_HASHTAG = 38
SPE_CHAR_PARAGRAPH = 39
SPE_CHAR_ARROW_LEFT = 44
SPE_CHAR_ARROW_UP = 45
SPE_CHAR_ARROW_RIGHT = 46
SPE_CHAR_ARROW_DOWN = 47
SPE_CHAR_DEGREE = 48
SPE_CHAR_MINUS_PLUS = 49
SPE_CHAR_DIVIDE = 56
SPE_CHAR_1_4 = 60 // output only ?
SPE_CHAR_1_2 = 61 // output only ?
SPE_CHAR_3_4 = 62 // output only ?
SPE_CHAR_GRAVE = 65
SPE_CHAR_ACUTE = 66
SPE_CHAR_CIRCUMFLEX = 67
SPE_CHAR_UMLAUT = 72
SPE_CHAR_CEDIL = 75
SPE_CHAR_UPPER_OE = 106
SPE_CHAR_LOWER_OE = 122
SPE_CHAR_BETA = 123

// Non Arduino characters
SPE_CHAR_ARROW_UP2 = 94
SPE_CHAR_PIPE_BOTTOM = 95
SPE_CHAR_PIPE_MIDDLE = 96
SPE_CHAR_PIPE_LEFT = 123
SPE_CHAR_PIPE_CENTER = 124
SPE_CHAR_PIPE_RIGHT = 125
SPE_CHAR_PIPE_TOP = 126

// TODO Escape character handling ???

SOMMAIRE = 198
ANNULATION = 197
RETOUR = 66
REPETITION = 195
GUIDE = 68
CORRECTION = 71
SUITE = 72
ENVOI = 65
class Minitel {
	init() {
		this.useDefaultColors()
		this.refreshSettings()
	}
	getGraphicChar(s) {
		var carac = 32; // caractère pixel

		if (s.length == 6) {
			carac += s[0] == '0' ? 0 : 1
			carac += s[1] == '0' ? 0 : 2
			carac += s[2] == '0' ? 0 : 4
			carac += s[3] == '0' ? 0 : 8
			carac += s[4] == '0' ? 0 : 16
			carac += s[5] == '0' ? 0 : 32
			return carac
		}
		return 9
	}
	serialprint7(b) {
		/*
		*var  i = false
		*for (var j = 0; j < 8; j++) {
		*if (bitRead(b, j) == 1) {
		*i = !i; //calcul de la parité
		*}
		*}
		*if (i) {bitWrite(b, 7, 1);}
		*else {bitWrite(b, 7, 0);}
		*/
		this.write(String.fromCharCode(b))
	}
	write(s){
		//console.log(this.socket.destroyed)
		this.socket.write(s)
	}
	graphic(s, x=null, y=null) {
		if(x!=null && y!=null) this.moveCursorTo(x, y)
		this.serialprint7(this.getGraphicChar(s))
	}
	textByte (b, x=null, y=null) {
		if(x!=null && y!=null) this.moveCursorTo(x, y)
		this.serialprint7(b)
	}
	textChar(c, x=null, y=null) {
		if(x!=null && y!=null) this.moveCursorTo(x, y)
		var charByte = this.getCharByte(c)
		if (this.isValidChar(charByte)) {
			this.serialprint7(charByte)
			return true
		}
		return false
	}
	text(s, x=null, y=null, orientation=HORIZONTAL) {
		if(x!=null && y!=null) this.moveCursorTo(x, y)
		for (var i = 0; i < s.length; i++) {
			var c = s.charAt(i)
			var indent = false
			if (this.isAccent(c)) {
				i += 1; // chars with accents take 2 array indexes
				c = s.charAt(i)
				indent = this.printAccentChar(c)
			} else {
				// TODO Check if c cedil
				indent = this.textChar(c)
			}
			if (indent && orientation == VERTICAL) {
				this.moveCursor(LEFT)
				this.moveCursor(DOWN)
			}
		}
	}

	// Characters
	/*
	xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx // 0 -> 32
	!"#$%&'()*+,-./0123456789:;<=>?@ // 33 -> 64
	ABCDEFGHIJKLMNOPQRSTUVWXYZ[\] // 65 -> 93
	x // 94 up arrow
	_ // 95 lower pipe associated to underscore
	x // 96 pipe
	abcdefghijklmnopqrstuvwxyz // 97 -> 122
	// 123 124 125 126 various pipes
	*/

	// Used to display characters sent from the Arduino
	// As a result, not all Minitel supported characters can be sent to/from Arduino
	// However, they can be displayed using the specialChar() or graphic functions

	getCharByte (c) {
		var characters = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]x_xabcdefghijklmnopqrstuvwxyz"
		return characters.lastIndexOf(c)
	}
	isSerializableKey() {
		return (_characterKey >= 33 && _characterKey <= 122 && _characterKey != 94 && _characterKey != 96)
	}
	specialChar(b, x=null, y=null) {
		if(x!=null && y!=null) this.moveCursorTo(x, y)
		if (this.isValidChar(b)) {
			this.serialprint7(25)
			this.serialprint7(b)
			if (b == 75) {
				this.serialprint7(99)
			}
		}
	}
	isValidChar(index) {
		return (index >= 32 && index <= 123)
	}

	// ACCENTS HANDLING
	isAccent(c) {
		var accents = "àáâäèéêëìíîïòóôöùúûü"
		if (accents.indexOf(c) >= 0) {
			return true
		}
		return false
	}
	printAccentChar(c) {
		//var accents = "àáâäèéêëìíîïòóôöùúûü"

		var index = (accents.indexOf(c)) / 2
		var accentTypeIndex = index % 4
		printAccent(accentTypeIndex)

		// Check which letter
		var letterIndex = floor(index / 4)
		var letter = getAccentLetter(letterIndex)
		textChar(letter)

		return true; // There should be no pb printing accents
	}
	printAccent(index) {
		switch (index) {
			case (0) :
			specialChar(SPE_CHAR_GRAVE)
			break
			case (1) :
			specialChar(SPE_CHAR_ACUTE)
			break
			case (2) :
			specialChar(SPE_CHAR_CIRCUMFLEX)
			break
			default :
			specialChar(SPE_CHAR_UMLAUT)
		}
	}
	getAccentLetter(letterIndex) {
		switch (letterIndex) {
			case (0) :
			return ('a')
			break
			case (1) :
			return ('e')
			break
			case (2) :
			return ('i')
			break
			case (3) :
			return ('o')
			break
			default :
			return ('u')
		}
	}

	// REPEAT CHARACTER
	repeat(n) {
		this.write(`${REPEAT}`)
		this.serialprint7(64 + n)
	}

	// COLOR MANAGEMENT
	bgColor(c) {
		if (c >= 0 && c <= 7) {
			this.write(`${ESC}`)
			this.serialprint7(c + 80)
			this._currentBgColor = c
		}
	}
	textColor(c) {
		if (c >= 0 && c <= 7) {
			this.write(`${ESC}`)
			this.serialprint7(c + 64)
			this._currentTextColor = c
		}
	}
	useDefaultColors() {
		this.bgColor(this.BLACK)
		this.textColor(this.WHITE)
	}
	// MOVING AND POSITIONNING THE CURSOR
	moveCursorTo(location, y=null) {
		if (y!=null) {
			var x = location
			this.write(`${MOVE}`); // Code positionnement de curseur
			this.serialprint7(64 + y); // coordonnées x (x+64) (x de 1 à 40)
			this.serialprint7(64 + x); // coordonnées y (y+64) (y de 1 à 24)
			this.refreshSettings()
		} else if (location == HOME || location == LINE_END || location == TOP_LEFT) {
			this.write(location)
		} else if (location == CENTER || location == TOP_RIGHT || location == BOTTOM_RIGHT || location == BOTTOM_LEFT) {
			this.write(location)
			this.refreshSettings()
		}
	}
	moveCursor(dir, n=1) {
		if (dir == LEFT || dir == RIGHT || dir == UP || dir == DOWN) {
			for (var i = 0; i < n; i++) {
				this.write(dir)
			}
		}
	}
	drcsChar(chars){
		for (var _ in chars)
			this.serialprint7(chars[_])
		this.write(`${DRCSCFT}`)
	}
	// RESTORING THE CURRENT SETTINGS AS
	// SOME COMMANDS SEEM TO RESET THEM
	refreshSettings() {
		// Common parameters
		this.write(this._currentMode)
		this.textColor(this._currentTextColor)
		this.bgColor(this._currentBgColor); // Only in graphic mode ?
		this.blink(this._currentBlink)
		this.cursor(this._currentShowCursor)
		// Graphic mode specific parameters
		if (this._currentMode == GRAPHIC_MODE) {
			this.pixelate(this._currentUnderline)
		}
		// Text mode specific parameters
		if (this._currentMode == TEXT_MODE) {
			this.video(this._currentVideo)
			this.charSize(this._currentSize)
		}
	}

	// SHOW / HIDE CURSOR
	noCursor() {
		this.cursor(false)
	}
	cursor(b=true) {
		this.write(b?CURSOR_SHOW:CURSOR_HIDE)
		this._currentShowCursor = b
	}

	// CLEANING SYSTEM
	clearScreen() {
		this.write(CLEARSCREEN)
		this.refreshSettings()
	}

	// TEXT OR GRAPHIC MODE SELECTION
	mode(mode) {
		if (mode == GRAPHIC_MODE || mode == TEXT_MODE) {
			this._currentMode = mode
			this.refreshSettings()
		}
	}
	graphicMode() {
		this.mode(GRAPHIC_MODE)
	}
	textMode() {
		this.mode(TEXT_MODE)
	}

	noBlink() {
		this.blink(false)
	}
	blink(b = true) {
		this.write(`${ESC}`)
		this.serialprint7(b?BLINK_ON:BLINK_OFF)
		this._currentBlink = b
	}

	charSize(type) {
		if (type == SIZE_NORMAL || type == SIZE_DOUBLE_HEIGHT || type == SIZE_DOUBLE_WIDTH || type == SIZE_DOUBLE) {
			this.write(`${ESC}`)
			this.serialprint7(type)
			this._currentSize = type
		}
	}

	incrustation(b=INCRUSTATION_ON) {
		serialprint7(27)
		if (b) {
			serialprint7(INCRUSTATION_ON)
		}
		else {
			serialprint7(INCRUSTATION_OFF)
		}
	}
	noIncrustation() {
		incrustation(INCRUSTATION_OFF)
	}

	noPixelate() {
		this.pixelate(false)
	}
	pixelate(b=true) {
		this.write(`${ESC}`)
		this.serialprint7(b?UNDERLINE_ON:UNDERLINE_OFF)
		this._currentUnderline = b
	}

	lineMask(b=LINE_MASK_ON) {
		serialprint7(27)
		if (b) {
			serialprint7(LINE_MASK_ON)
		}
		else {
			serialprint7(LINE_MASK_OFF)
		}
	}
	noLineMask() {
		lineMask(LINE_MASK_OFF)
	}

	video(v) {
		if (v == VIDEO_INVERT || v == VIDEO_STANDARD || v == VIDEO_TRANSPARENT) {
			this.write(`${ESC}`)
			this.serialprint7(v)
			this._currentVideo = v
		}
	}
	standardVideo() {
		this.video(VIDEO_STANDARD)
	}
	invertVideo() {
		this.video(VIDEO_INVERT)
	}
	transparentVideo() {
		this.video(VIDEO_TRANSPARENT)
	}

	setMaxSpeed() {
		/*
		serialprint7(27)
		serialprint7(SPEED_4800)
		*/
	}

	// SOUND
	// Less than 200ms isn't taken into account
	bip(duration) {
		for(var i =0;i<duration;i=i+100) {
			this.write(`${ESC}`)
			this.serialprint7(BIP)
		}
	}

	// KEYSTROKES ANALYSIS AND LOGGING
	/*
	Read and decode keyboard input and store values in according variables
	_specialCharacterKey if a special character Jeu G2, schema 2.8 p103
	_characterKey if a normal character Jeu G0, schema 2.5 p 100
	_menuKey is a menu key
	*/
	readKey() {

		_menuKey = -1
		_specialCharacterKey = -1
		_characterKey = -1


		var  b = 255
		b =  read()

		// Menu keys start with 147 + another number
		if (b == 147) {

			_accentKey = -1; // Drop previously set accent
			delay(50); // Wait a bit
			_menuKey = read(); // Read the next var

		}

		// Shift or Ctrl key with GP2 character set start with 153
		else if (b == 153) {
			_accentKey = -1; // Drop previously set accent

			delay(50); // Wait a bit
			b = read(); // Read the next var

			if (b == 65 || b == 66 || b == 72 || b == 195) { // Accent key
				_accentKey = b % 128
				return
			}

			else {
				_specialCharacterKey = b % 128

				if (b == 75) { // Special case for the ç
					delay(50); // Wait a bit
					b = read(); // Read the next var
					if (b == 99) {
						_specialCharacterKey = 75; // Implicit cedil with implicit c
					}
				}
			}
		}

		// Non prefixed keys
		else if (b != 255) {
			_characterKey = b % 128

			// If an accent key was pressed before check if character can have this an accent
			if (_characterKey ==  97 || _characterKey ==  101 || _characterKey == 105 || _characterKey == 111 || _characterKey == 117 ) {

				// Remove accents if not supported by this letter
				if (_characterKey == 97 && _accentKey == SPE_CHAR_ACUTE ) { // a
					_accentKey = -1
				}
				else if (_characterKey == 105 && (_accentKey == SPE_CHAR_GRAVE || _accentKey == SPE_CHAR_ACUTE )) { // i
					_accentKey = -1
				}
				else if (_characterKey == 111 && (_accentKey == SPE_CHAR_GRAVE || _accentKey == SPE_CHAR_ACUTE )) { // o
					_accentKey = -1
				}
				else if (_characterKey == 117 && _accentKey == SPE_CHAR_ACUTE ) { // u
					_accentKey = -1
				}
			}
			else {
				_accentKey = -1
			}
		}
	}

	// KEYS GETTERS
	keyTyped() {
		return isMenuKey() || isCharacterKey() || isSpecialCharacterKey() || accentKeyStored()
	}
	isMenuKey() {
		return _menuKey != -1
	}
	getMenuKey() {
		return _menuKey
	}
	isSpecialCharacterKey() {
		return _specialCharacterKey != -1
	}
	getSpecialCharacterKey() {
		return _specialCharacterKey
	}
	isCharacterKey() {
		return _characterKey != -1
	}
	getCharacterKey() {
		return _characterKey
	}
	accentKeyStored() {
		return _accentKey != -1
	}
	getAccentKey() {
		return _accentKey
	}

	// DRAWING FUNCTIONS
	rect(c, x, y, w, h) {
		this.moveCursorTo(x, y)
		this.textByte (c)
		this.repeat(w)
		this.moveCursorTo(x, y + 1)
		for (var i = 0; i < h - 2; i++) {
			this.textByte (c)
			this.moveCursor(DOWN)
			this.moveCursor(LEFT)
		}
		this.moveCursorTo(x + w, y + 1)
		for (var i = 0; i < h - 2; i++) {
			this.textByte (c)
			this.moveCursor(DOWN)
			this.moveCursor(LEFT)
		}
		this.moveCursorTo(x, y + h - 1)
		this.textByte(c)
		this.repeat(w)
	}
	spiral(x, y, siz, c) {
		var curSiz = 1
		// Center
		this.specialChar(c, x, y)
		x++
		// Spiral
		for (var i = 0; i < siz; i++) {
			for (var j = 0; j < curSiz; j++) {
				this.specialChar(c, x, y)
				y++
			}
			curSiz++
			for (var j = 0; j < curSiz; j++) {
				this.specialChar(c, x, y)
				x--
			}
			for (var j = 0; j < curSiz; j++) {
				this.specialChar(c, x, y)
				y--
			}
			curSiz++
			for (var j = 0; j < curSiz; j++) {
				this.specialChar(c, x, y)
				x++
			}
		}
	}

	constructor(socket) {
		this.socket=socket
		this.setup = Minitel.setup
		this.loop  = Minitel.loop
		this._currentBgColor = BLACK
		this._currentTextColor = WHITE
		this._currentMode = TEXT_MODE
		this._currentVideo = VIDEO_STANDARD
		this._currentSize = SIZE_NORMAL
		this._currentUnderline = false
		this._currentBlink = false
		this._currentShowCursor = false
	}
	get setup()  {return this._setup}
	set setup(c) {this._setup=c}
	get loop()   {return this._loop}
	set loop(c)  {this._loop=c}
	communicate(){
		(async function(t){
			try{
				t.init()
				await t._setup(t)
				while(true){
					await t._loop(t)
				}
			} catch (e){
				if(e.message == "This socket has been ended by the other party"){
					console.log(`ended ${t.socket.remoteAddress}:${t.socket.remotePort}`)
					t.socket.destroy()
				}else{
					console.log(e)
				}
			}
		})(this)
	}
}
class Minitels {
	constructor() {
		this.port  = 23
		this._setup = ()=>{}
		this._loop  = ()=>{}
	}
	get setup()  {return this._setup}
	set setup(c) {this._setup=c}
	get loop()   {return this._loop}
	set loop(c)  {this._loop=c}
	listen(port){
		Minitel.setup = this._setup
		Minitel.loop = this._loop
		net.createServer(function(socket) {
			console.log(`start ${socket.remoteAddress}:${socket.remotePort}`)
			var m   = new Minitel(socket)
			m.communicate()
		}).listen(port)
	}
}
exports.Minitels = Minitels
exports.Minitel = Minitel
