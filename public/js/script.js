fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    const data = json.slice(0, 8)
    let card = ''
    data.forEach(item => {
      card += `
        <div class="card">
            <div class="img">
                <img src="./images/crowd.png" width="100px" alt="">
            </div>
            <h3>${item.title}</h3>
            <a href='details.html?crowd-id=${item.id}'>View Details</a>

					
            
        </div>`
    })
    document.getElementById('card-container').innerHTML = card
  })
  .catch(err => console.log(err))
