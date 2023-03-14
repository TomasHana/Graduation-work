function data() {
  var jmeno = document.forms["form"]["inp"].value;
  if (jmeno == "") {
    alert("Není zadáno jméno");
    return false;
  } else alert("Vítejte  " + jmeno);
}

// zobrazení
function zobrazv() {
  document.getElementById("divvklad").style.display = "block";
}
function zobrazvy() {
  document.getElementById("divvyber").style.display = "block";
}
function nplatba() {
  document.getElementById("divplatba").style.display = "block";
}
function tplatba() {
  document.getElementById("divtplatba").style.display = "block";
}
function info() {
  document.getElementById("info").style.display = "block";
  document.getElementById("MyChart").style.display = "none";
  document.getElementById("platba").style.display = "none";
  document.getElementById("objednavka").style.display = "none";
}
function grafy() {
  document.getElementById("info").style.display = "none";
  document.getElementById("platba").style.display = "none";
  document.getElementById("MyChart").style.display = "block";
  document.getElementById("objednavka").style.display = "none";
}
function platby() {
  document.getElementById("info").style.display = "none";
  document.getElementById("MyChart").style.display = "none";
  document.getElementById("platba").style.display = "block";
  document.getElementById("objednavka").style.display = "none";
}
function objednavka() {
  document.getElementById("info").style.display = "none";
  document.getElementById("MyChart").style.display = "none";
  document.getElementById("platba").style.display = "none";
  document.getElementById("objednavka").style.display = "block";
}

var ucet = {
  castka: 10000,
  cislouctu: 111,
  prichozi: 0,
  odchozí: 0
};
var zapis = ["<b>Výpis účtu číslo: 111</b>"];
// info o účtu
var banky = ["Česká spořitelna", "Komerční Banka", "Air Bank", " Moneta"];
document.getElementById("cislouctu").innerHTML = ucet.cislouctu;
document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
i = Math.floor(Math.random() * 4);
jmeno = document.getElementsByTagName("inp").value;
document.getElementById("nb").innerHTML = banky[i];
jmeno = document.getElementsByTagName("inp").value;
var ulr = location.search.substring(5);
document.getElementById("juctu").innerHTML = ulr;

//vklad
function vklad() {
  var x = document.getElementById("vklad").value;
  ucet.castka += parseInt(x);
  ucet.prichozi += parseInt(x);
  document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
  document.getElementById("vklad").value = "";
  document.getElementById("divvklad").style.display = "none";
  z = "Vloženo +" + x + " Kč";
  zapis.push(z);
  SF.data.datasets[0].data[2] = ucet.castka;
  SF.data.datasets[0].data[0] = ucet.prichozi;
  SF.update();
}

//výběr
function vyber() {
  var x = document.getElementById("vyber").value;
  ucet.castka -= parseInt(x);
  ucet.odchozí += parseInt(x);
  document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
  document.getElementById("vyber").value = "";
  document.getElementById("divvyber").style.display = "none";
  z = "Vybráno -" + x + " Kč";
  zapis.push(z);
  SF.data.datasets[0].data[2] = ucet.castka;
  SF.data.datasets[0].data[1] = ucet.odchozí;
  SF.update();
}
//jednorázová platba
function novaplatba() {
  var x = document.getElementById("novaplatba").value;
  var y = document.getElementById("ucetprijemce").value;
  ucet.castka -= parseInt(x);
  ucet.odchozí += parseInt(x);
  document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
  document.getElementById("ucetprijemce").value = "";
  document.getElementById("novaplatba").value = "";
  document.getElementById("divplatba").style.display = "none";
  z = "Odesláno -" + x + " Kč" + " na účet číslo: " + y;
  zapis.push(z);
  SF.data.datasets[0].data[2] = ucet.castka;
  SF.data.datasets[0].data[1] = ucet.odchozí;
  SF.update();
}
//trvalý příkaz
function trvalyprikaz() {
  var x = document.getElementById("tplatba").value;
  var y = document.getElementById("ucetprijemce1").value;
  var d = document.getElementById("datum").value;
  ucet.castka -= parseInt(x);
  ucet.odchozí += parseInt(x);
  document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
  document.getElementById("ucetprijemce1").value = "";
  document.getElementById("tplatba").value = "";
  document.getElementById("divtplatba").style.display = "none";
  z =
    "Vytvořen trvalý příkaz: -" +
    x +
    " Kč" +
    " na účet číslo: " +
    y +
    " První platba proběhne:  " +
    d;
  zapis.push(z);
  SF.data.datasets[0].data[2] = ucet.castka;
  SF.data.datasets[0].data[1] = ucet.odchozí;
  SF.update();
}
// mzda
window.onload = cas();
function cas() {
  mojemzda = setInterval(mzda, 100000);
}
function mzda() {
  plat = 25000;
  ucet.castka += plat;
  document.getElementById("castkanau").innerHTML = ucet.castka + " Kč";
  z = "Příchozí mzda: " + plat + " Kč";
  zapis.push(z);
  SF.data.datasets[0].data[2] = ucet.castka;
  SF.update();
}
//výpis
function vypis() {
  if (zapis.length == 1) {
    alert("Žádná aktivita");
  } else newwindow = window.open("", "", "width=500, height=400");
  newwindow.document.write(zapis.join("<br>"));
}
// grafy
let graf = document.getElementById("MyChart").getContext("2d");
let SF = new Chart(graf, {
  type: "doughnut",
  data: {
    labels: ["Příchozí", "Odchozí", "Zůstatek"],
    datasets: [
      {
        label: "Můj účet",
        data: [ucet.prichozi, ucet.odchozí, ucet.castka],
        backgroundColor: ["green", "red", "blue"]
      }
    ]
  },
  options: {}
});
function potvrzeni() {
  var jmenoobj = document.forms["objednavkovyform"]["objjmeno"].value;
  var prijmeniobj = document.forms["objednavkovyform"]["objprijmeni"].value;
  var emailobj = document.forms["objednavkovyform"]["objemail"].value;

  alert(
    "Objednávka byla dokončena na jméno: " +
      jmenoobj +
      " " +
      prijmeniobj +
      ". " +
      "Odkaz ke stažení a přístupový kód bude zaslán na emailovou adresu: " +
      emailobj
  );
  document.forms["objednavkovyform"]["objjmeno"].value = "";
  document.forms["objednavkovyform"]["objprijmeni"].value = "";
  document.forms["objednavkovyform"]["objemail"].value = "";
  return false;
}
