const keys = [ 
    '55DMX7AUSVH9X71I',
    'JEGUDX9ZDGJV8P7A',
    'DGM1ROHL6OKQOTA9',
    'Y171J282RYG88BUV',
    'BZTR08K8GML3WUJV',
    '3X6AHHZ7IYNHI0EN',
    '5SSS8UJE2YUH2O0P',
    'YI1NJAYP2PDEPBDL',
    'RAIAED9RDWSTERYN',
    'IYMM63PH16LZYAJU',
    '49IF1SLW3T7VALF9',
    '9YW0U7UR6C4TIEPS',
    'BL554XDS904U13PE',
    '5066GTPJKK9BZ5YR',
    'R2PL7J4HE6CB3PV6',
    'CA2701AGE6P6VR9O',
    '99SHUDC8AWIREAY1',
    'DVE4BWAA3XZNLQ8H',
    'TL6OH6PWX2TCXS2E',
    'TQ4NSLVIZ6WBRJNC',
    '4JCT7VNVHK2ZUB27',
    'CPAU3ZSNHEC3O1G9',
    'UT4EW63F1FEE2E1S',
    'R2BC7VALBGX5PJIG',
    'I6LWQ66TABD46WER',
    '4V3WPTTBMJ7YDIY8',
    'QY7C36C043N7EU7G',
    'KQL8GE5XT1OW4BYE',
    '7HHQKXQVHUOZ6TM0',
    'XY89PZRETBBWKVTF'];
console.log(keys);
var keyi=0;
let search = document.getElementById('search');
let container  = document.getElementById('container');
let error  = document.getElementById('error');
let table  = document.getElementById('table');
search.addEventListener('keypress',function(e)
{
    if(e.key==='Enter'){
    table.style.display = "none";
    container.style.display = "flex";
    container.innerHTML = "";
    error.innerHTML = "";
    let countries = "";

    if(search.value.length > 0)
    {
        let endPoint = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+search.value+"&apikey="+keys[(keyi++)%keys.length];
        fetch(endPoint)
            .then(response => response.json())
            .then(result => {
                console.log(keyi + "  "+keys[(keyi-1)%keys.length]+" "+result);
                if(result.status == 404 && result.message == "Not Found")
                {
                    error.innerHTML = "Try after some Time!";
                    return;
                }
                let bestmatch = result.bestMatches;
                for(let stocks of bestmatch){
                    //console.log(stocks['1. symbol']);
                    countries += 
                        `<div class="card rm bm" onclick="companyview('${stocks['1. symbol']}')">
                            <div>
                                <div class="name lm">${stocks['1. symbol']}</div>
                                <div class="capital lm">${stocks['2. name']}</div>
                                <div class="languages lm bm">${stocks['4. region']}</div>
                            </div>
                        </div>`
                }
                
                // for(let country of result)
                // {
                //     let names = Object.values(country.languages);
                //     let namesA = "";
                //     for(let values of names)
                //     {
                //         namesA += values + ' | ';
                //     }
                //     countries += 
                //         `<div class="card rm bm">
                //             <img class="flag" src="${country.flags.svg}">
                //             <div>
                //                 <div class="name lm">${country.name.common}</div>
                //                 <div class="capital lm">${country.capital}</div>
                //                 <div class="languages lm bm">${namesA}</div>
                //             </div>
                //         </div>`;
                // }
                    container.innerHTML = countries;
            });  
    }
}
});

function companyview(sym){
    container.style.display = "none";
    table.style.display = "table";
    console.log(sym);
    let endPoint = "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+sym+"&apikey=ACK3S876HS9TWYS1";
        fetch(endPoint)
            .then(response => response.json())
            .then(result => {
                if(result.status == 404 && result.message == "Not Found")
                {
                    error.innerHTML = "Try after some Time!";
                    return;
                }
                var table = document.querySelector('table');
                var rows = '';

                for(var t in result){
                    rows += '<tr><td>' + t + '</td><td>' + result[t] + '</td></tr>'
                }
                table.innerHTML = rows;
            });    
}