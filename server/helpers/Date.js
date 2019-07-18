class commonDate {
	static modernDate() {
		const m = new Date();
		const dateString = `${(`${m.getDate()}`).slice(-2)}/${(`${m.getMonth() + 1}`).slice(-2)}/${m.getFullYear()}`;
		return dateString;
	}
}

export default commonDate;
