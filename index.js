const {MessageAttachment} = require("discord.js")

class DataImageAttachment extends MessageAttachment {
	
    constructor(uri, name = null, patchData) {
        super(makeBuffer(uri, name), name, patchData)
    }

    setFile(uri, name = null) {
        return super.setFile(makeBuffer(uri, name), name)
    }

    setName(name) {
        return super.setName(name)
    }

    _patch(data) {
        super._patch(data)
    }

    get spoiler() {
        return super.spoiler()
    }

    toJSON() {
        return super.toJSON()
    }

	static makeBuffer = function(uri, name){
		let data = /data:(?<mime>[\w\/\-\.]+);(?<encoding>\w+),(?<data>.*)/gm.exec(uri)?.groups,
            attachment = Buffer.from(data?.data ?? uri, data?.encoding ?? "base64");

        if(data?.mime && !name.match(`.${data.mime.split("/")[1]}$`)){
            console.warn(`Image name: "${name}" does not match data mime type: "${data.mime}"`)
        }
		return attachment
	}
}

module.exports = DataImageAttachment