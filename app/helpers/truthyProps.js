export default function* getTruthyProps(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for(let i = 0; i < propKeys.length; i++){
        if(obj[propKeys[i]]) {
            yield [propKeys[i], obj[propKeys[i]]];
        }
    }
}
