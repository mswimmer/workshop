/**
 * copyright 2012 Morton Swimmer (and others)
 * and released under the MIT license.
 *
 * Show functions to be exported from the design doc.
 */
exports.speakers = {
    map: function(doc) {  
	if ((doc.type == 'delegate') && doc.speaker && !doc.crew && !doc.deleted)
	    emit(doc.lastname + ", " + doc.firstname, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.non_speakers = {
    map: function(doc) {
	if ((doc.type == 'delegate') && !doc.speaker && !doc.crew && !doc.deleted)
	    emit(doc.lastname + ", " + doc.firstname, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.crew = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.crew && !doc.speaker && !doc.deleted)
	    emit(doc.lastname + ", " + doc.firstname, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.by_lastname = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.lastname && doc.firstname && !doc.deleted)
	    emit(doc.lastname + ", " + doc.firstname, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.by_firstname = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.firstname && doc.lastname && !doc.deleted)
	    emit(doc.firstname + " " + doc.lastname, 
		 doc.firstname + " " + doc.lastname);
    }
};
exports.by_country = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.country && !doc.deleted)
	    emit(doc.country, 
		 doc.country + " ("+doc.lastname+", "+doc.firstname+")");
    }
};
exports.by_email = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.email && !doc.deleted)
	    emit(doc.email, doc.email+" ("+doc.lastname+", "+doc.firstname+")");
    }
};
exports.by_orig_id = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.orig_id)
	    emit(doc.orig_id, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.by_lightning_speaker = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.lightning_speaker && !doc.deleted)
	    emit(doc.lastname + ", " + doc.firstname, 
		 doc.lastname + ", " + doc.firstname);
    }
};
exports.c_speakers = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.speaker  && !doc.crew && !doc.deleted)
	    emit("speakers", 1);
    },
    reduce: function (key, values, rereduce) {
	return sum(values);
    }
};
exports.c_non_speakers = {
    map: function(doc) {
	if ((doc.type == 'delegate') && !doc.speaker && !doc.crew && !doc.deleted)
	    emit("non_speakers", 1);
    },
    reduce: function (key, values, rereduce) {
	return sum(values);
    }
};
exports.c_all = {
    map: function(doc) {
	if (doc.type == 'delegate' && !doc.crew && !doc.deleted)
	    emit("all_delegates", 1);
    },
    reduce: function (key, values, rereduce) {
	return sum(values);
    }
};
exports.c_crew = {
    map: function(doc) {
	if (doc.type == 'delegate' && doc.crew && !doc.deleted)
	    emit("all_crew", 1);
    },
    reduce: function (key, values, rereduce) {
	return sum(values);
    }
};
exports.c_lightning_speakers = {
    map: function(doc) {
	if ((doc.type == 'delegate') && doc.lightning_speaker && !doc.deleted)
	    emit("all_lightning_speakers", 1);
    },
    reduce: function (key, values, rereduce) {
	return sum(values);
    }
};
