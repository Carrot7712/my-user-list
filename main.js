;(function() {
  //取資料
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
  const INDEX_URL = BASE_URL + 'api/v1/users/'
  //存放API進來的資料
  const data = []
  //找元件
  const dataPanel = document.getElementById('data-panel')
  
  // ===============EventListeners======================
    //透過API取得使用者資料
    axios
    .get(INDEX_URL)
    .then(response => {
      console.log(response.data.results)
      data.push(...response.data.results)
      displayCard(data)
    })
    .catch(error => console.log(error))

  //listen to data panel
  dataPanel.addEventListener('click', function () { 
    if (event.target.matches('.btn-show-user')) { 
      console.log(event.target.dataset.id)
      displayModal(event.target.dataset.id)
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
                <img class="card-img-top " src="${item.avatar}" alt="Card image cap">
                    <div class="card-body movie-item-body text-center">
             <h6 class="card-title user-name">${item.name} ${item.surname}</h6>
             <i class="fas fa-plane"></i> <span class="card-content user-region">${item.region}</span>
                    </div>
                    <!-- "More" button -->
                    <div class="card-footer d-flex justify-content-center">
                    <button
                      class="btn btn-primary btn-show-user"
                      data-toggle="modal"
                      data-target="#show-user-modal"
                      data-id="${item.id}"
                    >
                      More
                    </button>
                  </div>

            </div>
        </div>
        `
      dataPanel.innerHTML = htmlContent
    })
  }
    //show modal
  function displayModal(id) { 
    //get elements
    const userAvatar=document.getElementById('user-avatar')
    const userName = document.getElementById('user-name')
    const userBd = document.getElementById('user-bd')
    const userRegion =document.getElementById('user-region')
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
        userBd.innerHTML=`${data.birthday} age(${data.age})`
        userRegion.innerHTML = `Travel from:${data.region}`
        userEmail.innerHTML= `Contact Info:\n ${data.email}`
        userUpdated.innerHTML=`Entry time: ${data.updated_at}`
      })
      .catch(error => console.log(error))
    //insert data into modal UI
  }

  // let generateModal=`
  //   <div class="modal-img">
  //   <img id="user-avatar" src="" alt="...">
  // </div>
  // <div class="modal-detail">
  //   <ul id="show-user-information">
  //     <li id="user-name">Name</li>
  //     <li id="user-bd">birthday(age)</li>
  //     <li id="user-region">region</li>
  //     <li id="user-email">email</li>
  //     <li id="user-created">created at</li>
  //     <li id="user-updated">updated at</li>
  //   </ul>
  // </div>
  // `

})()
