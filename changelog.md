## 1.1.1
* The `.setFile(...)` function now accepts both URI strings and ordinary Buffers as input

## 1.1.0
* Added this here changelog
* Improved the data URI RegEx to hopefully recognize all URIs, even non base64 ones
* Now calling static function with `this.constructor` instead of the name of the class (`DataImageAttachment`). This should affect much, unless this class is extended.