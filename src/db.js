
module.exports = async function(db) {
  const mongoose = require('mongoose');
  await dbConnect(mongoose, db);

  this.page = mongoose.model('Page', {
  	url: String,
  	tags: [String],
  	title: String
  });

  this.scheduled = mongoose.model('Scheduled', {
  	url: String
  })
  /*
   * Indexed Pages
   */
  this.getPagesByString = str => {
  	return new Promise((res, rej) => {
  		this.page.find({tags: str}, (e, docs) => {
  			if (e) rej(e);
  			else res(docs)
  		})
  	})
  }
  this.getPage = id => {
  	return new Promise((res, rej) => {
  		this.page.findOne({_id: id}, (e, doc) => {
  			if (e) rej(e);
  			else res(doc)
  		})
  	})
  }
  this.getPageByURL = url => {
  	return new Promise((res, rej) => {
  		this.page.findOne({url: url}, (e, doc) => {
  			if (e) rej(e);
  			else res(doc)
  		})
  	})
  }
  this.getAllPages = () => {
  	return new Promise((res, rej) => {
  		this.page.find({}, (e, docs) => {
  			if (e) rej(e);
  			else res(docs)
  		})
  	})
  }
  this.createPage = doc => {
  	return new Promise((res, rej) => {
  		this.page.create(doc, e => {
  			if (e) rej(e);
  			else res()
  		})
  	})
  }
  /*
   * Scheduled Pages
   */
  this.getScheduled = id => {
  	return new Promise((res, rej) => {
  		this.scheduled.findOne({_id: id}, (e, doc) => {
  			if (e) rej(e);
  			else res(doc)
  		})
  	})
  }
  this.getScheduledByURL = url => {
  	return new Promise((res, rej) => {
  		this.scheduled.findOne({url: url}, (e, doc) => {
  			if (e) rej(e);
  			else res(doc)
  		})
  	})
  }
  this.deleteScheduled = id => {
  	return new Promise((res, rej) => {
  		this.scheduled.deleteOne({_id: id}, e => {
  			if (e) rej(e);
  			else res()
  		})
  	})
  }
  this.getAllScheduleds = () => {
  	return new Promise((res, rej) => {
  		this.scheduled.find((e, docs) => {
  			if (e) rej(e);
  			else res(docs)
  		})
  	})
  }
  this.createScheduled = doc => {
  	return new Promise((res, rej) => {
  		this.scheduled.create(doc, e => {
  			if (e) rej(e);
  			else res()
  		})
  	})
  }
  return this;
}
function dbConnect(mngs, dbStr) {
  return new Promise((res) => {
    mngs.connect(dbStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    res()
  })
}
