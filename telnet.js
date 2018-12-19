const {Minitel,Minitels} = require("./Minitel.js")
const P = Promise
const $ = String.fromCharCode
async function delay(pause){
	await new P($ => setTimeout($, pause))
}
async function setup(M) {}
async function loop(m) {
	var pause = 30000;
	//demoGraphics(M,false); await delay(pause)
	//demoGraphics(M,true); await delay(pause)
	//demoCursor(M); await delay(pause)
	await demoKeyboard(m); await delay(pause)
	//demoBip(M); await delay(pause)
	//demoText(M); await delay(pause)
	//demoColor(M); await delay(pause)
}
async function demoKeyboard(m){
	var buffer = ``
	buffer += `${CLEARSCREEN}${CLEARSTATUS}`
	buffer += `\x0D\x7E\x12\x67`
	buffer += `Power    Connexion  Fonction\r\n\r\n`
	//        |         |         |         |         |
	buffer += `Sommaire Annulation Retour   Repetition\r\n\r\n`
	buffer += `Guide    Correction Suite    Envoi     \r\n\r\n\r\n`
	buffer += `     Esc , . ' ; - : ?\r\n\r\n`
	buffer += `      A Z E R T Y U I O P       1 2 3\r\n\r\n`
	buffer += `  CTRL Q S D F G H J K L M      4 5 6\r\n\r\n`
	buffer += `    MAJ W X C V B N MAJ ENTER   7 8 9\r\n\r\n`
	buffer += `    UP DOWN SPACE LEFT RIGHT    * 0 #\r\n`
	m.write(buffer)
}
async function demoPipboy2(m){
	var buffer = ``
	buffer += `${CLEARSCREEN}${CLEARSTATUS}`
	buffer += `${MOVE}@A*${REPEAT}g${MOVE}@J* PIP-OS(R) V7.1.0.8 *${TOP_LEFT}\n\n${STAN_G0}COPYRIGHT 2075 ROBCO(R)\r\nLOADER V1.1\r\nEXEC VERSION 41.10\r\n64k RAM SYSTEM\r\n38911 BYTES FREE\r\nNO HOLOTAPE FOUND\r\nLOAD ROM(1): DEITRIX 303\r\nLOAD ROM(2): SEMIGRAPHIC CHARACTER SET\r\n`
	buffer += `${MOVE}KA.${REPEAT}g`
	buffer += `${MOVE}LA.${REPEAT}Y`
		//buffer += `${MOVE}K${$(i)}#`
	//buffer += `${MOVE}KA${CLEAREOL}`
	//buffer += `${DRCSG0HEADER}${DRCSCHARSELHEADER}!0\`\`\`\`\`\`\`\`\`\`\`\`\`\`0${DRCSFOOTER}!`
	// *
	buffer +=
		`${DRCS_G0_HD}${DRCS_C_HD}!${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x44\x41${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(65)}#`+
		`${DRCS_C_HD}"${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x7C\x5F\x4F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(66)}#`+
		`${DRCS_C_HD}#${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x43\x61\x7C\x7F\x7F\x7F\x7F\x77\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(67)}#`+
		`${DRCS_C_HD}$${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x70\x4E\x43\x60\x78${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(68)}#`+
		`${DRCS_C_HD}%${DRCS_C_FT}`+`\x43\x60\x7C\x47\x40\x70\x50\x46\x41\x50\x44\x43\x40\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(69)}#`+
		`${DRCS_C_HD}&${DRCS_C_FT}`+`\x58\x5C\x53\x5F\x6F\x77\x7E\x5F\x4F\x7F\x7F\x7F\x4F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(70)}#`+
		`${DRCS_C_HD}'${DRCS_C_FT}`+`\x61\x77\x43\x7F\x7F\x7D\x7E\x4F\x7B\x7F\x7E\x5F\x63\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(71)}#`+
		`${DRCS_C_HD}(${DRCS_C_FT}`+`\x7C\x41\x63\x4C\x73\x4C\x7A\x4E\x67\x68\x7B\x46\x60\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(72)}#`+
		`${DRCS_C_HD})${DRCS_C_FT}`+`\x40\x60\x48\x43\x40\x70\x5C\x47\x41\x70\x5C\x42\x40\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(73)}#`+
		`${DRCS_C_HD}*${DRCS_C_FT}`+`\x4C\x73\x5D\x67\x73\x7E\x7F\x67\x5F\x77\x7C\x5E\x58\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(74)}#`+
		`${DRCS_C_HD}+${DRCS_C_FT}`+`\x63\x79\x7F\x7F\x7F\x7F\x7F\x7F\x77\x7C\x7C\x6F\x73\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(75)}#`+
		`${DRCS_C_HD},${DRCS_C_FT}`+`\x74\x46\x62\x70\x74\x4E\x63\x78\x7F\x4F\x73\x7C\x78${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(76)}#`+
		`${DRCS_C_HD}-${DRCS_C_FT}`+`\x40\x70\x44\x41${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(77)}#`+
		`${DRCS_C_HD}.${DRCS_C_FT}`+`\x4F\x7C\x43\x7F\x7F\x77\x7C\x7F\x47\x70\x5F\x4F\x78${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(78)}#`+
		`${DRCS_C_HD}/${DRCS_C_FT}`+`\x4F\x7F\x7F\x7F\x7F\x7F\x7B\x7C\x7C\x4C\x47\x47\x47${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(79)}#`+
		`${DRCS_C_HD}0${DRCS_C_FT}`+`\x70\x48\x42\x40\x40\x40\x40\x40\x40\x40\x40\x40\x5C${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(80)}#`+
		`${DRCS_C_HD}1${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x44\x43\x40\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(81)}#`+
		`${DRCS_C_HD}2${DRCS_C_FT}`+`\x41\x60\x7C\x5E\x4F\x67\x7B\x5C\x77\x5D\x76\x5D\x66\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(82)}#`+
		`${DRCS_C_HD}3${DRCS_C_FT}`+`\x5F\x77\x7D\x78\x7E\x5F\x4F\x77\x7D\x7F\x5F\x67\x79\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(83)}#`+
		`${DRCS_C_HD}4${DRCS_C_FT}`+`\x7C\x5C\x5F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(84)}#`+
		`${DRCS_C_HD}5${DRCS_C_FT}`+`\x7E\x4F\x7B\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(85)}#`+
		`${DRCS_C_HD}6${DRCS_C_FT}`+`\x40\x40\x40\x40\x70\x4E\x43\x70\x7E\x4F\x73\x7E\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(86)}#`+
		`${DRCS_C_HD}7${DRCS_C_FT}`+`\x41\x70\x5C\x4F\x43\x71\x7C\x5F\x4F\x73\x7D\x7F\x5F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(87)}#`+
		`${DRCS_C_HD}8${DRCS_C_FT}`+`\x66\x59\x66\x5B\x66\x79\x6E\x5B\x66\x79\x6E\x5B\x66\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(88)}#`+
		`${DRCS_C_HD}9${DRCS_C_FT}`+`\x7B\x7E\x7F\x6F\x7B\x7E\x7F\x6F\x7B\x7E\x7F\x6F\x7B\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(89)}#`+
		`${DRCS_C_HD}:${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x78\x7F\x43\x7C\x5F\x63\x7C\x7F${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(90)}#`+
		`${DRCS_C_HD};${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7D\x7F\x4F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(91)}#`+
		`${DRCS_C_HD}<${DRCS_C_FT}`+`\x60\x48\x43\x40\x78\x4E\x43\x70\x7E\x4F\x63\x7C\x7F${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(92)}#`+
		`${DRCS_C_HD}=${DRCS_C_FT}`+`\x40\x40\x40\x41\x40\x50\x44\x43\x40\x70\x4C\x46${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(93)}#`+
		`${DRCS_C_HD}>${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x6F\x78\x44\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(94)}#`+
		`${DRCS_C_HD}?${DRCS_C_FT}`+`\x66\x7C\x6F\x49\x70\x58\x64\x4F\x43\x70\x5C\x47\x41\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(95)}#`+
		`${DRCS_C_HD}@${DRCS_C_FT}`+`\x79\x7E\x5F\x77\x7D\x7F\x47\x70\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(96)}#`+
		`${DRCS_C_HD}A${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x7E\x40\x47\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(97)}#`+
		`${DRCS_C_HD}B${DRCS_C_FT}`+`\x7F\x4F\x73\x70\x61\x43\x73\x7C\x7F\x4F\x73\x78\x78${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(98)}#`+
		`${DRCS_C_HD}C${DRCS_C_FT}`+`\x47\x71\x7C\x4F\x41\x70\x5C\x43\x40\x70\x44\x41\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(99)}#`+
		`${DRCS_C_HD}D${DRCS_C_FT}`+`\x7F\x6F\x7B\x7E\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(100)}#`+
		`${DRCS_C_HD}E${DRCS_C_FT}`+`\x40\x70\x4C\x47\x41\x70\x7C\x4F\x43\x70\x7C\x47\x41\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(101)}#`+
		`${DRCS_C_HD}F${DRCS_C_FT}`+`\x7C\x4F\x43\x70\x5C\x47\x40\x70\x4C\x43\x42\x70\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(102)}#`+
		`${DRCS_C_HD}G${DRCS_C_FT}`+`\x40\x70\x40\x42\x40\x70\x44\x41\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(103)}#`+
		`${DRCS_C_HD}H${DRCS_C_FT}`+`\x7F\x7F\x7C\x40\x70\x4B\x7C\x5F\x4F\x73\x7C\x7F\x4F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}K${$(104)}#`+
		`${DRCS_C_HD}I${DRCS_C_FT}`+`\x7F\x7F\x40\x43\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(65)}#`+
		`${DRCS_C_HD}J${DRCS_C_FT}`+`\x43\x47\x73\x7C\x7F\x4F\x73\x7C\x7F\x4F\x73\x78\x7E${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(66)}#`+
		`${DRCS_C_HD}K${DRCS_C_FT}`+`\x40\x50\x40\x40\x40\x70\x5C\x47\x41\x50\x44\x41\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(67)}#`+
		`${DRCS_C_HD}L${DRCS_C_FT}`+`\x7F\x6F\x60\x41\x47\x7F\x7F\x7F\x7F\x7F\x7B\x7C\x73${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(68)}#`+
		`${DRCS_C_HD}M${DRCS_C_FT}`+`\x40\x48\x42\x40\x60\x48\x42\x40\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(69)}#`+
		`${DRCS_C_HD}N${DRCS_C_FT}`+`\x41\x60\x48\x43\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(70)}#`+
		`${DRCS_C_HD}O${DRCS_C_FT}`+`\x70\x4E\x41\x70\x4C\x4A${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(71)}#`+
		`${DRCS_C_HD}P${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x41\x40\x50\x4C\x43\x41\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(72)}#`+
		`${DRCS_C_HD}Q${DRCS_C_FT}`+`\x4F\x77\x7D\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(73)}#`+
		`${DRCS_C_HD}R${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(74)}#`+
		`${DRCS_C_HD}S${DRCS_C_FT}`+`\x7E\x4F\x43\x70\x78\x4C\x43\x40\x63\x41\x70\x7E\x4F\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(75)}#`+
		`${DRCS_C_HD}T${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x41\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(76)}#`+
		`${DRCS_C_HD}U${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(77)}#`+
		`${DRCS_C_HD}V${DRCS_C_FT}`+`\x41\x70\x7C\x4F\x47\x71\x7C\x7F\x4F\x77\x7F\x7F\x5F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(78)}#`+
		`${DRCS_C_HD}W${DRCS_C_FT}`+`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7B\x7C\x7E${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(79)}#`+
		`${DRCS_C_HD}X${DRCS_C_FT}`+`\x7F\x4F\x63\x71\x78\x7C\x4E\x43\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(80)}#`+
		`${DRCS_C_HD}Y${DRCS_C_FT}`+`\x5F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x5F\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(81)}#`+
		`${DRCS_C_HD}Z${DRCS_C_FT}`+`\x40\x40\x42\x40\x60\x48\x43\x40\x70\x4C\x43\x60\x78${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(82)}#`+
		`${DRCS_C_HD}[${DRCS_C_FT}`+`\x79\x4F\x5D\x73\x5E\x53\x74\x5C\x43\x60\x58\x40\x40\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(83)}#`+
		`${DRCS_C_HD}\\${DRCS_C_FT}`+`\x4F\x71\x7F\x4F\x79\x7E\x4F\x70\x7E\x47\x60\x78\x6C${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(84)}#`+
		`${DRCS_C_HD}]${DRCS_C_FT}`+`\x7C\x4E\x43\x40\x60${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(85)}#`+
		`${DRCS_C_HD}^${DRCS_C_FT}`+`\x40\x40\x40\x40\x40\x40\x40\x40\x40\x40\x4C\x4F\x47\x70${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(86)}#`+
		`${DRCS_C_HD}_${DRCS_C_FT}`+`\x4F\x73\x7C\x5F\x47\x60\x40\x47\x7F\x7F\x7F\x7C\x7C\x30${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(87)}#`+
		`${DRCS_C_HD}\`${DRCS_C_FT}`+`\x78\x4C\x42\x40\x48\x4E\x43\x60\x78\x4C\x30${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(88)}#`+
		`${DRCS_C_HD}a${DRCS_C_FT}`+`\x40\x50${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(89)}#`+
		`${DRCS_C_HD}b${DRCS_C_FT}`+`\x74\x4C${DRCS_C_FT}`+`${MOVE}AA${MOVE}L${$(90)}#`+
		// */
		`${MOVE}AA${DRCS_G0}${ESC}P${ESC}G   !"#$ ${REPEAT}B`+
		`${MOVE}BA${DRCS_G0}${ESC}P${ESC}G   %&'( ${REPEAT}B`+
		`${MOVE}CA${DRCS_G0}${ESC}P${ESC}G   )*+, ${REPEAT}B`+
		`${MOVE}DA${DRCS_G0}${ESC}P${ESC}G   -./0 ${REPEAT}B`+
		`${MOVE}EA${DRCS_G0}${ESC}P${ESC}G  123456 ${REPEAT}B`+
		`${MOVE}FA${DRCS_G0}${ESC}P${ESC}G  789\x7F:;< ${REPEAT}B`+
		`${MOVE}GA${DRCS_G0}${ESC}P${ESC}G =>?@ABCD ${REPEAT}B`+
		`${MOVE}HA${DRCS_G0}${ESC}P${ESC}G EFGHIJKLM ${REPEAT}B`+
		`${MOVE}IA${DRCS_G0}${ESC}P${ESC}G NOPQRS ${REPEAT}B`+
		`${MOVE}JA${DRCS_G0}${ESC}P${ESC}G TUVWXYZ ${REPEAT}B`+
		`${MOVE}KA${DRCS_G0}${ESC}P${ESC}G  [\\]^_\` ${REPEAT}B`+
		`${MOVE}LA${DRCS_G0}${ESC}P${ESC}G  ab ${REPEAT}E`
	function ascii_to_hexa(str) {
		var arr1 = [];
		for (var n = 0, l = str.length; n < l; n ++) {
			var hex = Number(str.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join(' ');
	}
	m.write(buffer)
	/*
	m.write(`\f\x1F@A\x18\n\x1F@A\x1B]  STAT  INV  DATA  MAP  RADIO \x12H\x1F@h\x1B] \x1F@B STAT `);await delay(1000)
	m.write(`\f\x1F@A\x18\n\x1F@A\x1B]  STAT  INV  DATA  MAP  RADIO \x12H\x1F@h\x1B] \x1F@H INV `);await delay(1000)
	m.write(`\f\x1F@A\x18\n\x1F@A\x1B]  STAT  INV  DATA  MAP  RADIO \x12H\x1F@h\x1B] \x1F@M DATA `);await delay(1000)
	m.write(`\f\x1F@A\x18\n\x1F@A\x1B]  STAT  INV  DATA  MAP  RADIO \x12H\x1F@h\x1B] \x1F@S MAP `);await delay(1000)
	m.write(`\f\x1F@A\x18\n\x1F@A\x1B]  STAT  INV  DATA  MAP  RADIO \x12H\x1F@h\x1B] \x1F@X RADIO `);await delay(1000)
	*/
}
function demoPipboy(m){
	m.clearScreen()
	m.textMode()
	main=["STAT","INV","DATA","MAP","RADIO"]
	main_selected = 2
	m.moveCursorTo(1, 0)
	m.textColor(BLACK)
	m.bgColor(WHITE)
	m.write(`  `)
	for(var i=0;i<main.length;i++){
		if(i==main_selected){
			m.bgColor(BLACK)
			m.textColor(WHITE)
		}
		m.write(` ${main[i]} `)
		if(i==main_selected){
			m.textColor(BLACK)
			m.bgColor(WHITE)
		}
	}
	m.text("     ")
	m.useDefaultColors()
	m.text("x")
}
function demoGraphics(m,underline) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" GRAPHICS DEMO ", 4, 1);
	m.bgColor(BLACK);

	m.graphicMode();

	if (underline) m.pixelate();
	m.noCursor();
	m.useDefaultColors();

	var xPos = 5;
	var yPos = 5;
	m.moveCursorTo(xPos, yPos);
	var x = 32;
	for (var i=x; i<x+16; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+2);
	for (var i=x+16; i<x+32; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+4);
	for (var i=x+32; i<x+48; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+6);
	for (var i=x+48; i<x+64; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	// Colored
	m.bgColor(RED);
	m.textColor(WHITE);

	m.moveCursorTo(xPos, yPos+10);
	x = 32;
	for (var i=x; i<x+16; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+12);
	for (var i=x+16; i<x+32; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+14);
	for (var i=x+32; i<x+48; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.moveCursorTo(xPos, yPos+16);
	for (var i=x+48; i<x+64; i++) {
		m.serialprint7(i);
		m.serialprint7(9);
	}

	m.useDefaultColors();
	m.noPixelate();

}
function demoCursor(m) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" CURSOR DEMO ", 4, 1);
	m.bgColor(BLACK);

	m.cursor();

	var pause = 1000;
	m.moveCursorTo(TOP_LEFT);
	delay(pause);
	m.moveCursor(RIGHT, 39);
	delay(pause);
	m.moveCursor(DOWN, 23);
	delay(pause);
	m.moveCursor(LEFT, 39);
	delay(pause);
	m.moveCursor(UP, 23);
	delay(pause);
	m.moveCursor(RIGHT, 19);
	delay(pause);
	m.moveCursor(DOWN, 12);
	delay(pause);
	m.moveCursorTo(HOME);
	delay(pause);
	m.moveCursorTo(TOP_RIGHT);
	delay(pause);
	m.moveCursorTo(BOTTOM_LEFT);
	delay(pause);
	m.moveCursorTo(BOTTOM_RIGHT);
	delay(pause);
	m.moveCursorTo(TOP_LEFT);
	delay(pause);
	m.moveCursorTo(CENTER);
	m.noCursor();
}
function demoCharacters(m) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" CHARACTERS DEMO ", 4, 1);
	m.bgColor(BLACK);


	var xPos = 3;
	var yPos = 5;
	m.cursor();

	m.text("abcdefghijklmnopqrstuvwxyz", xPos, yPos);
	m.text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", xPos, yPos+1);

	// 0-9 + punctuation marks, ...
	m.text("!\"#$%&'()*+,-./0123456789",xPos, yPos+2);
	m.text(":;<=>?@[\\]",xPos, yPos+3);

	m.moveCursorTo(xPos, yPos+2);
	m.serialprint7(96);
	m.serialprint7(95);
	m.serialprint7(94);
	m.serialprint7(123);
	m.serialprint7(124);
	m.serialprint7(125);
	m.serialprint7(126);

	// Colored characters
	m.moveCursorTo(xPos, yPos+4);
	m.textColor(RED);

	for (var i=97; i<97+26; i++) {
		m.serialprint7(i);
	}
	m.textColor(WHITE);

	// Double width 1/2
	m.charSize(SIZE_DOUBLE_WIDTH);
	m.text("abcdefghijklmnopqrstuvwxyz", xPos, yPos+5);
	m.text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", xPos, yPos+6);
	m.charSize(SIZE_NORMAL);

	// Special characters
	m.moveCursorTo(xPos, yPos+7);
	var chars = [
		SPE_CHAR_POUND,
		SPE_CHAR_DOLLAR,
		SPE_CHAR_HASHTAG,
		SPE_CHAR_PARAGRAPH,
		SPE_CHAR_ARROW_LEFT,
		SPE_CHAR_ARROW_UP,
		SPE_CHAR_ARROW_RIGHT,
		SPE_CHAR_ARROW_DOWN,
		SPE_CHAR_DEGREE,
		SPE_CHAR_MINUS_PLUS,
		SPE_CHAR_DIVIDE,
		SPE_CHAR_1_4,
		SPE_CHAR_1_2,
		SPE_CHAR_3_4,
		SPE_CHAR_GRAVE,
		SPE_CHAR_ACUTE,
		SPE_CHAR_CIRCUMFLEX,
		SPE_CHAR_UMLAUT,
		SPE_CHAR_CEDIL,
		SPE_CHAR_UPPER_OE,
		SPE_CHAR_LOWER_OE,
		SPE_CHAR_BETA
		//SPE_CHAR_ARROW_UP2,
		//SPE_CHAR_PIPE_BOTTOM,
		//SPE_CHAR_PIPE_MIDDLE,
		//SPE_CHAR_PIPE_LEFT,
		//SPE_CHAR_PIPE_CENTER,
		//SPE_CHAR_PIPE_RIGHT,
		//SPE_CHAR_PIPE_TOP
	];
	for (var i=0; i<chars.length; i++) {
		m.specialChar(chars[i]);
	}

	// Blink
	m.blink();
	m.text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", xPos, yPos+8);
	m.noBlink();

	// Invert video
	m.invertVideo();
	m.text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", xPos, yPos+9);
	m.standardVideo();


	// Transparent
	// No effet on Minitel 1
	m.transparentVideo();
	m.text("ABCDEFGHIJKLMNOPQRSTUVWXYZ", xPos, yPos+10);
	m.standardVideo();
}
function demoBip(m) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" BIP DEMO ", 4, 1);
	m.bgColor(BLACK);

	for (var i=0; i<2; i++) {
		m.bip(50);
		delay(700);
		m.bip(5);
		delay(500);
		m.bip(10);
		delay(2000);
	}
}
function demoText(m) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" TEXT DEMO ", 4, 1);
	m.bgColor(BLACK);

	m.cursor();
	m.text("****************************************", 1, 8);
	m.blink();
	m.text("CAUTION", 17, 13);
	m.noBlink();
	m.text("This is a test", 13, 15);
	m.text("****************************************", 1, 20);
	m.noCursor();
}
function demoColor(m) {
	m.clearScreen();
	m.textMode();
	m.textColor(WHITE);
	m.bgColor(RED);
	m.text(" COLORS DEMO ", 4, 1);

	m.graphicMode();
	m.bgColor(RED);
	m.rect(m.getGraphicChar("011001"), 4, 4, 33, 20);

	for(var i=0; i<18; i++) {
		m.moveCursorTo(5, 5+i);

		m.textColor(WHITE);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(YELLOW);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(CYAN);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(GREEN);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(BLUE);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(RED);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(MAGENTA);
		m.graphic("111111");
		m.repeat(3);

		m.textColor(BLACK);
		m.graphic("111111");
		m.repeat(3);
	}
}
var m = new Minitels()
m.setup = setup
m.loop = loop
m.listen(4545)
console.log("Ready")
