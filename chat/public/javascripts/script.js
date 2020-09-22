const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data
    .map((item) => `<p><em>${item.author}:</em> ${item.messages}</p>`)
    .join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const author = document.getElementById("author");

  const msg = {
    messages: message.value,
    author: author.value,
  };

  const conf = {
    method: "POST",
    body: JSON.stringify(msg),
    headers: { "Content-type": "application/json" },
  };

  fetch("http://localhost:3000/chat/api/messages/", conf)
    .then((result) => {
      if (result.ok) {
        ws.send(msg);
        message.value = "";
        console.log(result);
      } else {
        const err = validarMsg(msg.author, msg.messages);
        alert(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

function validarMsg(author, msg) {
  var resp = "";
  console.log(author.toString().split(" "));
  if (author == "" || author == " ") {
    resp = 'The camp "From" must not be in blanc.\n';
  } else if (author.split(" ").length != 2) {
    resp += 'The camp "From" Must be Name and Lastname separated by space.\n';
  }
  if (msg == "" || msg == " ") {
    resp += 'The camp "Content" must not be in blanc.\n';
  } else if (msg.length <= 5) {
    resp += "The message musth have five characters";
  }
  return resp;
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);