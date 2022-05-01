export function setPlanning(data, emploiVacations) {
  console.log(data.planning);
  for (let i = 0; i < data.planning.length; i++) {
    let jour = data.planning[i].jour;
    let debut = data.planning[i].debut;
    let nameEmp =
      data.planning[i].nommatiere +
      "(" +
      data.planning[i].nom +
      data.planning[i].niveau +
      ")";

    if (jour == "monday") {
      if (debut == "14:00:00") {
        console.log("changing");
        emploiVacations.mondayv1a.innerHTML = nameEmp;
        emploiVacations.mondayv1a.classList.add("blue");
        emploiVacations.mondayv2a.innerHTML = nameEmp;
        emploiVacations.mondayv2a.classList.add("blue");
      } else if (data.planning[i].debut == "09:00:00") {
        emploiVacations.mondayv1m.classList.add("navy");
        emploiVacations.mondayv1m.innerHTML = nameEmp;
        emploiVacations.mondayv2m.classList.add("navy");
        emploiVacations.mondayv2m.innerHTML = nameEmp;
      }
    }
    if (jour == "tuesday") {
      if (debut == "14:00:00") {
        console.log("changing");
        emploiVacations.tuesdayv1a.innerHTML = nameEmp;
        emploiVacations.tuesdayv1a.classList.add("blue");
        emploiVacations.tuesdayv2a.innerHTML = nameEmp;
        emploiVacations.tuesdayv2a.classList.add("blue");
      } else if (data.planning[i].debut == "09:00:00") {
        emploiVacations.tuesdayv1m.classList.add("navy");
        emploiVacations.tuesdayv1m.innerHTML = nameEmp;
        emploiVacations.tuesdayv2m.classList.add("navy");
        emploiVacations.tuesdayv2m.innerHTML = nameEmp;
      }
    }
    if (jour == "wednsday") {
      if (debut == "14:00:00") {
        console.log("changing");
        emploiVacations.wednsdayv1a.innerHTML = nameEmp;
        emploiVacations.wednsdayv1a.classList.add("blue");
        emploiVacations.wednsdayv2a.innerHTML = nameEmp;
        emploiVacations.wednsdayv2a.classList.add("blue");
      } else if (data.planning[i].debut == "09:00:00") {
        emploiVacations.wednsdayv1m.classList.add("navy");
        emploiVacations.wednsdayv1m.innerHTML = nameEmp;
        emploiVacations.wednsdayv2m.classList.add("navy");
        emploiVacations.wednsdayv2m.innerHTML = nameEmp;
      }
    }
    if (jour == "thursday") {
      if (debut == "14:00:00") {
        console.log("changing");
        emploiVacations.thursdayv1a.innerHTML = nameEmp;
        emploiVacations.thursdayv1a.classList.add("blue");
        emploiVacations.thursdayv2a.innerHTML = nameEmp;
        emploiVacations.thursdayv2a.classList.add("blue");
      } else if (data.planning[i].debut == "09:00:00") {
        console.log("djfdnfkd");
        emploiVacations.thursdayv1m.innerHTML = nameEmp;
        emploiVacations.thursdayv1m.classList.add("navy");
        emploiVacations.thursdayv2m.innerHTML = nameEmp;
        emploiVacations.thursdayv2m.classList.add("navy");
      }
    }
    if (jour == "friday") {
      if (debut == "14:00:00") {
        console.log("changing");
        emploiVacations.fridaydayv1a.innerHTML = nameEmp;
        emploiVacations.fridaydayv1a.classList.add("blue");
        emploiVacations.fridaydayv2a.innerHTML = nameEmp;
        emploiVacations.fridaydayv2a.classList.add("blue");
      } else if (data.planning[i].debut == "09:00:00") {
        emploiVacations.fridayv1m.classList.add("navy");
        emploiVacations.fridayv1m.innerHTML = nameEmp;
        emploiVacations.fridayv2m.classList.add("navy");
        emploiVacations.fridayv2m.innerHTML = nameEmp;
      }
    }
  }
}

export function createmploi() {
  const emploi = document.querySelector(".emploi");
  emploi.innerHTML += `<table  cellpadding="0" cellspacing="0">
<tr class="days">
  <th></th>
  <th>Monday</th>
  <th>Tuesday</th>
  <th>Wednesday</th>
  <th>Thursday</th>
  <th>Friday</th>
</tr>
<tr>
  <td class="time">9.00 - 10:30</td>
  <td
    class="mondayv1m"
    data-tooltip=""> 
  </td>
  <td class="cs335 tuesdayv1m" data-tooltip=""></td>
  <td class="cs335 wednsdayv1m" data-tooltip=""></td>
  <td class="cs335 thursdayv1m"data-tooltip=""></td>
  <td class="cs335 fridayv1m"data-tooltip=""></td>
</tr>
  <td class="time">11.00 - 12:30</td>
  <td
  class="mondayv2m"
  data-tooltip=""> 
</td>
<td class="cs335 tuesdayv2m" data-tooltip=""></td>
<td class="cs335 wednsdayv2m" data-tooltip=""></td>
<td class="cs335 thursdayv2m" data-tooltip=""></td>
<td class="cs335 fridayv2m" data-tooltip=""></td>
</tr>

<tr>
  <td class="time">14.00 - 15:30</td>
  <td class="cs335 mondayv1a" data-tooltip=""> </td>
  <td class="cs335 tuesdayv1a" data-tooltip=""></td>
  <td class="cs335 wednsdayv1a" data-tooltip=""></td>
  <td class="cs335 thursdayv1a" data-tooltip=""></td>
  <td class="cs335 fridayv1a" data-tooltip=""></td>
</tr>

<tr>
  <td class="time">16.00 - 17:30</td>
  <td
  class="cs335 mondayv2a"
  data-tooltip="">
</td>
<td class="cs335 tuesdayv2a" data-tooltip=""></td>
<td class="cs335 wednsdayv2a" data-tooltip=""></td>
<td class="cs335 thursdayv2a" data-tooltip=""></td>
<td class="cs335 fridayv2a" data-tooltip=""></td>
</tr>
</table>`;
}
