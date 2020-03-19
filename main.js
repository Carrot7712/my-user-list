;(function() {
  //取資料
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
  const INDEX_URL = BASE_URL + 'api/v1/users/'
  //存放API進來的資料
  const data = []
  //存放計算後當前頁面要顯示的資料
  let pageDate
  //找元件
  const dataPanel = document.getElementById('data-panel')
  const searchForm = document.getElementById('search')
  const searchInput = document.getElementById('search-input')
  const pagination = document.getElementById('pagination')

  //分頁準備
  const ITEM_PER_PAGE = 20
  let paginationData = []

  //紀錄當前顯示模式
  let displayMode = 'card'

  //透過API取得使用者資料
  axios
    .get(INDEX_URL)
    .then(response => {
      console.log(response.data.results)
      data.push(...response.data.results)
      displayCard(data)
    })
    .catch(error => console.log(error))
  // ===============EventListeners======================
  //listen to data panel
  dataPanel.addEventListener('click', function() {
    if (event.target.matches('.btn-show-user')) {
      // console.log(event.target.dataset.id)
      displayModal(event.target.dataset.id)
    }else if (event.target.classList.contains('.btn-add-fever')){
      addFeverList(event.target.dataset.id)
    }
  })
  //===============functions======================
  //show cards
  function displayCard(data) {
    let htmlContent = ''
    data.forEach(item => {
      htmlContent += `
        <div class="col-sm-3 mt-3">
            <div class="card mb-2">
                <!-- card img -->
                <img class="card-img-top " src="${item.avatar}" alt="Card image cap">

                    <!-- card body -->
                    <div class="card-body ">
             <h6 class="card-title user-name">${item.name} ${item.surname}</h6>
             <i class="fas fa-plane"></i> <span class="card-content user-region">${item.region}</span>
                    </div>
                    <!-- "More" button -->
                    <button
                      class="btn btn-secondary btn-sm btn-show-user"
                      data-toggle="modal"
                      data-target="#show-user-modal"
                      data-id="${item.id}"
                    >More</button>
                    <!-- favorite button --> 
                    <button 
                    class="btn btn-info btn-add-fever btn-sm " data-id="${item.id}">+</button>
            </div>
        </div>
        `
      dataPanel.innerHTML = htmlContent
    })
  }
  //show modal
  function displayModal(id) {
    //get elements
    const userAvatar = document.getElementById('user-avatar')
    const userName = document.getElementById('user-name')
    const userBd = document.getElementById('user-bd')
    const userRegion = document.getElementById('user-region')
    const userEmail = document.getElementById('user-email')
    const userCreated = document.getElementById('user-created')
    const userUpdated = document.getElementById('user-updated')
    //set request url
    const url = INDEX_URL + id
    console.log(url)
    //send request to Show API
    axios
      .get(url)
      .then(response => {
        const data = response.data
        console.log(response.data.avatar)
        //insert data into modal UI
        userAvatar.innerHTML = `
        <img src="${data.avatar}" alt="..." class="img-fluid">
        `
        userName.textContent = `${data.name} ${data.surname}`
        userBd.innerHTML = `${data.birthday} age(${data.age})`
        userRegion.innerHTML = `Travel from:${data.region}`
        userEmail.innerHTML = `Contact Info:\n ${data.email}`
        userUpdated.innerHTML = `Entry time: ${data.updated_at}`
      })
      .catch(error => console.log(error))
  }

  //增加發燒者並存在local storage
  function addFeverList(id){
    const list = JSON.parse(localStorage.getItem('feverUsers'))||[]
    const user =data.find(item =>item.id === Number(id))
    if(list.some(item=>item.id === Number(id))){
      alert(`${user.name} ${user.surname} is already in the quarantine list.`)
    }else{
      list.unshift(user)
      alert(`Added ${user.name} ${user.surname} into the quarantine list.`)
    }
    localStorage.setItem('feverUsers',JSON.stringify(list))
  }

})()
