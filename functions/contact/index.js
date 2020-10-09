exports.handler = function (event, context, callback) {
    let values = JSON.parse(event.body);
    console.log(values);

    callback(null, {
        statusCode: 200,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({success: true, values}),
    });
}