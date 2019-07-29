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
  }
};