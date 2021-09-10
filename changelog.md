## 1.2.0
* The signature of the uri is now checked, just in case the MIME type does not match the filetype's signature. This does not check if the uri is valid, however.
    * Checks the signature of:
        * JPEG
        * PNG
        * GIF
        * WebP
    * Note: This will only work if the encoding is base64, which in practice should always be the case anyway for data images
* Will no longer give a warning when displaying JPEGs with the file extention `.jpe`
* Fixed a bug where some MIME types would only invoke a check for the last few charatcers of the file name, not the file extention itself
    * For example, an image with the MIME type `image/gif` could have the file extention `.asdfgif` because it matched the RegExp `/.gif$/`

## 1.1.2
* Changed package.json to allow enable compatibility with d.js v13+ (>=12.5.1). Now it should no longer have a node_modules folder when it's used as a dependancy.

## 1.1.1
* The `.setFile(...)` function now accepts both URI strings and ordinary Buffers as input

## 1.1.0
* Added this here changelog
* Improved the data URI RegEx to hopefully recognize all URIs, even non base64 ones
* Now calling static function with `this.constructor` instead of the name of the class (`DataImageAttachment`). This should affect much, unless this class is extended.