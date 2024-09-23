fetch('/api/fundraisers')
  .then(response => response.json())
  .then(response => {
    const fundraisers = response.data.fundraisers;
    let card = '';
    fundraisers.forEach(item => {
      card += `
        <div class="card">
            <div class="img">
                <img src="./images/crowd.png" width="100px" alt="">
            </div>
            <h3>${item.organizer}</h3>
            <a href='fundraiser/${item.fundraiserId}'>View Details</a>

					
            
        </div>`;
    });
    document.getElementById('card-container').innerHTML = card;
  })
  .catch(err => console.log(err));
