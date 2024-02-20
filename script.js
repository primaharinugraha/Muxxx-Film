// $(document).ready(function () {
//     // Menangani acara pengiriman formulir untuk pencarian
//     $('form').on('submit', function (event) {
//       // Mencegah pengiriman formulir secara default
//       event.preventDefault();
  
//       // Melakukan permintaan AJAX untuk pencarian film
//       $.ajax({
//         url:
//           'http://www.omdbapi.com/?apikey=6f99192e&s=' +
//           $('.input-keyword').val(),
//         success: function (results) {
//           const movies = results.Search;
//           let cards = '';
//           movies.forEach((m) => {
//             cards += ShowCards(m);
//           });
  
//           // Mengisi movie-container dengan kartu-kartu hasil pencarian
//           $('.movie-container').html(cards);
//         },
//         error: function (e) {
//           console.log(e.responseText);
//         },
//       });
//     });
  
//     // Menggunakan delegasi acara untuk tombol modal-detail-button
//     $('.movie-container').on('click', '.modal-detail-button', function () {
//       // Melakukan permintaan AJAX untuk mendapatkan detail film
//       $.ajax({
//         url:
//           'http://www.omdbapi.com/?apikey=6f99192e&i=' +
//           $(this).data('imdbid'),
//         success: function (m) {
//           const MovieDetail = ShowMovieDetails(m);
  
//           // Mengisi modal-body dengan detail film
//           $('.modal-body').html(MovieDetail);
//         },
//         error: function (e) {
//           console.log(e.responseText);
//         },
//       });
//     });
//   });


// menggunakan fetch

document.addEventListener('DOMContentLoaded', function () {
  // Menangani acara pengiriman formulir untuk pencarian
  document.querySelector('form').addEventListener('submit', function (event) {
    // Mencegah pengiriman formulir secara default
    event.preventDefault();

    // Melakukan permintaan Fetch untuk pencarian film
    fetch('http://www.omdbapi.com/?apikey=6f99192e&s=' + encodeURIComponent(document.querySelector('.input-keyword').value))
      .then(response => response.json()) // Mengonversi respons ke format JSON
      .then(results => {
        const movies = results.Search;
        let cards = '';
        movies.forEach(m => {
          cards += ShowCards(m); // Membuat kartu untuk setiap film
        });

        // Mengisi movie-container dengan kartu-kartu hasil pencarian
        document.querySelector('.movie-container').innerHTML = cards;
      })
      .catch(error => {
    
        alert(error); // Menangani kesalahan jika permintaan gagal
      });
  });

  // Menggunakan delegasi acara untuk tombol modal-detail-button
  document.querySelector('.movie-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('modal-detail-button')) {
      // Melakukan permintaan Fetch untuk mendapatkan detail film
      fetch('http://www.omdbapi.com/?apikey=6f99192e&i=' + event.target.dataset.imdbid)
        .then(response => response.json()) // Mengonversi respons ke format JSON
        .then(m => {
          const movieDetail = ShowMovieDetails(m); // Membuat detail film
          
          // Mengisi modal-body dengan detail film
          document.querySelector('.modal-body').innerHTML = movieDetail;
        })
        .catch(error => {
          alert(error); // Menangani kesalahan jika permintaan gagal
        });
    }
  });
});




function ShowCards(m) {
    return `<div class="col-md-4 my-5">
    <div class="card">
      <img src="${m.Poster}" class="card-img-top" alt=""/>
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#MovieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}


function ShowMovieDetails(m) {
    return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item">
            <strong>Director : </strong>${m.Director}
          </li>
          <li class="list-group-item">
            <strong>Actors : </strong>${m.Actors}
          </li>
          <li class="list-group-item">
            <strong>Writer : </strong>${m.Writer}
          </li>
          <li class="list-group-item">
            <strong>Genre : </strong>${m.Genre}
          </li>
          <li class="list-group-item">
            <strong>Plot : </strong><br />
            ${m.Plot}
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}