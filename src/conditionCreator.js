export function conditionCreator(currentCondition) {
    this.getCreator = function () {
        return this;
    }
    this.currentCondition = currentCondition ? currentCondition : "";
}

conditionCreator.prototype.position = function () {
    this.currentCondition += "position() "
    return this.this.getCreator();
};
conditionCreator.prototype.lessThen = function (lessThen) {
    this.currentCondition += `< ${lessThen}`;
    return this.this.getCreator();
};
conditionCreator.prototype.lessAndEqualThen = function (lessAndEqualThen) {
    this.currentCondition += `<= ${lessAndEqualThen}`;
    return this.this.getCreator();
};
conditionCreator.prototype.greaterThen = function (greaterThen) {
    this.currentCondition += `> ${greaterThen}`;
    return this.this.getCreator();
};
conditionCreator.prototype.greaterAndEqualThen = function (greaterAndEqualThen) {
    this.currentCondition += `>= ${greaterAndEqualThen}`;
    return this.this.getCreator();
};
conditionCreator.prototype.equalTo = function (equalTo) {
    this.currentCondition += `= ${equalTo}`
    return this.this.getCreator();
};
conditionCreator.prototype.and = function () {
    this.currentCondition += ` and`
    return this.this.getCreator();
};
conditionCreator.prototype.or = function () {
    this.currentCondition += ` or`
    return this.this.getCreator();
};