"use strict";
var calendar, organizer;
var RRule = rrule.RRule;

// calendar days layout swipe function
$(function() {
    $(".days").swipe({
        fingers: 'all',
        swipeLeft: swipe,
        swipeRight: swipe,
        allowPageScroll: "auto"
    });
});

function swipe(event, direction, distance, duration, fingerCount, fingerData, currentDirection) {
    if (direction == "left") {
        $("#calendarContainer-month-next").click();
    } else if (direction == "right") {
        $("#calendarContainer-month-back").click();
    }
}


// delete button click function
$('#gg').click(function() {
    var deleteId = $('#gg').attr('button-data');
    if (deleteId != "") {
        if (confirm("確定要刪除嗎?")) {
            var data = {
                id: deleteId
            };
            fetch('/profile/delete', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(data => {
                    if (data.status == 200) {
                        $('#gg').attr('button-data', "");
                        dataWithAjax(function(data) {
                            // initializing a new organizer object, that will use an html container to create itself
                            organizer = new Organizer("organizerContainer", // id of html container for calendar
                                calendar, // defining the calendar that the organizer is related
                                data // small part of the data of type object
                            );
                        });
                        alert("已經刪除！");
                    } else {
                        alert('King Arthur was assassinated')
                    }
                })
        } else {
            alert("已經取消了刪除操作");
        }
    }
})

// edit button click function
$('#uu').click(function() {
    $('#exampleModal input').prop('disabled', false);
    $('#woofbtn').css('display', 'inline-block');
    $('#uu').css('display', 'none');
})

// The moment of Modal appearance will trigger
$('#exampleModal').on('show.bs.modal', function(event) {
    initialize();
    var button = $(event.relatedTarget); // Button that triggered the modal
    // there are not the same
    // console.log(JSON.parse(button[0].dataset.whatever).time);
    // console.log(button.data('whatever').time);

    $(".btnpos").toggleClass('btnposflip'); // Button animation
    if (button.data('whatever') != undefined) {
        console.log('change data');
        if (button.data('whatever').id != undefined) {
            if (button.data('whatever').id != "") {
                $('#exampleModal input').prop('disabled', true);
                $('#woofbtn').css('display', 'none');
            }
            $('#gg').attr('button-data', button.data('whatever').id);
            $('#uu').attr('button-data', button.data('whatever').id);
            $('#woofbtn').attr('button-data', button.data('whatever').id);
        }

        var modal = $(this);
        modal.find('#message-title').val(button.data('whatever').title);
        modal.find('#message-text').val((button.data('whatever').text != undefined) ? button.data('whatever').text : "");
        modal.find('#message-location').val((button.data('whatever').location != undefined) ? button.data('whatever').location : "");

        if (button.data('whatever').startTime != undefined && button.data('whatever').endTime != undefined && button.data('whatever').startTime != "" && button.data('whatever').endTime != "") {
            // the days trigger modal have already exists data
            var time = JSON.parse(button[0].dataset.whatever).time;
            $('#startTime').val(button.data('whatever').startTime);
            $('#startDate').val(time.slice(0, 4) + '/' + time.slice(5, 7) + '/' + time.slice(9));
            // === === === ===
            // === === === ===
            $('#endTime').val(button.data('whatever').endTime);
            $('#endDate').val(time.slice(0, 4) + '/' + time.slice(5, 7) + '/' + time.slice(9));
        } else if (button.data('whatever').time != undefined) {
            // the days trigger modal have empty data
            $('#uu').css('display', 'none');
            $('#gg').css('display', 'none');
            var time = button.data('whatever').time;
            var d = new Date();
            var dayZero = (parseInt(time.slice(9)) < 10) ? ("0" + time.slice(9)) : time.slice(9);
            // time gap
            var offset = 0;
            var carry = 0;
            if (d.getHours() < 23) {
                if (d.getMinutes() >= 45) {
                    carry = 1;
                    offset = -30;
                } else {
                    offset = 30;
                }
            } else if (d.getHours() == 23) {
                if (d.getMinutes() >= 45) {
                    offset = 0;
                } else {
                    offset = 30;
                }
            }
            var startMinutes = ((d.getMinutes() > 9) ? (d.getMinutes()) : ("0" + d.getMinutes()));
            $('#startTime').val(d.getHours() + ':' + "00"); //startMinutes
            $('#startDate').val(time.slice(0, 4) + '/' + time.slice(5, 7) + '/' + dayZero);
            // === === === ===
            // === === === ===
            var endMinutes = ((d.getMinutes() + offset) > 9) ? (d.getMinutes() + offset) : ("0" + (d.getMinutes() + offset));
            $('#endTime').val((d.getHours() + carry) + ':' + "30"); //endMinutes
            $('#endDate').val(time.slice(0, 4) + '/' + time.slice(5, 7) + '/' + dayZero);
        }

        // picker content update
        Timepick1.update();
        Datepick1.update();
        Timepick2.update();
        Datepick2.update();
    }
})

// modal disppear refresh calendar page
$('#exampleModal').on('hidden.bs.modal', function() {
    console.log('4+ hidden');
    $('#uu').css('display', 'inline-block');
    $('#gg').css('display', 'inline-block');
    $('#woofbtn').css('display', 'inline-block');
    $('#exampleModal input').prop('disabled', false);
    $(".btnpos").toggleClass('btnposflip');
})

$('#vis').click(function() {
    console.log('sadsdadas');
    if ($.cookie().title != "null" && $.cookie().start != "null" && $.cookie().end != "null" && $.cookie().location != "null") {
        console.log('fufufufufuf');
        var titlec = $.cookie().title || "";
        var startc = moment($.cookie().start) || "";
        var endc = moment($.cookie().end) || "";
        var locationc = $.cookie().location || "";
        var sendData = {
            id: "",
            title: titlec,
            text: "",
            location: locationc,
            startTime: startc.get('hour') + ":" + startc.get('minute'),
            endTime: endc.get('hour') + ":" + endc.get('minute'),
            time: startc.get('year') + " " + ((startc.get('month') + 1) < 10 ? '0' : "") + (startc.get('month') + 1) + '/ ' + startc.get('date') // qqqq
        };
        $.cookie('title', null, { path: '/' });
        $.cookie('start', null, { path: '/' });
        $.cookie('end', null, { path: '/' });
        $.cookie('location', null, { path: '/' });
        console.log('asdsadas' + $.cookie().title);
        // $('#gg').css('display', 'none');
        // $('#uu').css('display', 'none');
        $('#woofbtn').css('display', 'none');
        $('#exampleModal input').prop('disabled', true);
    }
    $("#vis").attr("data-whatever", JSON.stringify(sendData));
});

// ================================
$(".btnpos").click(function() { //press
    $('#exampleModal input').prop('disabled', false);
    $('#uu').css('display', 'none');
    $('#gg').css('display', 'none');
    // var d = moment();
    // const newStartTime = (d.get('minute') > 30 ? d.add(1, 'h') : d);
    // const disMinute = (d.get('minute') > 30 ? "00" : "30");
    // const sendData = {
    //     id: "",
    //     title: "",
    //     text: "",
    //     startTime: (newStartTime.get('hour') < 10 ? "0" : "") + newStartTime.get('hour') + ":" + disMinute,
    //     endTime: (newStartTime.add(1, 'h').get('hour') < 10 ? "0" : "") + newStartTime.get('hour') + ":" + disMinute,
    //     location: "",
    //     time: newStartTime.get('year') + ' ' + ((newStartTime.get('month') + 1) < 10 ? '0' : "") + (newStartTime.get('month') + 1) + '/ ' + newStartTime.get('date')
    // };
    // $(".btnpos").attr("data-whatever", JSON.stringify(sendData));
})

// ================================

$('#woofbtn').click(() => {
    const eventTitle = $('#message-title');
    const eventtext = $('#message-text');
    const eventLocation = $('#message-location');

    var c1 = Datepick1.getDate(true).replace("/", "-").replace("/", "-").replace("/", "-");
    var startT = c1 + "T" + Timepick1.getDate(true) + ":00+08:00";

    var c2 = Datepick2.getDate(true).replace("/", "-").replace("/", "-").replace("/", "-");
    var endT = c2 + "T" + Timepick2.getDate(true) + ":00+08:00";

    // the RRule type =======================
    var count, until, interval;
    var rule;
    if ($('input[name=period]:checked').val() != undefined && $('input[name=rule]:checked').val() != undefined) {

        if ($('input[name=period]:checked').val().length == 2) {
            count = parseInt($('input[name=period]:checked').val());
            until = undefined;
            interval = undefined;
        } else if ($('input[name=period]:checked').val().length == 10) {
            count = undefined;
            until = Gandalf.getDate();
            interval = undefined;
        }

        if ($('input[name=rule]:checked').val() != "shit" && $('input[name=rule]:checked').val() != undefined) {
            rule = new RRule({
                freq: eval($('input[name=rule]:checked').val()),
                until: until,
                count: count,
                interval: interval
            })
        }
    }

    var recurrence = rule ? [("RRULE:" + rule.toString())] : "";
    // the RRule type =======================  end

    var data = {
        start: startT,
        end: endT,
        summary: (eventTitle.val() == "") ? "新活動" : eventTitle.val(), //title
        location: eventLocation.val(),
        description: eventtext.val(),
        id: $('#woofbtn').attr('button-data'),
        recurrence: recurrence,
        transportation: $('input[name=transportation]:checked').val(),
        option: $('input[name=option]:checked').val(),
        userid: $.cookie('userID')
    };

    // the Conditionality needs to be integrated ============================== fix point
    if ($('#woofbtn').attr('button-data') != "" && $('#woofbtn').attr('button-data') != undefined && eventTitle.val() != "" && endT > startT) {
        if (confirm("確定要更新嗎?")) {
            fetch('/profile/update', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then((res) => {
                    if (res.ok) {
                            console.log('message to fuckin line');
                            fetch('/profile/lineMessage', {
                                method: 'POST', // or 'PUT'
                                body: JSON.stringify(data), // data can be `string` or {object}!
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })
                        dataWithAjax(function(data) {
                            // initializing a new organizer object, that will use an html container to create itself
                            organizer = new Organizer("organizerContainer", // id of html container for calendar
                                calendar, // defining the calendar that the organizer is related
                                data // small part of the data of type object
                            );
                        });
                        alert("已經更新！");
                        return;
                    }
                    throw new Error('failed');
                });
            $('#woofbtn').attr('button-data', "");
        } else {
            alert("已經取消更新操作");
        }
    } else if (endT > startT) {
        if (confirm("確定新增嗎?")) {
            console.log('right');
            fetch('/profile/quickAdd', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then((res) => {
                    if (res.ok) {
                        if ($('input[name=option]:checked').val() != undefined && $('input[name=transportation]:checked').val() != undefined) {
                            console.log('message to line');
                            fetch('/profile/lineMessage', {
                                method: 'POST', // or 'PUT'
                                body: JSON.stringify(data), // data can be `string` or {object}!
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })
                        }
                        dataWithAjax(function(data) {
                            // initializing a new organizer object, that will use an html container to create itself
                            organizer = new Organizer("organizerContainer", // id of html container for calendar
                                calendar, // defining the calendar that the organizer is related
                                data // small part of the data of type object
                            );
                        });
                        alert("已經新增！");
                        return;
                    }
                    throw new Error('failed');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("已經取消新增操作");
        }
    } else {
        alert('資料錯誤 小心火燭');
    }
    // ============================================= fix point end
    eventTitle.val("");
    eventLocation.val("");
    eventtext.val("");
})
// initializing a new calendar object, that will use an html container to create itself
calendar = new Calendar("calendarContainer", // id of html container for calendar
    "medium", // size of calendar, can be small | medium | large
    [
        "日", // left most day of calendar labels
        3 // maximum length of the calendar labels
    ], [
        "#A2A0A0", // primary color
        "#A2A0A0", // primary dark color
        "#ffffff", // text color
        "#ffecb3" // text dark color
    ]
);

const Timepick1 = new Picker(document.querySelector('#startTime'), {
    format: "HH:mm",
    increment: {
        minute: 15
    },
    rows: 3,
    text: {
        title: '請輸入活動起始時間',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            hour: '時',
            minute: '分',
        };

        return Number(text) + suffixes[type];
    }
});
const Datepick1 = new Picker(document.querySelector('#startDate'), {
    format: 'YYYY/MM/DD',
    text: {
        title: '請輸入活動起始日期',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            year: '年',
            month: '月',
            day: '日'
        };

        return Number(text) + suffixes[type];
    }
});
// exchange~~~~~~~~~~~~~~
const Timepick2 = new Picker(document.querySelector('#endTime'), {
    format: "HH:mm",
    increment: {
        minute: 15
    },
    rows: 3,
    text: {
        title: '請輸入活動結束時間',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            hour: '時',
            minute: '分',
        };

        return Number(text) + suffixes[type];
    },
});
const Datepick2 = new Picker(document.querySelector('#endDate'), {
    format: 'YYYY/MM/DD',
    text: {
        title: '請輸入活動結束日期',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            year: '年',
            month: '月',
            day: '日'
        };

        return Number(text) + suffixes[type];
    }
});

const csTime = new Picker(document.querySelector('#csTime'), {
    format: 'mm',
    text: {
        title: '請選擇提醒時間',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            minute: '分',
        };

        return Number(text) + suffixes[type];
    }
});

const Gandalf = new Picker(document.querySelector('#Gandalf'), {
    format: 'YYYY:MM:DD',
    text: {
        title: '請選擇重複事件結束日期',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            year: '年',
            month: '月',
            day: '日'
        };
        return Number(text) + suffixes[type];
    }
});

const Mithrandir = new Picker(document.querySelector('#Mithrandir'), {
    format: 'YY',
    text: {
        title: '請選擇重複事件次數',
        cancel: '取消',
        confirm: '確認',
    },
    translate(type, text) {
        const suffixes = {
            year: '次'
        };
        return Number(text) + suffixes[type];
    }
});

var dropdownbtnClick = function(e) { //remake calendar
    if (e.currentTarget.id == "we") {
        // change week start
        calendar = new Calendar("calendarContainer", // id of html container for calendar
            "medium", // size of calendar, can be small | medium | large
            [
                e.currentTarget.innerHTML.slice(1, 2), // left most day of calendar labels
                3 // maximum length of the calendar labels
            ], [
                "#A2A0A0", // primary color
                "#A2A0A0", // primary dark color
                "#ffffff", // text color
                "#ffecb3" // text dark color
            ]
        );

        dataWithAjax(function(data) {
            // initializing a new organizer object, that will use an html container to create itself
            organizer = new Organizer("organizerContainer", // id of html container for calendar
                calendar, // defining the calendar that the organizer is related
                data // small part of the data of type object
            );
        });
        $('#dropdown button').on('click', dropdownbtnClick);
        $(".days").swipe({
            fingers: 'all',
            swipeLeft: swipe,
            swipeRight: swipe,
            allowPageScroll: "auto"
        });
        if (e.currentTarget.innerHTML.slice(1, 2) == "一") {
            $("#we").html('以日開始');
        }
        //=================
    } else if (e.currentTarget.id == "tr") {
        // account switch
        if (confirm("確定要切換帳戶嗎?")) {
            window.location.href = "/auth/deleteCookie";
        } else {
            alert('取消操作');
        }
        //================
    } else {
        console.log('what happen');
    }
}

$('#dropdown button').on('click', dropdownbtnClick);

$("#startTime,#startDate").change(function() { // picker+15
    console.log('change');
    const newEnd = moment(`${Datepick1.getDate(true)} ${Timepick1.getDate(true)}`).add(15, 'm');
    const newEndTime = (newEnd.get('hour') < 10 ? "0" : "") + newEnd.get('hour') + ":" + (newEnd.get('minute') < 10 ? "0" : "") + newEnd.get('minute');
    const newEndDate = newEnd.get('year') + "/" + ((newEnd.get('month') + 1) < 10 ? "0" : "") + (newEnd.get('month') + 1) + "/" + (newEnd.get('date') < 10 ? "0" : "") + newEnd.get('date');
    $('#endTime').val(newEndTime);
    $('#endDate').val(newEndDate);
    Timepick2.update();
    Datepick2.update();
});

$("#csTime").change(function() {
    if ($('#csTime').val() == 'on') {
        $('#csTime + span')[0].innerHTML = "自訂";
    } else {
        $('#csTime + span')[0].innerHTML = "自訂 ( " + $('#csTime').val() + "分鐘 )";
    }
});

$("#Gandalf").change(function() {
    if ($('#Gandalf').val() == 'on') {
        $('#Gandalf + span')[0].innerHTML = "截止日期";
    } else {
        $('#Gandalf + span')[0].innerHTML = " 於 " + $('#Gandalf').val() + " 結束 ";
    }
});

$("#Mithrandir").change(function() {
    if ($('#Mithrandir').val() == 'on') {
        $('#Mithrandir + span')[0].innerHTML = "重複次數";
    } else {
        $('#Mithrandir + span')[0].innerHTML = " 重複 " + $('#Mithrandir').val() + " 次 ";
    }
});



function dataWithAjax(callback) {
    $('#calendarContainer-year').hide();
    fetch('/profile/askEvent', { method: 'GET' })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('failed');
        })
        .then((data) => {
            // TODO : Call the Callback to display the Data
            callback(data.calendarNewList);
        })
        .catch((error) => {
            console.log(error);
        });
};

function initialize() {
    var input = document.getElementById('message-location');
    var options = {
        componentRestrictions: { country: "tw" }
    };
    console.log('auto');
    new google.maps.places.Autocomplete(input, options);
}


window.onload = function() {

    dataWithAjax(function(data) {
        // initializing a new organizer object, that will use an html container to create itself
        organizer = new Organizer("organizerContainer", // id of html container for calendar
            calendar, // defining the calendar that the organizer is related
            data // small part of the data of type object
        );
    });
    if ($.cookie().title != "null" && $.cookie().start != "null" && $.cookie().end != "null" && $.cookie().location != "null") {
        console.log($.cookie().title);
        console.log($.cookie().start);
        console.log($.cookie().end);
        console.log($.cookie().location);
        $('#vis').click();
    }
    $('#calendarContainer-year').hide();
};