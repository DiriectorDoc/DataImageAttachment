module.exports = class DataImageAttachment extends require("discord.js").MessageAttachment {
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
			if(name && data?.mime){
				let unmatchedMIMEType = false;
				switch(data.mime){
					case "image/jpeg":
						unmatchedMIMEType = /\.jpe?g$/gmi.test(name);
						break;
					case "image/apng":
						unmatchedMIMEType = /\.a?png$/gmi.test(name);
						break;
					default:
						unmatchedMIMEType = RegExp(`.${data.mime.split("/")[1]}$`, "gmi").test(name)
				}
				if(unmatchedMIMEType)
					console.warn(`Image name: "${name}" does not match data mime type: "${data.mime}"`)
			}
			return attachment
		} catch(err){
			console.error(err)
			console.warn("An arror occured while parsing data URI. Returning `null`")
			return null
		}
	}
}