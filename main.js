;(function() {
  //取資料
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
  const INDEX_URL = BASE_URL + 'api/v1/users'
  //存放API進來的資料
  const data = []

  //找元件
  const dataPanel = document.getElementById('data-panel')


  
  // ===============EventListeners======================
  //listen to data panel
  document.addEventListener('DOMContentLoaded',function() {
    //透過API取得使用者資料
    axios
    .get(INDEX_URL)
    .then(response => {
      console.log(response.data.results)
      data.push(...response.data.results)
      displayData(data)
    })
    .catch(error => console.log(error))

  })
function displayData(data){
    let htmlContent = ''
    data.forEach(item => {
        htmlContent += `
        <div class="col-sm-3">
            <div class="card mb-2">
                <img class="card-img-top " src="${item.avatar}" alt="Card image cap">
                    <div class="card-body movie-item-body text-center">
             <h6 class="card-title">${item.name}</h6>
                    </div>
            </div>
        </div>
        `
        dataPanel.innerHTML=htmlContent
    })
    
}
})()
