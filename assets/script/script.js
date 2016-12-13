$('.list-group-item').on('click', function() {
    var trimester = $(this).data("trimester");

    renderButtons(trimester);
});

$('#healthFinder').on('click', function() {
    var queryURL =
        "https://healthfinder.gov/api/v2/myhealthfinder.json?" +
        "api_key=demo_api_key&lang=en&age=18&sex=female&pregnant=1&who=me&category=pregnant";
    // This line of code will grab the input from the textbox
    var healthHeadFirst =
        '<div class="panel panel-primary"><div class="panel-heading">' +
        '<h3 class="panel-title"><strong>';

    var headlthHeadSecond = '</strong></h3></div>';

    var panelBodyFirst =
        '<div class="panel-body well">';

    // for (var i = 0; i < 3; i++) {
    //     var headInfo =  'Pregnancy Info';
    //     var headDisplay = healthHeadFirst + headInfo +
    //         headlthHeadSecond;
    //     var healthLink = '    <a href="' +'http://cnn.com'+ '" target="_blank"> Visit Cnn</a>'
    //     var bodyDisplay = panelBodyFirst +'yyy <br>' + healthLink + 'xxx<br>zzz </div>';
    //        // +panelBodySecond;
    //     $('#healthFinderInfo').append(headDisplay);
    //     $('#healthFinderInfo').append(bodyDisplay);
    // }

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
            // console.log(queryURL);
            // console.log(response);

            var results = response.Result.Resources.Pregnant.Resource;
            for (var i = 0; i < results.length; i++) {
                var headInfo = results[i].Title || 'Pregnancy Info';
                var headDisplay = healthHeadFirst + headInfo +
                    headlthHeadSecond;

                var healthLink = 'Get More Info Here : <a href="' +
                    results[i].AccessibleVersion + '" target="_blank"> ' +
                    headInfo + '</a>'
                var bodyDisplay = panelBodyFirst + results[i].MyHFDescription + '<br>' + healthLink + '</div>';
                // +panelBodySecond;
                $('#healthFinderInfo').append(headDisplay);
                $('#healthFinderInfo').append(bodyDisplay);
                console.log(results[i]);
                console.log(results[i].AccessibleVersion);
            }

        });
    return false;
});



function renderButtons(trimester) {

    // Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
    $('#week-group').empty();

    // Loops through the array of movies
    for (var i = 0; i < 13; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('week-btn btn btn-block btn-default'); // Added a class 

        var currentWeek = (trimester * 13) + i + 1;
        a.attr('data-week', currentWeek);
        a.text('Week ' + currentWeek); // Provided the initial button text
        $('#week-group').append(a); // Added the button to the HTML
    }
}


function displayMedicalInfo() {
    var currentWeek = $(this).data('week');
   
    getVids(0, currentWeek);
    walMartProduct(currentWeek);
}


var channelName = 'TheStyleDiet';
var vidWidth = 600;
var vidHeight = 400;
var vidResults = 1;

function getPlayList(numWeek) {
   
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyDHad47cvR_LQXfWtBxgWPxVaWddrd0dvo'
        },
        function(data) {
            $.each(data.items, function(i, item) {
                console.log(item);
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid, numWeek);
            })
        }
    );
}

function getVids(pid, numWeek) {
  
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            q: 'pregnancy,week' + numWeek,
            maxResults: vidResults,
            channelId: "UCzdEQyIy-uCVXcjwfq8SbKw",
            key: 'AIzaSyDHad47cvR_LQXfWtBxgWPxVaWddrd0dvo'
        },
        function(data) {
            var output;
            $.each(data.items, function(i, item) {
                // console.log(item);
                videoTitle = item.snippet.title;
                videoId = item.id.videoId;

                output = '<li><iframe height="' + vidHeight + '"  width="' + vidWidth + '" src=\"https://www.youtube.com/embed/' + videoId + '\"></iframe></li>';

                //Append to resutls listStyleType
                $('#results').html(output);
            })
        }
    );
}

function walMartProduct(walmartWeek) {
    var shoppingItem = babyItem[walmartWeek-1];
   

    var queryURL = "http://utcors1.herokuapp.com/http://api.walmartlabs.com/v1/search?query=" + shoppingItem + "&format=json&apiKey=9n38r73usu824f5xcgeucemu"; //adds item number to api url to be searched

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

    $("#dynamicTable > tbody").empty();
    var babyInfo = "I've seen some better than this, but not at this price. I definitely recommend this item.";
    var babyRow = "<tr><td><img class='img-responsive' src ='"+response.items[0].mediumImage+"'/>" +
     "</td><td>" + response.items[0].name + "</td></tr>"

    $('#dynamicTable > tbody').append(babyRow);
   

    });
}
$("#datepicker").datepicker();
$(document).on('click', '.week-btn', displayMedicalInfo);

var babyItem = ["baby book",
    "Pregnancy Diet book",
    "Pregnancy Planner",
    "disposible bottle nipples",
    "lanolin ",
    "nursing pads",
    "baby starter kit bottles",
    "binky",
    "baby bottles",
    "baby swaddle",
    "baby dresser",
    "crib",
    "gym mat",
    "diaper bag",
    "baby carrier",
    "swing chair",
    "chair",
    "highchair",
    "jumper",
    "stroller",
    "play yard",
    "walker",
    "baby gate",
    "diapers",
    "baby wipes",
    "Johnson baby washing kit",
    "baby grooming kit",
    "changing pad",
    "Rocking chair",
    "changing table",
    "music toy",
    "teddy bear",
    "car seat",
    "baby food starter kit",
    "baby formula",
    "baby washcloths",
    "baby cook book",
    "Baby's First Books",
    "baby onsies",
    "receiving blankets"
];
