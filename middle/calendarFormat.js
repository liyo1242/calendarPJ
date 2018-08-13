module.exports.dataFormat = (req, res, next) => {
  var newdata = {};
    // req.calendarList
  req.calendarList.forEach(function(element, index) {
    console.log(`number ${index} element `);
    console.log(element);
    var bufferDate = {
        start:{
            Year : "",
            Month : "",
            Day : "",
            Time : "00:00"
        },
        end:{
            Year : "",
            Month : "",
            Day : "",
            Time : "23:59"
        }
    };
        if(element.start.date != undefined && element.end.date != undefined){
            //console.log("start year = " + element.start.date.slice(0, 4));
            bufferDate.start.Year = parseInt(element.start.date.slice(0, 4));
            bufferDate.start.Month = parseInt(element.start.date.slice(5, 7));
            bufferDate.start.Day = parseInt(element.start.date.slice(8, 10));

            bufferDate.end.Year =  parseInt(element.end.date.slice(0, 4));
            bufferDate.end.Month =  parseInt(element.end.date.slice(5, 7));
            bufferDate.end.Day =  parseInt(element.end.date.slice(8, 10));
        }
        if(element.start.dateTime != undefined && element.end.dateTime != undefined){
            bufferDate.start.Year = parseInt(element.start.dateTime.slice(0, 4));
            bufferDate.start.Month = parseInt(element.start.dateTime.slice(5, 7));
            bufferDate.start.Day = parseInt(element.start.dateTime.slice(8, 10));
            bufferDate.start.Time = element.start.dateTime.slice(11, 16);

            bufferDate.end.Year =  parseInt(element.end.dateTime.slice(0, 4));
            bufferDate.end.Month =  parseInt(element.end.dateTime.slice(5, 7));
            bufferDate.end.Day =  parseInt(element.end.dateTime.slice(8, 10));
            bufferDate.end.Time = element.end.dateTime.slice(11, 16);
        }

        for(var y = bufferDate.start.Year; y <= bufferDate.end.Year; y++){
            if(!newdata[y])
                newdata[y] = {};
            console.log('woof woof woof');
            for(var m = bufferDate.start.Month; m <= bufferDate.end.Month; m++){
                if(!newdata[y][m])
                    newdata[y][m] = {};
                console.log('woof woof');
                for(var d = bufferDate.start.Day; d <= bufferDate.end.Day; d++){
                    console.log('woof');
                    console.log(`date = ${y} / ${m} / ${d} `);
                    if(!newdata[y][m][d])
                        newdata[y][m][d] = [];
                    newdata[y][m][d].push({
                        startTime: (d == bufferDate.start.Day) ? (bufferDate.start.Time) : ("00:00"),
                        endTime: (d == bufferDate.end.Day) ? (bufferDate.end.Time) : ("23:59"),
                        title: element.summary,
                        text: element.description,
                        id: element.id,
                        location: element.location
                    });
                }
            }
        }
    }) // === end of foreach
    req.newFormat = newdata;
  next();
}

//================== data format
// {
//     year: {
//         month: {
//             day: [ events ]
//         }
//     }
// }