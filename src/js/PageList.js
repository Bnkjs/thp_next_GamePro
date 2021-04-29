import dayjs from "dayjs";

const today = dayjs().format('YYYY-MM-DD');
const oneYearofToday = dayjs().add(1, 'year').format('YYYY-MM-DD');

const PageList = (argument = "") => {

  const preparePage = () => {
    let articles = "";
    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            let platformsName = [];
            let genresList = [];
            article.platforms.forEach((x)=>{
            platformsName.push(x.platform.name);
            });
            article.genres.forEach((g)=>{genresList.push( g.name)});

            articles += `
        
            <div class="py-5">
            <div class="row">
              <!-- DEMO 4 Item-->
              <div id="card" class="col-lg-6 mb-3 mb-lg-0">
                <div class="hover hover-4 text-white img-card rounded"><img src="${article.background_image}" alt="">
                  <div class="hover-overlay"></div>
                  <div class="hover-4-content">
                  <a class="" href="#pagedetail/${article.id}">
                    <h3 class="hover-4-title  mb-0"><span class=" text-warning font-weight-bold">${article.name}
                    </a>
                    <br><span class="platforms-name font-weight-light text-white">${platformsName}</span></h3>
                    <p class="hover-4-description  infos-game"> Sortie:${article.released}, Note: <span class="text-danger noteRate">${article.rating}</span> <br> ${genresList}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
          document.getElementById("card-insert").innerHTML = articles;
         fetch(`https://api.rawg.io/api/games/${article.id}?key=${process.env.API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
              let arrResponse =[response];
              arrResponse.forEach((x)=>{
              var gameName = x.name;
              })
            });
          });
       

        // /* -  - - - -  - - - - - - - Hover infos - -  - - - -  - - - - - -  - */

        /* -  - - - -  - - - - - - - Recherche - -  - - - -  - - - - - -  - */  
          const card = document.querySelectorAll('#card');
          let i ;
          for (i = 9; i < 20; i++){
            let invisible = [i];
            card[i].style.display='none';
            }
            const showmore = document.querySelector('#btn-showmore');
           
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=${today},${oneYearofToday}&ordering=-added`);
    
 
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles"></div>
      </section>
    `;
    const bar = document.getElementById('input-text');
    const search = document.getElementById('valueSearch');
    const hone = document.getElementById('titleHone')
    const textlorem = document.getElementById('textlorem');
    const selected = document.getElementById('selected-plat');
    bar.style.display="block";
    search.style.display="block";
    hone.style.display="block";
    textlorem.style.display="block";
    selected.style.display="block";

    preparePage();
  };

  render();
};
PageList();

let articles = "";
const btnSearch = document.getElementById('valueSearch');
btnSearch.addEventListener('click',function Value(){
  const input = document.getElementById('input-text');
  const value = input.value;
  // document.querySelector(".page-list .articles").innerHTML = "";
  fetch(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${value}`)
  .then((response) => response.json())
  .then((response) => {
    response.results.forEach((article) => {
      let platformsName = [];
      let genresList = [];
      article.genres.forEach((g)=>{genresList.push( g.name)});
      article.platforms.forEach((x)=>{
        platformsName.push(x.platform.name);
      });
      
      articles += `
      
      <div class="py-5">
      <div class="row">
        <!-- DEMO 4 Item-->
        <div id="card" class="col-lg-6 mb-3 mb-lg-0">
          <div class="hover hover-4 text-white img-card rounded"><img src="${article.background_image}" alt="">
            <div class="hover-overlay"></div>
            <div class="hover-4-content">
            <a class="" href="#pagedetail/${article.id}">
              <h3 class="hover-4-title  mb-0"><span class=" text-warning font-weight-bold">${article.name}
              </a>
              <br><span class="platforms-name font-weight-light text-white">${platformsName}</span></h3>
              <p class="hover-4-description  infos-game"> Sortie:${article.released}, Note: <span class="text-danger noteRate">${article.rating}</span> <br> ${genresList}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
    });
    document.getElementById("card-insert").innerHTML = articles;
  });

})


fetch(`https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`)
  .then((response) => response.json())
  .then((response) => {
    let optionValues = '<option selected>Plateform:</option>';
    let n = 0;
    response.results.forEach((x)=>{
      n++;
      optionValues += `<option value="${n}">${x.name}</option>`
    });
   document.querySelector('#selected-plat').innerHTML= optionValues;
  })

  

export default PageList;

