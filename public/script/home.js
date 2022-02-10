fetch("/home", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
})
  .then((res) => {
    res.json();
    console.log(res.body);
  })
  .then((json) => {
    console.log("hello");
    console.log(json);
  });
