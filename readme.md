# validator

## description

another validator using pipe api

## usage

use case in test.js

## todo

async support
语法分析还是先运算
```javascript

    let w=ValidateItem;
    let b=new w("440104192381928374","idCard");
    b.notEmpty().isNumber().sameAs("9374327897894").or(
        b.max(18),
        b.or(
            b.max(100),
            b.min(35)
        )
    )
    //.isIdCardAsync()


/*
    .then(v=>{
        console.log("done")
    }).catch(v=>{
        console.log("fail:"+v);
    });
*/
```
