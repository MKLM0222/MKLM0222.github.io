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
    return ary.filter(item=>values.every(val=>!val.includes(item)))
  },
  differenceBy:function differenceBy(ary,...values){
         var last=values[values.length-1]
         var res=[]
         if(!mklm0222.isArray(last)){
           var predicate=mklm0222.iteratee(last)
           values.pop()
         }
         if(predicate){
             values=mklm0222.flattenDeep(values)
             for(var i=0;i<ary.length;i++){
               var isFound=false
               for(var j=0;j<values.length;j++){
                 if(mklm0222.isEqual(predicate(ary[i]),predicate(values[j]))){
                    isFound=true
                    break;
                 }
               }
               if(!isFound){
                 res.push(ary[i])
               }
             }
         }else{
           return mklm0222.difference(ary,...values)
         }
        return res
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
  isMatch:function isMatch(obj,src){
     if(obj===src){
       return true
     }
      for(var key in src){
        if(typeof src[key]=="object"&&src[key]!=null){
          if(!isMatch(obj[key],src[key])){
            return false
          }
        }else{
          if(obj[key]!=src[key]){
            return false
          }
        } 
      }
      return true
  },
  matches:function(src){
      return function(obj){
        return mklm0222.isMatch(obj,src)
      }
  },
  matchesProperty:function(path,value){
    return function(obj){
       return mklm0222.isEqual(mklm0222.get(obj,path),value)
    }
  },
  property:function(path){
    return function(obj){
      return mklm0222.get(obj,path)
    }
  },
  toPath:function(str){
     return str.split(/\.|\[|\]./)
  },
  get:function(obj,path,defaultValue){
     if(typeof path=="string"){
        path=mklm0222.toPath(path)
     }
     for(var i=0;i<path.length;i++){
        if(obj==undefined){
          return defaultValue
        }
         obj=obj[path[i]]
     }
     return obj
  },
  iteratee:function(value){
     if(typeof value=="string"){
       return mklm0222.property(value)
     }
     if(Array.isArray(value)){
      return mklm0222.matchesProperty(...value)
    }
     if(typeof value=="object"){
       return mklm0222.matches(value)
     }
     return value
  },
  dropRightWhile:function dropRightWhile(ary,predicate){
     predicate=mklm0222.iteratee(predicate)
     let res = ary.slice();
     for (let i = ary.length - 1; i >= 0; i--) {
        if (!predicate(ary[i], i, ary)) {
            break;
        }
        res.pop();
    }
    return res;
  },
  dropWhile:function dropWhile(ary,predicate){
     predicate=mklm0222.iteratee(predicate)
     let res=ary.slice()
     for(let i=0;i<ary.length;i++){
        if(!predicate(ary[i])){
          break;
        }
        res.shift()
     }
    return res
  },
  fill:function fill(array,value,start=0,end){
      end=end?end:array.length
      for(var i=start;i<end;i++){
         array[i]=value
      }
      return array
  },
  findIndex:function findIndex(ary,predicate,fromIndex=0){
        if(predicate){
           predicate=mklm0222.iteratee(predicate)
        }
        for(var i=fromIndex;i<ary.length;i++){
          if(predicate(ary[i])){
            return i
          }
        }
     return -1
  },
  findLastIndex:function findLastIndex(ary,predicate,fromIndex){
      if(fromIndex==undefined){
        fromIndex=ary.length-1
      }
      predicate=mklm0222.iteratee(predicate)
      for(var i=fromIndex;i>=0;i--){
        if(predicate(ary[i])){
          return i
        }
      }
      return -1
  },
  isEqual:function isEqual(value,other){
      if(typeof value!="object"&&typeof other!="object"){
        return value===other?true:false
      }else if(typeof value=="object"&&value!="null"){
            if(typeof other!="object"){
              return false
            }
            var valKey=Object.keys(value)
            var othKey=Object.keys(other)
            if(valKey.length!=othKey.length){
              return false
            }
            for(var key in value){
              if(!isEqual(value[key],other[key])){
                return false
              }
            }
            return true
      }
  },
  flatten:function flatten(args){
    var res=[]
    for(var item of args){
        if(Array.isArray(item)){
            res.push(...item)
        }else{
            res.push(item)
        }
    }
    return res
  },
  flattenDeep:function flattenDeep(args,res=[]){
    for(var item of args){
        if(Array.isArray(item)){
            flattenDeep(item,res)
        }else{
            res.push(item)
        }
    }
    return res
 },
 flattenDepth:function flattenDepth(ary,depth=1,currDepth=0,res=[]){
  for(var item of ary){
      if(Array.isArray(item)){
          if(currDepth==depth){
              res.push(item)
          }else{
            flattenDepth(item,depth,currDepth+1,res)
          }
      }else{
        res.push(item)
      }
  }
  return res
},
 fromPairs:function fromPairs(values){
  var res={}
      for(item of values){
          res[item[0]]=item[1]
      }
  return res
  },
  head:function head(ary){
    return ary?ary[0]:undefined
  },
  indexOf:function indexOf(ary,value,fromIndex=0){
      for(var i=fromIndex;i<ary.length;i++){
        if(mklm0222.sameValueZero(ary[i],value)){
          return i
        }
      }
     return -1
    },
  initial:function initial(ary){
  return ary.slice(0,ary.length-1)
   },
  isArray:function isArray(ary){
    if(Object.prototype.toString.call(ary)=="[object Array]"){
      return true
    }else{
      return false
    }
  },
  isBoolean:function isBoolean(bool){
    Object.prototype.toString.call(ary)=="[object Boolean]"?true:false
  },
  join:function join(array,seperator){
    var result=""
    for(var i=0;i<array.length;i++){
      if(i!=array.length-1){
       result+=String(array[i])+seperator
      }else{
        result+=array[i]
      }
    }
    return result
  },
  intersection:function intersection(...arrs){
     let obj={}
     let res=[]
     for(let item of arrs){
       var curr=mklm0222.flattenDeep(item)
       for(let it of curr){
         if(obj[it]){
            obj[it]+=1
         }else{
           obj[it]=1
         }
       }
     }
     for(let key in obj){
        if(obj[key]==arrs.length){
          res.push(Number(key))
        }
     }
     return res 
  },
  last:function last(ary){
      return ary[ary.length-1]
  },
  lastIndexOf:function lastIndexOf(ary,val,start){
        if(start==undefined)start=ary.length-1
        for(var i=start;i>=0;i--){
          if(mklm0222.sameValueZero(ary[i],val)){
            return i
          }
        }
        return -1
  },
  reverse:function reverse(ary){
    var res=[]
    for(var i=ary.length-1;i>=0;i--){
      res.push(ary[i])
    }
    return res
  },
  sortedIndex:function sortedIndex(ary,value){
      ary=ary.sort((a,b)=>a-b)
      if(ary[0]>=value)return 0
      if(ary[ary.length-1]<value)return ary.length-1
      for(var i=0;i<ary.length;i++){
        if(ary[i]<=value&&ary[i+1]>=value){
          return i+1
        }
      }
  },
  sameValueZero:function sameValueZero(x,y){
    if(x===0&&y===-0){
      return true
    }else if(x===-0&&y===0){
      return true
    }else{
      return Object.is(x,y)
    }
  },
  union:function union(...arys){
       var res=[]
       for(var i=0;i<arys.length;i++){
         for(var j=0;j<arys[i].length;j++)
         if(!res.includes(arys[i][j])){
           res.push(arys[i][j])
         }
       }
       return res
  },
  unionBy:function unionBy(...args){
      var last=args[args.length-1]
      var res=[]
      if(!mklm0222.isArray(last)){
           var predicate=mklm0222.iteratee(last)
           args.pop()
        }
      var arr=mklm0222.flattenDeep(args)
      for(var i=0;i<arr.length;i++){
        var isFound=false
        for(var j=0;j<res.length;j++){
          if(mklm0222.isEqual(predicate(arr[i]),predicate(res[j]))){
            isFound=true
            break;
          }
        }
        if(!isFound){
          res.push(arr[i])
        }
      }
      return res
  },
  pull:function pull(ary,...args){
      for(var i=0;i<args.length;i++){
         for(var j=0;j<ary.length;j++){
           if(mklm0222.sameValueZero(ary[j],args[i])){
             ary.splice(j,1)
             j--;
           }
         }
      }
      return ary
  },
  uniq:function uniq(ary){
     let res=[]
     for(let i=0;i<ary.length;i++){
       if(!res.includes(ary[i])){
          res.push(ary[i])
       }
     }
     return res
  },
  uniqBy:function uniqBy(ary,iteratee){
      if(iteratee){
        var predicate=mklm0222.iteratee(iteratee)
      }
      let res=[]
      for(let i=0;i<ary.length;i++){
        var isFound=false;
        for(let j=0;j<res.length;j++){
          if(mklm0222.isEqual(predicate(ary[i]),predicate(res[j]))){
             isFound=true
             break;
          }
        }
        if(!isFound){
           res.push(ary[i])
        }
      }
      return res
  },
  without:function without(ary,...values){
       var res=[]
       for(var i=0;i<ary.length;i++){
           if(!values.includes(ary[i])){
             res.push(ary[i])
           }
       }
       return res
  },
  unzip:function unzip(ary){
       return ary[0].map((_,index)=>{
            return ary.map((curr)=>{
                 return curr[index]
            })
       })
  },
  xor:function xor(...ary){
      let arr=mklm0222.flattenDeep(ary)
      let map={}
      let res=[]
      for(var i=0;i<arr.length;i++){
        if(!map[arr[i]]){
          map[arr[i]]=1
        }else{
          map[arr[i]]+=1
        }
      }
      for(let key in map){
          if(map[key]==1){
            res.push(Number(key))
          }
      }
      return res
  },
  zip:function zip(...arys){
    return arys[0].map((_,index)=>{
       return arys.map((value)=>{
         return value[index]
       })
    })
  },
  countBy:function countBy(ary,predicate){
    predicate = mklm0222.iteratee(predicate)
    var map = {}
    ary.forEach(item => {
        let key = predicate(item)
        if (!map[key]) {
            map[key] = 1
        }else{
            map[key] +=1
        }
     })
      return map
   },
   every:function every(ary,predicate){
     predicate=mklm0222.iteratee(predicate)
     for(var i=0;i<ary.length;i++){
       if(!predicate(ary[i],i,index)){
           return false
       }
     }
     return true
   },
   filter:function filter(ary,predicate){
     predicate=mklm0222.iteratee(predicate)
     let res=[]
     for(var i=0;i<ary.length;i++){
       if(predicate(ary[i])){
            res.push(ary[i])
       }
     }
     return res
   },
   find:function find(ary,predicate,fromIndex=0){
     predicate=mklm0222.iteratee(predicate)
     for(var i=fromIndex;i<ary.length;i++){
       if(predicate(ary[i])){
            return ary[i]
       }
     }
   },
   flatMap:function flatMap(ary,predicate){
     predicate=mklm0222.iteratee(predicate)
     let res=[]
     for(var i=0;i<ary.length;i++){
        res.push(predicate(ary[i]))
     }
     return mklm0222.flatten(res)
    },
  flatMapDeep:function flatMapDeep(ary,predicate){
    predicate=mklm0222.iteratee(predicate)
    let res=[]
    for(let i=0;i<ary.length;i++){
      res.push(predicate(ary[i]))
    }
    return mklm0222.flattenDeep(res)
  },
  flatMapDepth:function flatMapDepth(ary,predicate,depth){
    predicate=mklm0222.iteratee(predicate)
    let res=[]
    for(let i=0;i<ary.length;i++){
      res.push(predicate(ary[i]))
    }
    return mklm0222.flattenDepth(res,depth)
  },
  forEach:function forEach(collection,predicate){
    predicate=mklm0222.iteratee(predicate)
    if(mklm0222.isArray(collection)){
      for(let i=0;i<collection.length;i++){
        if(predicate(collection[i])===false){
          break;
        }
      }
    }else{
      for(let key in collection){
        if(predicate(collection[key])==false){
          break;
        }
      }
    }
    return collection
  },
  groupBy:function groupBy(collection,predicate){
    predicate=mklm0222.iteratee(predicate)
    let map={}
    for(var i=0;i<collection.length;i++){
        if(map[predicate(collection[i])]){
           map[predicate(collection[i])].push(collection[i])
        }else{
          map[predicate(collection[i])]=[collection[i]]
        }
    }
    return map
  },
  keyBy:function keyBy(collection,predicate){
    predicate=mklm0222.iteratee(predicate)
    let map={}
    for(var i=0;i<collection.length;i++){
         map[predicate(collection[i])]=collection[i]
    }
    return map
  },
  map:function map(collection,predicate){
    var res=[]
    predicate=mklm0222.iteratee(predicate)
      if(Array.isArray(collection)){
        for(var i=0;i<collection.length;i++){
             res.push(predicate(collection[i]))
        }
      }else{
        for(var key in collection){
           res.push(predicate(collection[key]))
        }
      }
      return res
  },
  partition:function partition(collection,predicate){
    var res=[[],[]]
    predicate=mklm0222.iteratee(predicate)
    for(var i=0;i<collection.length;i++){
       if(predicate(collection[i])){
         res[0].push(collection[i])
       }else{
         res[1].push(collection[i])
       }
    }
    return res
  }
};