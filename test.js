var {
    ValidateItem
} = require("./index.js");

var assert = require('assert');

describe('SigleRule', function () {

    describe('no new an new obj', function () {
        let a = new ValidateItem("", "name");
        let b = a.notEmpty();
        let c = b.max(20);
        assert.equal(false, a.status == b.status && c.status == b.status);
    })
    describe('notEmpty', function () {

        let b = "";
        it(`it should return false for "${b}" is empty value`, function () {
            let a = new ValidateItem(b, "name");
            assert.equal(false, a.notEmpty().status);
        });

        let c = [];
        it(`it should return false for [${c}]'s length is 0`, function () {
            let a = new ValidateItem(c, "array");
            assert.equal(false, a.notEmpty().status);
        });
    });

    describe('max', function () {
        let strl10 = '12345678901';
        it(`it should return false for "${strl10}" is longer than 10 letter`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.max(10).status);
        });

        let arrl10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1];
        it(`it should return false for [${arrl10}]'s length lager than 10`, function () {
            let a = new ValidateItem(arrl10, "array");
            assert.equal(false, a.max(10).status);
        });
    });

    describe('min', function () {
        let strl10 = '123456789';
        it(`it should return false for "${strl10}" is shorter than 10 letter`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.min(10).status);
        });

        let arrl10 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        it(`it should return false for [${arrl10}]'s length smaller than 10`, function () {
            let a = new ValidateItem(arrl10, "array");
            assert.equal(false, a.min(10).status);
        });
    });
    describe('isNumber', function () {
        let strl10 = '090909f';
        it(`it should return false for "${strl10}" has no number letter`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.isNumber().status);
        });
    });
    describe('isUrl', function () {
        let strl10 = ' http://xx';
        it(`it should return false for "${strl10}" is not start with http(s)://`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.isUrl().status);
        });
        let strl12 = 'http://a.b.c';
        it(`it should return false for "${strl12}" is not a with domain a.b`, function () {
            let a = new ValidateItem(strl12, "name");
            assert.equal(false, a.isUrl('a.b').status);
        });
    });
    describe('endWith', function () {
        let strl10 = 'fdshttp://baidu.com/noturl2';
        it(`it should return false for "${strl10}" has no endWith url `, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.endWith("url").status);
        });
    });


    describe('isImg', function () {
        let strl10 = 'jfdklsj.jpgs';
        it(`it should return false for "${strl10}" has is not endwith one of png jpg gif jpeg`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.isImg().status);
        });
    });


    describe('customValidatorConfig', function () {

        let strl10 = 'http://jfdklsj.giff';
        ValidateItem.extend({
            isImgUrl: function () {
                var b = new ValidateItem(this.data, this.fieldName, this.status, this.detail);
                return b.isUrl().isImg();
            }
        })
        let a = new ValidateItem(strl10, "name");
        it(`it should return false for "${strl10}" has is not img and url`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(false, a.isImgUrl().status);
        });
    });
    describe('mixin features', function () {
        describe('or', function () {
            let strl10 = 'fhttp://baidu.com/noturl3';
            it(`it should return false for "${strl10}" has is neither url nor endwith url2`, function () {
                let a = new ValidateItem(strl10, "name");
                assert.equal(false, a.or(a.isUrl(), a.endWith("url2")).status);
            });
        });
    });
    describe('return original fail', function () {
        let strl10 = '';
        it(`it should return true for it fail for empty`, function () {
            let a = new ValidateItem(strl10, "name");
            assert.equal(true, a.notEmpty().isUrl().detail == "name不能为空");
        });
    });
    describe('async test', function () {
        it(`it should return false 'cause....`, function () {
            let w = ValidateItem;
            let b = new w("9374327897894", "idCard");
            let g=b.notEmpty().isNumber().sameAs("9374327897894","密码").or(
                b.isUrl(),
                b.or(
                    b.max(8),
                    b.isImg()
                )
            )
            // console.log(g.detail);
            assert.equal(false,g.status);
            // throw new Error();
            // b.notEmpty().isNumber().sameAs("9374327897894").or(
            //     b.max(18),
            //     b.min(10)
            // ).isIdCardAsync().then(v => {
            //     console.log("done")
            // }).catch(v => {
            //     console.log("fail:" + v);
            // });
        })
    })

});