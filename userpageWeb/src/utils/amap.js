let map=new AMap.Map('container');
export const getAutoPlugin=(mapname,options)=>{
    return new Promise((reslove,reject)=>{
        AMap.plugin(mapname,()=>{
            const Autocomplete=new AMap[mapname.split(".")[1]]({
              ...options
            })
            reslove(Autocomplete)
          })
    })
}

