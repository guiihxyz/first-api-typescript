export function defineRoute(handler) {
    return function (app, _, done) {
        handler(app);
        done();
    };
}
