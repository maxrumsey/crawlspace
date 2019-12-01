const CrawlSpace = require('../index.js')

const crawler = new CrawlSpace.Crawler('mongodb://localhost:27017/crawlspacetest', {
  prefix: 'https://wavets.com.au',
  base: 'https://wavets.com.au',
  logLevel: 2
})

crawler.start();

const searcher = new CrawlSpace.Searcher('mongodb://localhost:27017/crawlspacetest');

searcher.search('dog')
  .then((res) => {
    console.log(res);
  })
