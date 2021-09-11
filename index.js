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
			if(data){
				if(name && !((mime) => {
					switch(mime){
						case "image/jpeg":
							return /\.jp(e?g|e)$/gmi.test(name);
						case "image/apng":
							return /\.a?png$/gmi.test(name);
						default:
							return RegExp(`[.]${mime.split("/")[1]}$`, "gmi").test(name)
					}
				})(data.mime))
					console.warn(`Image name: "${name}" does not match data mime type: "${data.mime}"`);
				if(data.encoding && !((mime, data) => {
					switch(mime){
						case "image/jpeg":
							return /^\/9j\//g.test(data);
						case "image/png":
						case "image/apng":
							return /^iVBORw0KGg/g.test(data);
						case "image/gif":
							return /^R0lGOD[dl]h/g.test(data);
						case "image/webp":
							return /^UklGR[g-v][a-zA-Z0-9+\/]{5}XRUJQ/g.test(data);
						default:
							return false
					}
				})(data.mime, data.data)){
					let groupName = `File: "${name ?? "<attachment>"}"`;
					console.warn(`MIME type: "${data.mime}" does not match the file's signature`)
					console.groupCollapsed(groupName)
					console.log(`Expected: ${(() => {
						switch(data.mime){
							case "image/jpeg":
								return "/9j/...";
							case "image/png":
							case "image/apng":
								return "iVBORw0KGg...";
							case "image/gif":
								return "R0lGOD.h...";
							case "image/webp":
								return "UklGR......XRUJQ...";
						}
					})()}`)
					console.log(`Received: ${data.data}`)
					console.groupEnd(groupName)
				}
			}
			return attachment
		} catch(err){
			console.error(err)
			console.warn("An arror occured while parsing data URI. Returning `null`")
			return null
		}
	}
}