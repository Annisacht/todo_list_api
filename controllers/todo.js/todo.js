function Index(req, res, next){
    res.send('show all data')
}

function Create(req, res, next) {
    res.send('your post has been create')
}

function Show(req, res, next) {
    res.send('this is your post')
}

function Edit(req, res, next) {
    res.send('edit your post here')
}

function Delete(req, res, next) {
    res.send('your post has been deleted')
}

module.exports = {
    Index,
    Create,
    Show,
    Edit,
    Delete
}