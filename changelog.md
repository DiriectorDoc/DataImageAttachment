## 2.0.0
* djs14 has renamed MessageAttachment to AttachmentBuilder. Consequentally, this package now requires v14 of discord.js. Additionally, the syntax has been changed to mach that of AttachmentBuilder.

## 1.1.2
* Changed package.json to allow enable compatibility with d.js v13+ (>=12.5.1). Now it should no longer have a node_modules folder when it's used as a dependancy.

## 1.1.1
* The `.setFile(...)` function now accepts both URI strings and ordinary Buffers as input

## 1.1.0
* Added this here changelog
* Improved the data URI RegEx to hopefully recognize all URIs, even non base64 ones
* Now calling static function with `this.constructor` instead of the name of the class (`DataImageAttachment`). This should affect much, unless this class is extended.