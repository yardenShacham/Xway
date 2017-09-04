# Xway
##### library for building xpath exspression.

## Dependencies -  None

## Support
Xway Support UMD(Universal Module Definition), CommonJS, es moudles and regular script tag.

## Installation
#### Using npm:
```
$ npm install --save xway
```

## Usage
Import the file to your app (you can choose the way you want to import the file)
```
import { xpathCreator } from 'xway' 
var xpathCreator = require('webStory').xpathCreator
<script src="xway"></script>
```
3. build your simple builder
```
var builder = new xpathCreator(defaultValue?).builder();
```
4. build builder with some custom element
```
var builder = new xpathCreator(defaultValue?).withCustomElements(["customElementName"]).builder();
```
5. then use the builder to build your xpath
```
var builder = new xpathCreator(defaultValue?).builder();
var xpath = builder.div().div().withStyles({
display:"none"
})
.div()
.withClasses(["class1","class2"])
.input().build();
```

## API Reference
** [Full Documentation](https://github.com/yardenShacham/Xway/wiki) **


License
----
###### MIT
