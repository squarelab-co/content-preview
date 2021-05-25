function getParameters() {
    const parameters = {};
    const vars = window.location.search.substring(1).split('&');
    let pair;
    for (let i = 0; i < vars.length; i++) {
        pair = vars[i].split('=');
        if (typeof parameters[pair[0]] === 'undefined') parameters[pair[0]] = pair[1];
        else if (typeof parameters[pair[0]] === 'string') parameters[pair[0]] = [parameters[pair[0]], pair[1]];
        else parameters[pair[0]].push(pair[1]);
    }
    return parameters;
}