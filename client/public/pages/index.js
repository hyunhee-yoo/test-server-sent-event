window.onload = function () {
  const evtSource = new EventSource("http://localhost:4000/subscribe");

  evtSource.onmessage = function (event) {
    const eventProgress = document.getElementById("progress");
    eventProgress.value = event.data;
  };

  evtSource.onopen = function () {
    console.log("connected to source");
  };

  setTimeout(() => {
    fetch("http://localhost:4000/test");
  }, 3000);
};
