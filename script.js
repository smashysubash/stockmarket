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
//console.log(keys);
let keyi=0;
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
        let endPoint = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+search.value+"&apikey="+keys[keyi%30];
        fetch(endPoint)
            .then(response => response.json())
            .then(result => {
                keyi++;
                //console.log(keyi + "  "+keys[(keyi-1)%keys.length]+" "+result);
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
                    container.innerHTML = countries;
            });  
    }
}
});

function companyview(sym){
//    console.log(sym);
    let endPoint = "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+sym+"&apikey="+keys[keyi%30];
        fetch(endPoint)
            .then(response => response.json())
            .then(result => {
                keyi++;
                let ss =JSON.stringify(result);
                if(result.status == 404 && result.message == "Not Found")
                {
                    error.innerHTML = "Try after some Time!";
                    return;
                }
                if(ss==="{}"){
                    container.style.display = "flex";
                    container.innerHTML = "No data found";
                    table.style.display = "table";
                    return;
                }else if(ss.substring(0,3)==='{"N'){
                    container.style.display = "flex";
                    container.innerHTML = "Error!! Try again";
                    table.style.display = "table";
                }
                console.log(ss);
                var table = document.querySelector('table');
                var rows = '';
                for(var t in result){
                    rows += '<tr><td>' + t + '</td><td>' + result[t] + '</td></tr>'
                }
                table.innerHTML = rows;
                
                container.style.display = "none";
                table.style.display = "table";
            });    
}