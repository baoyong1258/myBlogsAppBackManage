const dev = process.env.NODE_ENV !== 'production';
let apiPrefix;

if(dev){
    apiPrefix = 'http://localhost:8090';
}else {
    apiPrefix = 'http://111.231.59.59:8090';
}
export default {
    apiPrefix: apiPrefix
}