var users =  ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
function myRequest(url, callback) {
    var rawData, data;
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
            rawData = this.response;
            data = JSON.parse(this.response);
            callback(data);
        }
    };
    request.send();
}





window.onload = function(){
    console.log('working');
    users.forEach(function(user){

        var stream, userName, channelUrl, logo, bannerImg;

        var url = "https://wind-bow.glitch.me/twitch-api/streams/" + user ;

        myRequest(url, function(data){

            if(data.stream === null){
                stream = "offline";
            } else {
                stream = "online";
            }

            var url = "https://wind-bow.glitch.me/twitch-api/channels/" + user ;

            myRequest(url, function(data){

                userName = data.display_name;
                channelUrl = data.url;
                logo = data.logo;
                bannerImg = data.profile_banner;
                if (logo === null){
                    logo = "https://maxcdn.icons8.com/Share/icon/City//no_camera1600.png";
                }
                console.log(userName + ' ' + channelUrl + ' ' + stream + ' ' + logo + ' ' + bannerImg);

                var oldHTML = document.getElementById("contents");

                var newHTML = document.createElement('div');
                newHTML.className = 'row mb-2 rounded p-2 ' + stream;
                newHTML.style = 'background-image: url(' + bannerImg + ')';


                newHTML.innerHTML = '<div class = "col-4"><a href="' + channelUrl + 'target="_blank"' + '><img class = "logo" src="'+ logo +'" alt=""></div><div class = "col-4 align-self-center"><h2 class="username rounded p-2 ">' + userName + '</h2></a></div>';



                if(stream === 'online' && oldHTML.childNodes.length > 0){
                    oldHTML.insertBefore(newHTML,oldHTML.childNodes[0]);

                } else {
                    oldHTML.appendChild(newHTML);
                }
                console.log(oldHTML);

            });

        });
    });

}