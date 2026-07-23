const $searchForm = document.getElementById('searchForm')
const $dateInput = document.getElementById('dateInput')
const $message = document.getElementById('message')
const $apodResult = document.getElementById('apodResult')
const $favouritesList = document.getElementById('favouritesList')

const apiKey = 'DEMO_KEY'

// This gets saved favourites from localStorage.
// If there are no saved favourites, it starts with an empty array.
const favourites = JSON.parse(localStorage.getItem('favourites')) || []

// This stops the user from choosing a future date.
const today = new Date().toISOString().split('T')[0]
$dateInput.max = today

function showMessage(message) {
  $message.textContent = message
}

function saveFavourites() {
  localStorage.setItem('favourites', JSON.stringify(favourites))
}

// This function checks if the APOD is an image or video.
function createMedia(apod) {
  if (apod.media_type === 'image') {
    return `<img src="${apod.url}" alt="${apod.title}">`
  }

  if (apod.media_type === 'video') {
    return `<iframe src="${apod.url}" title="${apod.title}" allowfullscreen></iframe>`
  }

  return `<p>This APOD cannot be displayed.</p>`
}

// This shows the APOD result on the page.
function showApod(apod) {
  $apodResult.innerHTML = `
    <article class="apod-card">
      <h3>${apod.title}</h3>
      <p><strong>Date:</strong> ${apod.date}</p>

      ${createMedia(apod)}

      <p>${apod.explanation}</p>

      <button id="saveButton" type="button">Save Favourite</button>
    </article>
  `

  const $saveButton = document.getElementById('saveButton')

  $saveButton.addEventListener('click', function () {
    addFavourite(apod)
  })
}

// This saves the APOD to favourites.
function addFavourite(apod) {
  const alreadySaved = favourites.find(function (item) {
    return item.date === apod.date
  })

  if (alreadySaved) {
    showMessage('This APOD is already saved.')
    return
  }

  favourites.push(apod)
  saveFavourites()
  showFavourites()
  showMessage('APOD saved to favourites.')
}

// This shows all saved favourites on the page.
function showFavourites() {
  if (favourites.length === 0) {
    $favouritesList.innerHTML = '<p>No favourites saved yet.</p>'
    return
  }

  let html = ''

  for (const favourite of favourites) {
    html += `
      <article class="favourite-card">
        <h3>${favourite.title}</h3>
        <p><strong>Date:</strong> ${favourite.date}</p>

        ${createMedia(favourite)}

        <button class="delete-button" type="button" data-date="${favourite.date}">
          Delete
        </button>
      </article>
    `
  }

  $favouritesList.innerHTML = html
}

// This gets APOD data from the NASA API using fetch.
async function getApod(date) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('APOD not found')
  }

  const data = await response.json()
  return data
}

// This runs when the user submits the search form.
$searchForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  const selectedDate = $dateInput.value

  if (!selectedDate) {
    showMessage('Please choose a date.')
    return
  }

  if (selectedDate > today) {
    showMessage('Please choose today or a past date.')
    return
  }

  try {
    showMessage('Loading...')

    const apod = await getApod(selectedDate)

    showMessage('')
    showApod(apod)
  } catch (error) {
    showMessage('Sorry, the APOD could not be loaded.')
  }
})

// This deletes a favourite when the delete button is clicked.
$favouritesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    const date = event.target.dataset.date

    const index = favourites.findIndex(function (item) {
      return item.date === date
    })

    if (index !== -1) {
      favourites.splice(index, 1)
      saveFavourites()
      showFavourites()
      showMessage('Favourite deleted.')
    }
  }
})

// This shows saved favourites when the page first loads.
showFavourites()