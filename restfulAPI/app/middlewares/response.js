module.exports = (res, status, result, errors) => {
    res.json({
        status: status,
        result: result,
        errors: errors
    })
}