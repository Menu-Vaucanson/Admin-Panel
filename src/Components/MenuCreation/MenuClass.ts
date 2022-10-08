class Dish {
	name: string;
	content: Array<any>;
	style?: string;
	styleDark?: string;
	constructor(name: string, content: Array<any>, style?: string, styleDark?: string) {
		this.name = name;
		this.content = content;
		if (typeof style != 'undefined') {
			this.style = style;
		}
		if (typeof styleDark != 'undefined') {
			this.styleDark = styleDark;
		}
	}
}

class Menu {
	date: string;
	error: number = 0;
	errorEvening: number = 0;
	errorMessage?: string;
	errorEveningMessage?: string;
	menu?: Dish[];
	evening?: Dish[];

	constructor(date: string, isErrored1: boolean, isErrored2: boolean, errorMessage?: string, errorEveningMessage?: string) {
		this.date = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2])).toLocaleDateString();
		if (isErrored1) {
			this.error = 1;
		}
		if (isErrored2) {
			this.errorEvening = 1;
		}
		if (typeof errorMessage != 'undefined') {
			this.errorMessage = errorMessage;
		}
		if (typeof errorEveningMessage != 'undefined') {
			this.errorEveningMessage = errorEveningMessage;
		}
	}

	setErrorMessage(message: string) {
		this.errorMessage = message;
	}

	setErrorEveningMessage(message: string) {
		this.errorEveningMessage = message;
	}

	setMenu(dishs: Array<Dish>) {
		this.menu = dishs;
	}

	setMenuStyle(menuIndex: number, style: string) {
		if (typeof this?.menu != 'undefined') {
			if (typeof this?.menu[menuIndex] != 'undefined') {
				this.menu[menuIndex].style = style;
			}
		}
	}

	setMenuStyleDark(menuIndex: number, style: string) {
		if (typeof this?.menu != 'undefined') {
			if (typeof this?.menu[menuIndex] != 'undefined') {
				this.menu[menuIndex].styleDark = style;
			}
		}
	}

	setEveningStyle(menuIndex: number, style: string) {
		if (typeof this?.evening != 'undefined') {
			if (typeof this?.evening[menuIndex] != 'undefined') {
				this.evening[menuIndex].style = style;
			}
		}
	}

	setEveningStyleDark(menuIndex: number, style: string) {
		if (typeof this?.evening != 'undefined') {
			if (typeof this?.evening[menuIndex] != 'undefined') {
				this.evening[menuIndex].styleDark = style;
			}
		}
	}

	setEvening(dishs: Array<Dish>) {
		this.evening = dishs;
	}
}

export { Dish };
export default Menu;