import htmlTags from './htmlTags'
import {conditionCreator} from './conditionCreator'

export function xpathCreator(defaultXpath) {
    this.currentXpath = defaultXpath ? defaultXpath : "//";
    this.isOnlyStart = true;
    this.getCreator = function () {
        return this;
    };

    this.builder = function (customElementNames) {
        let tags = htmlTags.concat(customElementNames ? customElementNames : []);
        for (let i = 0; i < tags.length; i++) {
            this[tags[i]] = function () {
                this.isOnlyStart = false;
                if (this.currentXpath[this.currentXpath.length - 1] === '/' && this.currentXpath[this.currentXpath.length - 2] === '/') {
                    this.currentXpath += `${tags[i]}`;
                }
                else
                    this.currentXpath += `/${tags[i]}`;

                return this;
            }
        }
        return this;
    };

    this.startFrom = function (xpath) {
        this.currentXpath = xpath;
        return this;
    };

    this.clear = function () {
        this.currentXpath = defaultXpath ? defaultXpath : "//";
        this.isOnlyStart = true;
        return this;
    };

    this.withCustomElements = function (customElementNames) {
        this.builder = this.builder.bind(this, customElementNames);
        return this;
    };

    this.all = function () {
        this.currentXpath += this.currentXpath[this.currentXpath.length - 1] === '/' ? "*" : "/*";
        return this;
    };
    this.have = function () {
        this.currentXpath += "//";
        return this;
    }

    this.hisParent = function () {
        this.currentXpath += `/..`;
        return this;
    };
    this.childOf = function (elementName) {
        this.currentXpath += `/${elementName}`;
        return this;
    }

    this.build = function () {
        return this.currentXpath;
    };

};

xpathCreator.prototype.withStyles = function (styleObj) {
    let xpathForStyles = `[`;
    let keys = Object.keys(styleObj);
    for (let i = 0; i < keys.length; i++) {
        xpathForStyles += `contains(@style,"${keys[i]}: ${styleObj[keys[i]]}")`;
        if (i + 1 < keys.length)
            xpathForStyles += ' and ';
    }
    this.currentXpath += (xpathForStyles + ']');
    return this.getCreator();
};

xpathCreator.prototype.withText = function (text) {
    this.currentXpath += `[text() = "${text}"]`
    return this.getCreator();
};

xpathCreator.prototype.containText = function (text) {
    this.currentXpath += `[contains(text(),"${text}")]`
    return this.getCreator();
};

xpathCreator.prototype.childNumber = function (childNumber) {
    this.currentXpath += `[${childNumber}]`;
    return this.getCreator();
};

xpathCreator.prototype.lastChild = function () {
    this.currentXpath += `[last()]`;
    return this.getCreator();
};

xpathCreator.prototype.lastChildMinus = function (num) {
    this.currentXpath += `[last() - ${num}]`;
    return this.getCreator();
};

xpathCreator.prototype.lastChildPlus = function (num) {
    this.currentXpath += `[last() + ${num}]`;
    return this.getCreator();
};

xpathCreator.prototype.firstChild = function () {
    this.currentXpath += `[first()]`;
    return this.getCreator();
};

xpathCreator.prototype.firstChildMinus = function (num) {
    this.currentXpath += `[first() - ${num}]`;
    return this.getCreator();
};

xpathCreator.prototype.firstChildPlus = function (num) {
    this.currentXpath += `[first() + ${num}]`;
    return this.getCreator();
};

xpathCreator.prototype.if = function (predicate) {
    if (predicate && typeof predicate === "string") {
        this.currentXpath += `[${predicate}]`;
    }
    else if (typeof predicate === "function")
        predicate(new conditionCreator());
    return this.getCreator();
};

xpathCreator.prototype.withAttribute = function (attrName, attrValue) {
    this.currentXpath += `[@${attrName}="${attrValue}"]`;
    return this.getCreator();
};
xpathCreator.prototype.withClasses = function (classList) {
    let xpathForClasses = `[`;
    for (let i = 0; i < classList.length; i++) {
        xpathForClasses += `contains(@class,${classList[i]})`;
        if (i + 1 < classList.length)
            xpathForClasses += ' and ';
    }
    this.currentXpath += (xpathForClasses + ']');
    return this.getCreator();
};