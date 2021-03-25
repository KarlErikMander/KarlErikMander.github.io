(function () {
    "use strict";

    //clock


    let c = document.getElementById("clock");

    function updateClock() {
        let date = new Date();
        let tunnid = date.getHours();
        let minutid = date.getMinutes();
        let sekundid = date.getSeconds();
        let ampm = tunnid >= 12 ? 'pm' : 'am';
        tunnid = tunnid % 12;
        tunnid = tunnid ? tunnid : 12;
        minutid = minutid < 10 ? '0' + minutid : minutid;
        c.innerHTML = tunnid + ':' + minutid + ':' + sekundid + ' ' + ampm;

    };
    // Kuna js script fail on body lõpus siis pole vaja dom eventit, kuna me teame juba, et kõik body asjad on sisse laetud.
    // See on siis vajalik, kui me impordiks js faili Headeris sisse
    updateClock();
    setInterval(updateClock, 1000);

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let deliveryCostElement = document.getElementById("delivery");
    let giftElement = document.getElementById("v1");
    let contactFreeElement = document.getElementById("v2");
    let fname = document.getElementById('fname');
    let lname = document.getElementById('lname');
    deliveryCostElement.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        let linn = '';
        if (document.getElementById('Tallinn').checked) {
            linn = 'Tallinn';
        }
        if (document.getElementById('Tartu').checked) {
            linn = 'Tartu';
        }
        if (document.getElementById('Pärnu').checked) {
            linn = 'Pärnu';
        }
        if (document.getElementById('Narva').checked) {
            linn = 'Narva';
        }
        // Kontrolli, kas linn on valitud
        if (linn === "") {
            alert("Palun valige linn nimekirjast");
            return;
        }// Kontrolli, kas ees ja perekonnanimi on täidetud
        else if (fname.value.length == 0 || lname.value.length == 0) {
            alert("Palun täitke ees ja perekonnanime lahtrid!");
            return;
        }// Kontrolli, kas ees ja perekonnanimes on kõik tähed või on numbreid ka
        else if (!containsOnlyLetters(fname.value) || !containsOnlyLetters(lname.value)) {
            alert("Ees ja perekonnanimes tohivad olla ainult tähed!");
            return;
        } else {
            let sum = 0.0;
            if (giftElement.checked) {
                sum += 5;
            }
            if (contactFreeElement.checked) {
                sum += 1;
            }

            switch (linn) {
                case 'Tartu':
                    sum += 2.5;
                    break;
                case 'Narva':
                    sum += 2.5;
                    break;
                case 'Pärnu':
                    sum += 3;
                    break;
            }
            deliveryCostElement.innerHTML = sum + "&euro;";
        }
        console.log("Tarne hind on arvutatud");
    }

})();


function containsOnlyLetters(input) {

    var re = /^[A-Za-z]+$/;
    if (re.test(input)) {
        return true;
    } else {
        return false;
    }

}

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;
let infobox;
function GetMap() {
    "use strict";
    // Asukohad
    let TartuUniversityLocation = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    let RohuLocation = new Microsoft.Maps.Location(
        58.351077,
        26.521646
    );

    // Kaardi loomine
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: new Microsoft.Maps.Location(58.362062, 26.630403),
        zoom: 11,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    // Loo pushpinid ja lisa metainfo juurde, et pealevajutates oleks mida näidata
    let pushpin1 = new Microsoft.Maps.Pushpin(TartuUniversityLocation, {
        title: 'Tartu Ülikool',
    });
    pushpin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Suur ja vägev kool'
    };
    let pushpin2 = new Microsoft.Maps.Pushpin(RohuLocation, {
        title: 'Rõhu',
    });
    pushpin2.metadata = {
        title: 'Rõhu',
        description: 'Väike ja rahulik koht'
    };

    // Event kuulaja, et teada, kui vajutati pushpini peale
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    // Lisa pushpinid kaardile
    map.entities.push(pushpin1);
    map.entities.push(pushpin2)

    // Loo keset kaarti infobox mis on nähtamatu. See on selle jaoks, et kui vajutatakse pushpinile siis on koht, kus näidata infot
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    // Lisa infobox kaardile
    infobox.setMap(map);
}

function pushpinClicked(e) {
    // Vaata, kas pushpinil on metainfot mida näidata
    if (e.target.metadata) {
        // Lisa pushpini metainfo infoboxi
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

