## Capstone Project - Part 4 Report

For Part 4, I created the final working version of my NASA APOD Search web application.

The app uses one HTML file, one CSS file, and one JavaScript file. The HTML file contains the main sections for Home, Favourites, and About. The CSS file is used to style the page and make it responsive for different screen sizes. The JavaScript file controls the API search, DOM updates, event listeners, and localStorage.

I used the NASA APOD API with the Fetch API to get Astronomy Picture of the Day data by date. When the user chooses a date and submits the form, JavaScript prevents the page from refreshing and fetches the APOD data. The result is then shown on the page with the title, date, image or video, and explanation.

I also added a favourites feature. Users can save an APOD to favourites, and the saved favourites are stored in localStorage. This means the favourites stay saved even after the page is refreshed. Users can also delete saved favourites.

Some challenges I faced were making the app work without page refreshes, checking future dates, displaying both images and videos, and saving favourites correctly in localStorage.

Resources used:
- NASA APOD API
- MDN Web Docs for fetch()
- MDN Web Docs for localStorage
- Course notes on JavaScript, DOM manipulation, event listeners, and localStorage