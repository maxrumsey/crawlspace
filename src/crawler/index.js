const scraper = require('./scraper.js')

class Crawler {
  constructor(db, opts) {
    this.dbOpts = db;
    this.opts = {
      prefix: opts.prefix,
      level: opts.logLevel || 0,
      base: opts.base
    }
  }
  async start() {
    this.db = await require('../db.js')(this.dbOpts);

    const loop = async (override) => {
    	let scheduled = [];
    	let prelist;

    	// ToDo list override
    	if (!override) prelist = await this.db.getAllScheduleds();
    	else prelist = override;

    	/*
    	 * Checking for overwrites
    	 */
    	for (var i = prelist.length - 1; i >= 0; i--) {
    		if (await this.db.getPageByURL(prelist[i].url)) {
    			await this.db.deleteScheduled(prelist[i]._id);
    		} else {
    			scheduled.push(prelist[i])
    		}
    	}
    	if (scheduled.length === 0) {
    		console.log('List of websites to index is empty.')
    		process.exit(0);
    	}

    	// Scraping websites. Returns indexed pages and new todo.
    	const { indexeds, scheduleds } = await scraper(scheduled, this.opts);

    	// Deleting indexed pages from the this.db todo list.
    	for (var i = scheduled.length - 1; i >= 0; i--) {
    		await this.db.deleteScheduled(scheduled[i]._id);
    	}

    	// Adding indexed pages to the this.db
    	for (var i = indexeds.length - 1; i >= 0; i--) {
    		await this.db.createPage(indexeds[i]);
    	}

    	// Adding links to the this.db todo list.
    	for (var i = scheduleds.length - 1; i >= 0; i--) {
    		if (await this.db.getScheduledByURL(scheduleds[i].url)) continue;
    		await this.db.createScheduled(scheduleds[i]);
    	}

    	// Repeats
    	loop()
    }

    if (this.opts.level >= 1) console.log(`${buildTimeStamp()} Beginning search.`)

    // Starting loop with override URL (config.base)
    loop([{ url: this.opts.base }]);
  }
}

module.exports = Crawler

function buildTimeStamp() {
	const date = (new Date()) + ''

	return date.split(' ')[4]
}
