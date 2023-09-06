document.addEventListener("DOMContentLoaded", async () => {
  const boton = document.getElementById("btnBuscar");
  // document.getElementById("btnBuscar").addEventListener(handleSearch);
  boton.addEventListener("click", handleSearch);

  document
    .getElementById("inputBuscar")
    .addEventListener("keyup", function (event) {
      // Verificar si la tecla presionada es "Enter" (código 13)
      if (event.keyCode === 13) {
        // Simular un clic en el botón
        boton.click();
      }
    });
});

const handleSearch = async () => {
  let text = document.getElementById("inputBuscar").value;
  let url = `https://images-api.nasa.gov/search?q=${text}`;

  const response = await fetch(url);
  const data = await response.json();

  // show info
  let card = "";
  for (const item of data.collection.items) {
    if (item.links === undefined) {
      continue;
    }

    var isoString = item.data[0].date_created;
    var dateObject = new Date(isoString);
    var humanReadable = dateObject.toLocaleString();
    // src=${item.links === undefined ? url : item.links[0].href
    card += `
      <div class="col">
        <div class="card  h-100">
          <img src="${item.links[0].href}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.data[0].title}</h5>
            <p class="card-text card-with-scroll">${item.data[0].description}</p>
          </div>
      <div class="card-footer">
      <small class="text-body-secondary">${humanReadable}</small>
      </div>
        </div>
      </div>`;
  }

  document.getElementById("insertHere").innerHTML = card;
};
