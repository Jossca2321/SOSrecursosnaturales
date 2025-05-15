
const URL = "https://api.sheetbest.com/sheets/7fb02a9b-ee29-4026-b2e3-c848b2395932";

const formulario = document.getElementById("formulario");
const listaComentarios = document.getElementById("lista-comentarios");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentarios").value;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      comentario: comentario,
      fecha: new Date().toLocaleString(),
    }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Comentario enviado ✅");
      formulario.reset();
      mostrarComentarios();
    });
});

function mostrarComentarios() {
  fetch(URL)
    .then((res) => res.json())
    .then((datos) => {
      listaComentarios.innerHTML = "";
      if (datos.length === 0) {
        listaComentarios.textContent = "No hay comentarios todavía.";
        return;
      }
      datos.reverse().forEach(({ nombre, comentario, fecha }) => {
        const div = document.createElement("div");
        div.innerHTML = `<p><strong>${nombre}</strong> <small>${fecha}</small></p><p>${comentario}</p>`;
        listaComentarios.appendChild(div);
      });
    });
}

window.onload = mostrarComentarios;
