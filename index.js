class DataImageAttachment extends require("discord.js").MessageAttachment {
	constructor(uri, name = null, patchData) {
		super(DataImageAttachment.makeBuffer(uri, name), name, patchData)
	}

	setFile(uri, name = null) {
		return super.setFile(DataImageAttachment.makeBuffer(uri, name), name)
	}

	static makeBuffer(uri, name) {
		try {
			let data = /data:(?<mime>[\w\/\-\.]+);(?<encoding>\w+),(?<data>.*)/gm.exec(uri)?.groups,
				attachment = Buffer.from(data?.data ?? uri, data?.encoding ?? "base64");
			if(name && data?.mime && !name.match(`.${data.mime.split("/")[1]}$`)){
				console.warn(`Image name: "${name}" does not match data mime type: "${data.mime}"`)
			}
			return attachment
		} catch(e){
			return null
		}
	}
}

module.exports = DataImageAttachment