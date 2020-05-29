const ArticleRoutes = require("express").Router();
const Article = require('../models/articles')
const Tags = require('../models/tags')
// const cors = require("cors");
const bodyParser = require('body-parser');
// const urlObject = require('../baseURL')

// const baseURL = urlObject.baseURL


ArticleRoutes.use(bodyParser.json());

ArticleRoutes.get('/', function (req, res) {
    console.log(req.body)
    const query = req.query
    Article.find().sort({ date: -1 })
        .then(kbs => {
            if (!query.title) {
                res.json(kbs)
            } else {
                var searchResults = []
                kbs.filter(kb => {
                    if (kb.body) {
                        if (kb.body.toLowerCase().includes(query.title.toLowerCase())) {
                            searchResults.push(kb)
                        }
                    }
                    if (kb.title) {
                        if (kb.title.toLowerCase().includes(query.title.toLowerCase())) {
                            searchResults.push(kb)
                        }
                    }
                    if (kb.author) {
                        if (kb.author.toLowerCase().includes(query.title.toLowerCase())) {
                            searchResults.push(kb)
                        }
                    }
                    if (kb.tags) {

                        if (Array.isArray(kb.tags) && kb.tags !== undefined) {
                            for (let i = 0; i < kb.tags.length; i++) {

                                if (kb.tags[i].toLowerCase().includes(query.title.toLowerCase())) {

                                    searchResults.push(kb)
                                }

                            }
                        }
                    }
                    return searchResults
                })
                res.json(searchResults)

            }

        })

        .catch(err => {
            res.status(400).send(err);
        });
})
ArticleRoutes.get('/mostrecent', function (req, res) {
    Article.find().sort({ date: -1 }).limit(10)
        .then(kbs => {
            res.json(kbs)
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
ArticleRoutes.get('/tags', function (req, res) {
    Tags.find()
        .then(tags => {
            res.json(tags)
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
ArticleRoutes.route('/addtags').post(function (req, res) {
    let tag = new Tags(req.body);
    for (let i; i < Tags.length; i++) {
        if (tag.name === Tags[i].name)
            var already = true
    }
    if (!already) {
        tag.save()
            .then(tag => {
                res.status(200).json({ tag: 'tag added succesfully' });
            })
            .catch(err => {
                res.status(400).send('adding new kb failed');
            });
    } else {
        res.status(300).send('Tag already exsists')
    }
});

ArticleRoutes.route('/:id').get(function (req, res) {
    // res.set("Access-Control-Allow-Origin", 'http://localhost:3000');
    let id = req.params.id;
    Article.findById(id, function (err, kb) {
        res.json(kb);
    });
})

ArticleRoutes.route('/update/:id').post(function (req, res) {
    Article.findById(req.params.id, function (err, kb) {
        const newKB = req.body;
        if (!kb)
            res.status(404).send("data is not found");
        else
            if (newKB.body) {
                kb.body = newKB.body
            }
        if (newKB.author) {
            kb.author = newKB.author
        }
        if (newKB.title) {
            kb.title = newKB.title
        }
        if (newKB.body) {
            kb.body = newKB.body
        }
        if (newKB.tags) {
            kb.tags = newKB.tags
        }
        if (newKB.likes) {
            kb.likes = newKB.likes
        }
        if (newKB.comments) {
            kb.comments.push(newKB.comments)
        }
        kb.save().then(kb => {
            res.json('kb updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
})
ArticleRoutes.route('/add').post(function (req, res) {
    let article = new Article(req.body);
    article.save()
        .then(kb => {
            res.status(200).json({ 'Article': 'Article added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new kb failed');
        });
});

module.exports = ArticleRoutes