const loginfo = async (ctx:any, next:Function) => {
    // Log the request to the console
    console.log('Url:', ctx.method+ctx.url);
    // Pass the request to the next middleware function
    await next();
}

export default loginfo