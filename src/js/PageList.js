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
          console.log(response.results);
          response.results.forEach((article) => {
            let platformsName = [];
            article.platforms.forEach((x)=>{
            platformsName.push(x.platform.name);
          
            })
           
            articles += `
               
                <div id="card" class="hover hover-1 text-white rounded"><img src="${article.background_image}" alt="">
                <div class="hover-overlay"></div>
                <div class="hover-1-content px-5 py-4">
                <a id="links" href="#pagedetail/${article.id}">
                  <h3 class=" hover-1-title text-uppercase font-weight-bold mb-0 text-warning"> <span class="font-weight-light">${article.name}</h3>
                  </a>
                  <p class=" font-weight-light mb-0"><a href="#">${platformsName}</a></p>
                </div>
                </div>
                </div>
             
                `;
          });
          document.getElementById("card-insert").innerHTML = articles;
          console.log();
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&dates=${today},${oneYearofToday}&ordering=-added`);

    // - - - - - - - - -- REcherche - -  - - -  - - - - -
   
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
      article.platforms.forEach((x)=>{
        platformsName.push(x.platform.name);
      });
      
      articles += `
      <div id="card" class="hover hover-1 text-white rounded"><img src="${article.background_image}" alt="">
      <div class="hover-overlay"></div>
      <div class="hover-1-content px-5 py-4">
      <a id="links" href="#pagedetail/${article.id}">
        <h3 class=" hover-1-title text-uppercase font-weight-bold mb-0 text-warning"> <span class="font-weight-light">${article.name}</h3>
        </a>
        <p class=" font-weight-light mb-0"><a href="#">${platformsName}</a></p>
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

