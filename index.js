function ValidateItem(value, fieldName = "", status = true, detail = "") {
    this.data = value;
    this.status = status;
    this.fieldName = fieldName;
    this.detail = detail;
}

function toSafeRegExpStr(str) {
    return str.replace(/[./()\[\]]/g, '\\$&');
}

ValidateItem.extend = function (validatorObj) {
    try {
        Object.assign(ValidateItem.prototype, validatorObj);
        return true;
    } catch (e) {
        return false;
    }
}

ValidateItem.prototype.notEmpty = function () {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (Array.isArray(b.data) && b.data.length == 0) {
        b.status = false;
        b.detail = `${b.fieldName}不能为空`;
    } else if (!(b.data + "").trim()) {
        b.status = false;
        b.detail = `${b.fieldName}不能为空`;
    }
    return b;
}


ValidateItem.prototype.max = function (max) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (Array.isArray(b.data) && b.data.length > max) {
        b.status = false;
        b.detail = `${b.fieldName}长度不能超过${max}`;
    } else if (b.data.length > max) {
        b.status = false;
        b.detail = `${b.fieldName}长度不能超过${max}`;
    }
    return b;
}

ValidateItem.prototype.min = function (min) {

    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (Array.isArray(b.data) && b.data.length < min) {
        b.status = false;
        b.detail = `${b.fieldName}长度不能少于${min}`;
    } else if (b.data.length < min) {
        b.status = false;
        b.detail = `${b.fieldName}长度不能少于${min}`;
    }
    return b;
}
ValidateItem.prototype.isNumber = function () {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (/\D/.test(b.data)) {
        b.status = false;
        b.detail = `${b.fieldName}不能输入非数字`;
    }
    return b;
}
ValidateItem.prototype.isUrl = function (domain) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    let urlReg = new RegExp(`^http(s)?:\/\/${domain?toSafeRegExpStr(domain):'[^$/#? ]*'}($|\/|[#]|[?])`, "im");
    if (!urlReg.test(b.data)) {
        b.status = false;
        b.detail = `${b.fieldName}请输入${domain?`${domain}域名下的`:''}正确url`;
    }
    return b;
}
ValidateItem.prototype.endWith = function (word) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    let reg = new RegExp(`${toSafeRegExpStr(word)}$`, "im");
    if (!reg.test(b.data)) {
        b.status = false;
        b.detail = `${b.fieldName}需要以${word}结尾`;
    }
    return b;
}
ValidateItem.prototype.isImg = function (word) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    let c= b.or(
        b.endWith(".jpg"),
        b.endWith(".png"),
        b.endWith(".jpeg"),
        b.endWith(".gif")
    );
    if(c.status==false){
        c.detail="必须是jpg/png/jpeg/gif结尾的图片"
    }
    return c;
}
ValidateItem.prototype.or = function (...conditions) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (conditions.map(v => v.status).every(v => {
            return v == false ? true : false
        })) {
        b.status = false;
        b.detail = `${b.fieldName}必须${conditions.map(v=>v.detail).join("或")}`;
    }
    return b;
}

ValidateItem.prototype.sameAs = function (compare, name) {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    if (this.data != compare) {
        b.status = false;
        b.detail = `${b.fieldName}必须与${name}一致`;
    }
    return b;
}

ValidateItem.prototype.async = function () {
    var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
    if (!this.status) {
        return b;
    }
    let g = new Promise((resolve, reject) => {

        setTimeout(() => {

        }, 1000);

    });

    return g;
}


exports.ValidateItem = ValidateItem;