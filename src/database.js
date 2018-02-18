var data = require('../settings/agenda.json')

// make all Entries lowercase (makes it easier to compage them)
data=JSON.parse(JSON.stringify(data).toLowerCase())


/**
 * Returns all Sessions
 */
exports.getAll=function(){
    console.log("Returning all Sessions")
    return data;
}

/**
 * Returns all sessions for a specific time
 * @param {*} time 
 */
exports.getAllByTime=function(time){   
    console.log("Returning all Sessions matching the time "+time)
    return data.filter(session => {
        if (session.time!=null && sesson.time==time.toLowerCase()){
            return true;
        }
        return false;
    });
}


/**
 * Returns all sessions for a single speaker
 * @param {*} speaker 
 */
exports.getAllBySpeaker=function(speaker){     
    console.log("Returning all Sessions matching the speaker "+speaker.toLowerCase())   
    return data.filter(session => {
        if (session.speakers!=null && session.speakers.indexOf(speaker.toLowerCase())>-1){
            return true;
        }
        return false;
    });
}
