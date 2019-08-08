var mklm0222={
  compact:function(ary){
    return ary.filter(it=>it)
  },
  negate:function(f){
      return function(...args){
         return !f(...args)
      }
  },
  flip:function(f){
    return function(...args){
      let arr=[]
      for(let i=arguments.length-1;i>=0;i--){
          arr.push(args[i])
      }
      return f(...arr)
    }
  },
  before:function(n,f){
    let count=0;
    let result
    return function(...args){
       count++;
       if(count<n){
         if(count==n-1){
           result=f(...args)
         }
       return f(...args)
        }else{
          return result
        }
    }
  },
  after:function(n,f){
    var times=0;
    return function(...args){
      times++;
      if(times>=n){
        return f(...args)
      }else{
        return
      }
    }
  },
  /**
   * 创建一个调用func的函数。调用func时最多接受 n个参数，忽略多出的参数。
   * @param {function} f func (Function): 需要被限制参数个数的函数。
   * @param {number} n 限制的参数数量。
   *  返回新的覆盖函数。
   */
  ary:function(f,n){
    return function(...args){
      return f(...args.slice(0,n))
    }
  },
  unary:function(f){
    return function(...args){
      return f(...args.slice(0,1))
    }
  },
  /**
   * 创建一个函数，调用func时，this绑定到创建的新函数，把参数作为数组传入，类似于 Function#apply. 
   * @param {function} f func (Function): 要应用传播参数的函数
   * (Function): 返回新的函数。
   */
  spread:function(f){
     return function(ary){
       return f.apply(null,ary)
     }
  },
  /**
   * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   * param array (Array): 需要处理的数组
   * param [size=1] (number): 每个数组区块的长度
   */
  chunk:function(arr,size,result=[]){
    if(arr.length==0){
      return result
    }
    if(arr.length<size){
      result.push(arr.slice())
      return result
    }
    result.push(arr.slice(0,size))
    this.chunk(arr.slice(size),size,result)
    return result
  },
  /**
   * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
   * array (Array): 要检查的数组。
   * [values] (...Array): 排除的值。
   * (Array): 返回一个过滤值后的新数组。
   */
  difference:function(ary,...values){
    ary.filter(item=>{values.every(val=>!val.includes(item))})
},
  differenceBy:function(){
    
  },
  /**
   * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
   * array (Array): 要查询的数组。
   * [n=1] (number): 要去除的元素个数。
   * (Array): 返回array剩余切片。
   */
  drop:function(arr,n){
     if(n==undefined){
       return arr.slice(1)
     }else if(n>arr.length){
        return []
     }else{
       return arr.slice(n)
     }
  },
  dropRight:function(arr,n){
      arr=arr.reverse()
      if(n==undefined){
        return arr.slice(1).reverse()
      }else if(n>arr.length){
         return []
      }else{
        return arr.slice(n).reverse()
      }
  },
  dropRightWhile:function(){
    
  },
  dropWhile:function(){

  },
  fill:function(){

  },
  findIndex:function(){

  },
  findLastIndex:function(){

  }

};