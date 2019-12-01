# CrawlSpace
Crawlspace is a web crawler and search engine in one.

## Examples
```js
const CrawlSpace = require('crawlspace')

const crawler = new CrawlSpace.Crawler('mongodb://localhost:27017/crawlspace', {
  prefix: 'https://yourwebsite.com',
  base: 'https://yourwebsite.com',
  logLevel: 2
})

crawler.start();

const searcher = new CrawlSpace.Searcher('mongodb://localhost:27017/crawlspace');

searcher.search('dog')
  .then((res) => {
    console.log(res);
  })
```
