class BasePage {
	constructor(tab) {
		this.page = tab;
	}
	waitForDataSpec(value) {
		console.log('waiting for data spec');
		return this.page.waitForSelector(`[data-spec="${value}"]`);
	}
	waitForDataSpecRemoved(value) {
		return this.page.waitForFunction(`!document.querySelector('[data-spec="${value}"]')`, { polling: 'mutation' });
	}
	clickDataSpec(value) {
		return this.page.click(`[data-spec="${value}"]`);
	}
	$evalDataSpec(value, predicate) {
		return this.page.$eval(`[data-spec="${value}"]`, predicate);
	}
}
export default BasePage;
