let data;

async function getdetailfromURL(magzine) {
    try {
        let responce = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=` + magzine)
            .then(val => {
                if (!val.ok) throw Error("failed");
                return val.json();
            })
            .catch(error => { return error; });
        return responce;
    }
    catch (error) {
        console.log(error);
    }
}
 
 function fillAccordion() {
    
    let accordion = document.getElementById('accordionPanelsStayOpenExample');

    for (let i = 0; i < magazines.length; i++){
        
        let show;

        if (i == 0) show = "collapse show";
        else show = "collapsed";

        getdetailfromURL(magazines[i]).then(val => {
            let show = ""; let col = "";
            if (i == 0) {
                show = "show"; 
            }
            else col = "collapsed";
            accordion.innerHTML += `
             <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading-${i}">
                <button class="accordion-button ${col}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i}" aria-expanded="${i==0}" aria-controls="flush-collapse-${i}">
                    ${val.feed.title}
                </button>
                </h2>
                <div id="flush-collapse-${i}" class="accordion-collapse collapse ${show}" aria-labelledby="flush-heading-${i}" data-bs-parent="#accordionPanelsStayOpenExample">
                <div class="accordion-body">
                        <div id="carouselExampleControls-${i}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${getcards(val.items).innerHTML}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls-${i}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls-${i}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                </div>
                </div>
            </div>
            `
        });
        
    }
 }

function getcards(arr) {
    let cards = document.createElement('div');
    let active = 'active';
    let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    for (let i = 0; i < arr.length; i++){
        if (i !== 0) active = ''; 
        let date = new Date(arr[i].pubDate);
        cards.innerHTML += `
        <div class="carousel-item  ${active}">
        <div class="card mb-3">
        <a href="${arr[i].link}">
        <img src="${arr[i].enclosure.link}" class="card-img-top hover" alt="..." >
        </a>
        <div class="card-body">
            <h5 class="card-title">${arr[i].title}</h5>
            <p class="card-text"><small class="text-muted">${arr[i].author} ${date.toLocaleDateString("en-US", options)}</small></p>
            <p class="card-text">${arr[i].content}</p>
        </div>
        </div>
        </div>
        `
    }
    
    return cards;
 }
fillAccordion()

