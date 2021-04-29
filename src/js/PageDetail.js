const PageDetail = (argument) => {
  const preparePage = () => {
    
    const fetchGame = (url, argument) => {
      let finalURL = url ;
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) =>  {
          let { name, released, description, background_image } = response;
          
          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".first").innerHTML += `<img src="${background_image}" class="card-img-top" alt="..."></img>`
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
        });
    };

    fetchGame(`https://api.rawg.io/api/games/${argument}?key=${process.env.API_KEY}`)};
  
  const render = () => {
    pageContent.innerHTML = `

    <a class="btn btn-warning mb-3" href="#pagelist">Retour</a>

      <section class="page-detail">
        <div class="article">
          <div class="first"></div>
          <div class="card bg-dark">
            <div class="card-body">
            <h1 class="title text-warning"></h1>
            <p class="release-date text-info">Release date : <span></span></p>
            <p class="description text-light"></p>
            </div>
        </div>
          
        </div>
      </section>
    `;
    const bar = document.getElementById('input-text');
    const search = document.getElementById('valueSearch');
    const hone = document.getElementById('titleHone')
    const textlorem = document.getElementById('textlorem');
    const selected = document.getElementById('selected-plat');
    bar.style.display="none";
    search.style.display="none";
    hone.style.display="none";
    textlorem.style.display="none";
    selected.style.display="none";

    preparePage();
  };

  render();
};


export default PageDetail;
