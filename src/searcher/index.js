
class Searcher {
  constructor(db) {
    this.dbOpts = db;
  }
  async search(arg) {
    this.db = await require('../db.js')(this.dbOpts);
    const term = arg.toLowerCase();

    const res = await this.db.getPagesByString(term);
    const arr = [];

    for (var i = res.length - 1; i >= 0; i--) {

  		// Counting query hits in page
  		res[i].hits = 0;
  		for (var j = 0; j < res[i].tags.length; j++) {
  			if (res[i].tags[j].includes(term)) res[i].hits += 1;
  		}

  		// Getting relative score
  		// (Hits / Word Count)
  		res[i].score = (res[i].hits / res[i].tags.length)

  		// Pushing data to final array
  		arr.push({
  			url: res[i].url,
  			score: res[i].score,
  			hits: res[i].hits,
  			title: res[i].title
  		})
  	}
    arr.sort(function(a, b){return b.score - a.score});

    return arr;
  }
}

module.exports = Searcher

function buildTimeStamp() {
	const date = (new Date()) + ''

	return date.split(' ')[4]
}
