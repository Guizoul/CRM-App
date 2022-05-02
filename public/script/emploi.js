const frontEmploi = (v1a, v2a, v1m, v2m, debut, nameEmp) => {
  if (debut == "14:00:00") {
    v1a.innerHTML = nameEmp;
    v1a.classList.add("blue");
    v2a.innerHTML = nameEmp;
    v2a.classList.add("blue");
  } else if (debut == "09:00:00") {
    v1m.classList.add("navy");
    v1m.innerHTML = nameEmp;
    v2m.classList.add("navy");
    v2m.innerHTML = nameEmp;
  }
};

export function setPlanning(data, emploiVacations) {
  for (let i = 0; i < data.planning.length; i++) {
    let jour = data.planning[i].jour;
    console.log(jour);
    let debut = data.planning[i].debut;
    let nameEmp =
      data.planning[i].nommatiere +
      " ( " +
      data.planning[i].nom +
      data.planning[i].niveau +
      " )" +
      " a " +
      data.planning[i].idsalle;

    switch (jour) {
      case "monday": {
        frontEmploi(
          emploiVacations.mondayv1a,
          emploiVacations.mondayv2a,
          emploiVacations.mondayv1m,
          emploiVacations.mondayv2m,
          debut,
          nameEmp
        );
        break;
      }
      case "tuesday": {
        frontEmploi(
          emploiVacations.tuesdayv1a,
          emploiVacations.tuesdayv2a,
          emploiVacations.tuesdayv1m,
          emploiVacations.tuesdayv2m,
          debut,
          nameEmp
        );
        break;
      }
      case "wednsday": {
        frontEmploi(
          emploiVacations.wednsdayv1a,
          emploiVacations.wednsdayv2a,
          emploiVacations.wednsdayv1m,
          emploiVacations.wednsdayv2m,
          debut,
          nameEmp
        );
        break;
      }
      case "thursday": {
        frontEmploi(
          emploiVacations.thursdayv1a,
          emploiVacations.thursdayv2a,
          emploiVacations.thursdayv1m,
          emploiVacations.thursdayv2m,
          debut,
          nameEmp
        );
        break;
      }
      case "friday": {
        frontEmploi(
          emploiVacations.fridayv1a,
          emploiVacations.fridayv2a,
          emploiVacations.fridayv1m,
          emploiVacations.fridayv2m,
          debut,
          nameEmp
        );
        break;
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
  <td class="cs335 emploiVacations." data-tooltip=""> </td>
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
