module.exports = class extends require("discord.js").MessageAttachment {
	constructor(uri, name = null, patchData){
		super(null, null, patchData)
		this.setFile(uri, name)
	}

	setFile(file, name = null){
		return super.setFile(typeof file == "string" ? this.constructor.makeBuffer(file, name) : file, name)
	}

	static makeBuffer(uri, name){
		try {
			let data = /^data:(?<media>(?<mime>[a-z\-]+\/[a-z\-\+]+);(?<params>[a-z\-]+\=[\w\-]+)*)?;?(?<encoding>base64)?,(?<data>[a-z0-9!$&',()*+,;=\-._~:@?%\s\/]*)$/gmi.exec(uri)?.groups,
				attachment = Buffer.from(data?.data ?? uri, data?.encoding);
			if(name && data?.mime){
				let matchedMIMEType = ((mime) => {
					switch(mime){
						case "image/jpeg":
							return /\.jpe?g$/gmi.test(name);
						case "image/apng":
							return /\.a?png$/gmi.test(name);
						default:
							return RegExp(`.${mime.split("/")[1]}$`, "gmi").test(name)
					}
				})(data.mime);
				if(!matchedMIMEType)
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