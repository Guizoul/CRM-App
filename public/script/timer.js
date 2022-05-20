document.addEventListener("DOMContentLoaded", () =>
  requestAnimationFrame(updateTime)
);

function updateTime() {
  let moroccodate = new Date().toLocaleString("en-US", {
    weekday: "short",
    // month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Casablanca",
  });

  let day = moroccodate.split(" ")[0];
  let hours = moroccodate.split(" ")[1].split(":")[0];
  let minute = moroccodate.split(" ")[1].split(":")[1];

  document.documentElement.style.setProperty("--timer-day", "'" + day + "'");
  document.documentElement.style.setProperty(
    "--timer-hours",
    "'" + hours + "'"
  );
  document.documentElement.style.setProperty(
    "--timer-minutes",
    "'" + minute + "'"
  );

  requestAnimationFrame(updateTime);
}
