export default {
    mul() {  
        //解决JS 精度问题 乘法
        let m = 0, 
            s2 = '',
            strArr = 1
            
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i].toString().indexOf('.') > 0) {
                m += arguments[i].toString().split(".")[1].length;
                arguments[i] = Number(arguments[i].toString().replace(".", ""));
            }

            strArr *= Number(arguments[i]);
        }

        return strArr / Math.pow(10, m);
    },
    sub(num1, num2) {  
        //解决JS 精度问题(减法)
        let baseNum, 
            baseNum1, 
            baseNum2,
            precision // 精度

        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } 
        catch (e) {
            baseNum1 = 0;
        }

        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } 
        catch (e) {
            baseNum2 = 0;
        }

        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;

        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    },
    numDiv(num1, num2) {
        //除法
        var baseNum1 = 0, baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
          baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
          baseNum1 = 0;
        }
        try {
          baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
          baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    },
    numAdd(num1, num2) {
        // 加法
        var baseNum, 
            baseNum1, 
            baseNum2;

        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } 
        catch (e) {
            baseNum1 = 0;
        }

        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } 
        catch (e) {
            baseNum2 = 0;
        }

        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

        return (num1 * baseNum + num2 * baseNum) / baseNum;
    },
    // createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
    createRandom(num, from, to) {
        var arr = [];
        var json = {};
        while (arr.length < num) {
            //产生单个随机数
            var ranNum = Math.floor(Math.random() * (to - from)) + from;
            //通过判断json对象的索引值是否存在 来标记 是否重复
            if (!json[ranNum]) {
            json[ranNum] = 1;
            arr.push(ranNum);
            }
        }
        return arr;
    },
}