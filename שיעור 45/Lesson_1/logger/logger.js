function logger(text) {
    console.log(`[${new Date().toISOString()}] => ${text}`);
}

module.exports = logger;
