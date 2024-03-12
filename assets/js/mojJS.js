var nekretnine, gradovi, drzave, kategorije, tipProdaje;
window.onload = function(){



    ajaxCallbackFunkcija("meni", ispisNavMenija);
    ajaxCallbackFunkcija("ikonice", kreirajIkonice);
    ajaxCallbackFunkcija("agenti", kreirajAgente);

    //Dohvatanje kategorije.json
    $.ajax({
        url: "assets/data/kategorije.json",
        method : "GET",
        dataType : "json",
        success: function(data){
            kreirajPadajucuListu(data, "ddlKategorije", "listaKategorija", "Property Type");
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

    //Dohvatanje drzave.json
    $.ajax({
        url: "assets/data/drzave.json",
        method : "GET",
        dataType : "json",
        success: function(data){
            kreirajPadajucuListu(data, "ddlDrzave", "listaDrzava", "Country");
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

    $.ajax({
        url: "assets/data/teme.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            kreirajPadajucuListu(data, "ddlTeme", "bkTeme", "Subject");
        },
        error: function(xhr){
            console.log(xhr);
        }
    });

    // //Dohvatanje nekretnine.json
    // $.ajax({
    //     url: "assets/data/drzave.json",
    //     method : "GET",
    //     dataType : "json",
    //     success: function(data){
    //         ispisNekretnina(data);
    //     },
    //     error: function(xhr){
    //         console.log(xhr);
    //     }
    // });

    // //Dohvatanje tipProdaje.json
    // $.ajax({
    //     url: "assets/data/tipProdaje.json",
    //     method : "GET",
    //     dataType : "json",
    //     success: function(data){
    //         console.log(data);
    //     },
    //     error: function(xhr){
    //         console.log(xhr);
    //     }
    // });

    // //Dohvatanje gradovi.json
    // $.ajax({
    //     url: "assets/data/gradovi.json",
    //     method : "GET",
    //     dataType : "json",
    //     success: function(data){
    //         console.log(data);
    //     },
    //     error: function(xhr){
    //         console.log(xhr);
    //     }
    // });
    
    
    $("#ddlGradovi").attr("disabled", "disabled");
    
};

function ajaxCallbackFunkcija(nazivFajla, callbackFunkcija){
    $.ajax({
        url: "assets/data/" + nazivFajla + ".json",
        method : "GET",
        dataType : "json",
        success: function(data){
            callbackFunkcija(data);
        },
        error: function(xhr){
            console.log(xhr);
        }
    });
}

function kreirajAgente(agenti){
    let ispis = `<div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                    <h1 class="mb-3">Property Agents</h1>
                    <p>Our agents are extremly qualified and offer the best help on the market.</p>
                </div>
                <div class="row g-4">`;
                agenti.forEach(el =>
                    ispis+= `<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="${el.delay}">
                                <div class="team-item rounded overflow-hidden">
                                    <div class="position-relative">
                                        <img class="img-fluid" src="${el.slika}" alt="${el.ime}"/>
                                        <div class="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                                            <a class="btn btn-square mx-1" href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a>
                                            <a class="btn btn-square mx-1" href="https://www.twitter.com"><i class="fab fa-twitter"></i></a>
                                            <a class="btn btn-square mx-1" href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                    <div class="text-center p-4 mt-3">
                                        <h5 class="fw-bold mb-0">${el.ime}</h5>
                                        <small>${el.struka}</small>
                                    </div>
                                </div>
                            </div>`);
    ispis+= `</div>`;

    $("#agents").html(ispis);
}

function ispisNavMenija(nizLinkova){
    let ispis = "";

    for(link of nizLinkova){
        if(window.location.pathname == "/" + link.url){
            ispis+= `<li><a href="${link.url}" class="nav-item nav-link active">${link.text}</a></li>`;
        }else{
            ispis+= `<li><a href="${link.url}" class="nav-item nav-link">${link.text}</a></li>`;
        }      
    }

    $("#navMenu").html(ispis);
}

function kreirajPadajucuListu(podaci, idListe, idBloka, nultaOpcija){
    let ispis = `<select class = "form-select border-0 py-3" id = '${idListe}'>
                    <option value = "0">${nultaOpcija}</option>`;
                    for(let podatak of podaci){
                        ispis += `<option value = "${podatak.id}">${podatak.ime}</option>`;
                    }
    ispis += `</select>`;
    $("#"+idBloka).html(ispis);
};

function kreirajIkonice(ikonice){
    let ispis = `<div class="container">
                    <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                        <h1 class="mb-3">Property Types</h1>
                        <p>Select which property type you would like to browse</p>
                    </div>
                 <div class="row g-4">`;
                 for(let ikonica of ikonice){
                    ispis+= `<div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="${ikonica.delay}s">
                                <a class="cat-item d-block bg-light text-center rounded p-3" href="property.html">
                                    <div class="rounded p-4">
                                        <div class="icon mb-3">
                                            <img class="img-fluid" src="${ikonica.slika.src}" alt="${ikonica.slika.alt}">
                                        </div>
                                        <h6>${ikonica.ime}</h6>
                                        <span>${ikonica.opis}</span>
                                    </div>
                                </a>
                            </div>`
                 };
    ispis += `</div></div>`;
    $("#vrsteNekretnina").html(ispis);
};

function ispisNekretnina(nizNekretnina){
    let ispis = "";
    if(nizNekretnina.length == 0){
        ispis+= `<div class = "col-lg-12">
            <p>No matches found.</p>
        </div>`;
    }else{
        for(nekretnina of nizNekretnina){
            ispis+=`<div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="property-item rounded overflow-hidden">
                            <div class="position-relative overflow-hidden">
                                <a href=""><img class="img-fluid" src="${nekretnina.slika.src}" alt="${nekretnina.slika.alt}"></a>
                                <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${ispisiPodatkaONekretnini(nekretnina.tipProdaje, tipProdaje)}</div>
                                <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${ispisiPodatkaONekretnini(nekretnina.kategorijaObjekta, kategorije)}</div>
                            </div>
                            <div class="p-4 pb-0">
                                <h5 class="text-primary mb-3">$${nekretnina.cena.stara}</h5>
                                <a class="d-block h5 mb-2" href="">${nekretnina.naziv}</a>
                                <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${nekretnina.lokacija.ulica}, ${ispisiPodatkaONekretnini(nekretnina.lokacija.grad, gradovi)}, ${ispisiPodatkaONekretnini(nekretnina.lokacija.drzava, drzave)}</p>
                            </div>
                            <div class="d-flex border-top">
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${nekretnina.osobine.velicinaObjekta} m&sup2;</small>
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>${proveraJednine(nekretnina.osobine.brojKreveta, "Bed")}</small>
                                <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>${proveraJednine(nekretnina.osobine.brojKupatila, "Bathroom")}</small>
                            </div>
                        </div>
                    </div>`;
        };    
    }
    $("#properties").html(ispis);
};

function ispisiPodatkaONekretnini(id, nizPodataka){
    let podatak = "";
    for(let objekat of nizPodataka){
        if (id == objekat.id){
            podatak+= objekat.ime;
        }
    }
    return podatak;
};

function proveraJednine(broj, rec){
    let ispis = ""
    if(broj == 1){
        ispis+= broj + " " + rec;
    }else{
        ispis+= broj + " " + rec + "s";
    }
    return ispis;
};

function filtriranjeNekretnina(vrednost, tip, poruka){
    let filtriraneNekretnine = [];

     if(tip == "grad"){
         filtriraneNekretnine = nekretnine.filter(el => el.lokacija.grad == vrednost);
     }
    
     if(tip == "kategorija"){
         filtriraneNekretnine = nekretnine.filter(el => el.kategorijaObjekta == vrednost);
     }

     if(tip == "drzava"){
         filtriraneNekretnine = nekretnine.filter(el => el.lokacija.drzava == vrednost);
     }

    if(filtriraneNekretnine.length != 0){     
        ispisNekretnina(filtriraneNekretnine);
    }else{
        let ispis = `<p class = "alert-danger alert text-center">No properties in this ${poruka}.</p>`;
        $("#properties").html(ispis);
    }
};

function ispisCenaNekretnina(nizNekretnina){

    // for(let objekat of nizNekretnina){
    //     let cenaNekretnina = objekat.cena.stara;
    //     console.log(cenaNekretnina);
    // }
}
ispisCenaNekretnina(nekretnine);

//FILTRIRANJE PO KATEGORIJI
$(document).on("change", "#ddlKategorije", function(){
    let vrednostPoljaZaKategoriju = $("#ddlKategorije").val();

    filtriranjeNekretnina(vrednostPoljaZaKategoriju, "kategorija", "category");

    if(vrednostPoljaZaKategoriju == 0){
        ispisNekretnina(nekretnine);
    }   
});

//FILTRIRANJE PO DRZAVI
$(document).on("change", "#ddlDrzave", function(){


    let vrednostPoljaZaDrzavu = $("#ddlDrzave").val();

    //Ispis gradova u odnosu na izabranu drzavu
    let filtriraniGradovi = [];
    filtriraniGradovi = gradovi.filter(el => el.idDrzave == vrednostPoljaZaDrzavu);
    kreirajPadajucuListu(filtriraniGradovi, "ddlGradovi", "listaGradova", "City");

    filtriranjeNekretnina(vrednostPoljaZaDrzavu, "drzava", "country");

    //Enable i Disable gradova u zavisnosti od vrednosti drzave
    if(vrednostPoljaZaDrzavu == 0){
        $("#ddlGradovi").attr("disabled", "disabled");
        $("#ddlGradovi").val(0);      
    }else{
        $("#ddlGradovi").attr("disabled", false);
    };
    
    if(vrednostPoljaZaDrzavu == 0){
        ispisNekretnina(nekretnine);
    }
});

//FILTRIRANJE PO GRADU
$(document).on("change", "#ddlGradovi", function(){
    let vrednostPoljaZaGrad = $("#ddlGradovi").val();

    filtriranjeNekretnina(vrednostPoljaZaGrad, "grad", "city");

    if(vrednostPoljaZaGrad == 0){
        ispisNekretnina(nekretnine);
    }
});

//SORTIRANJE
$(document).on("mouseover", "#sortiranje", function (){

    //Sortiranje od manje ka vecoj ceni
    if($("#sortiranje").on("click", "#sortLowestPrice", function(){
        nekretnine.sort(function(a,b){
            return a.cena.stara - b.cena.stara;
        });
        ispisNekretnina(nekretnine);
    }));

    //Sortiranje od vece ka manjoj ceni
    if($("#sortiranje").on("click", "#sortHighestPrice", function(){
        nekretnine.sort(function(a,b){
           return b.cena.stara - a.cena.stara;
        }); 
        ispisNekretnina(nekretnine);  
    }));

    //Sortiranje od najvece ka najmanjoj velicini
    if($("#sortiranje").on("click", "#sortBiggestSize", function(){
        nekretnine.sort(function(a,b){
            return b.osobine.velicinaObjekta - a.osobine.velicinaObjekta;
        }); 
        ispisNekretnina(nekretnine);
    }));

    //Sortiranje po imenu u opadajucem redosledu
    if($("#sortiranje").on("click", "#sortNameDesc", function(){
        nekretnine.sort(function(a,b){
            if(a.naziv < b.naziv){
                return -1;
            }
            if(a.naziv == b.naziv){
                return 0;
            }
            if(a.naziv > b.naziv){
                return 1;
            }     
        }); 
        ispisNekretnina(nekretnine);
    }));
});

//PROVERA FORME
$("#bkForma").on("submit", function(e){
    e.preventDefault();
    obradaForme();
})

var brojGresaka

function obradaForme(){
    regexName = /^[A-Z][a-z]{2,19}(\s[A-Z][a-z]{2,19}){0,3}$/;
    regexEmail = /^[_a-z0-9]+((\.)[_a-z0-9]+){0,2}@(gmail.com|yahoo.com|hotmail.com)$/;
    regexPoruka = /^[A-z0-9\,\?\!\.\s]{3,255}$/;
    brojGresaka = 0;

    poljeName = document.querySelector("#bkIme");
    poljeEmail = document.querySelector("#bkEmail");
    poljePoruka = document.querySelector("#bkPoruka");
    nizPol = document.getElementsByName("bkRadio");
    elementDDLTeme = document.getElementById("ddlTeme");
    

    proveraIzraza(regexName, poljeName, "Name is incorrect, example: John Smith.");
    proveraIzraza(regexEmail, poljeEmail, "Email is not in a correct format, example: example@gmail.com");
    proveraIzraza(regexPoruka, poljePoruka, "Message not allowed.");

    if(elementDDLTeme.selectedIndex == 0){
        elementDDLTeme.parentElement.nextElementSibling.classList.remove("bkHideElement");
        elementDDLTeme.parentElement.nextElementSibling.textContent = "You must select a subject.";
        elementDDLTeme.parentElement.classList.add("bkRedBorder");
        elementDDLTeme.parentElement.classList.remove("border");
        brojGresaka++;     
    }
    else{
        elementDDLTeme.parentElement.nextElementSibling.classList.add("bkHideElement");
        elementDDLTeme.parentElement.nextElementSibling.textContent = "";
        elementDDLTeme.parentElement.classList.remove("bkRedBorder");
        elementDDLTeme.parentElement.classList.add("border");
    };

    let polVrednost = "";

    for(let i = 0; i < nizPol.length; i++){
        if(nizPol[i].checked){
            polVrednost = nizPol[i].value;
            break;          
        }
    };
    proveraCekiranihElemenata(polVrednost, nizPol, "You must choose your sex.");

    if(brojGresaka != 0){
        return false;
    };

    if(brojGresaka == 0){
        poljePoruka.nextElementSibling.nextElementSibling.classList.remove("bkHideElement", "alert", "alert-danger");
        poljePoruka.nextElementSibling.nextElementSibling.innerHTML = "Form submission is successful.";
        poljePoruka.nextElementSibling.nextElementSibling.classList.add("success", "alert-success");
        return true;
    };
};

function proveraIzraza(regIzraz, vrednost, poruka){
    if(!regIzraz.test(vrednost.value)){
        vrednost.nextElementSibling.nextElementSibling.classList.remove("bkHideElement");
        vrednost.nextElementSibling.nextElementSibling.innerHTML = poruka;
        vrednost.classList.add("bkRedBorder");
        brojGresaka++;
    }
    else{
        vrednost.nextElementSibling.nextElementSibling.classList.add("bkHideElement");
        vrednost.nextElementSibling.nextElementSibling.innerHTML = "";
        vrednost.classList.remove("bkRedBorder");
    };
};

function proveraCekiranihElemenata(vrednostCekiranihElemenata, niz, poruka){
    if(vrednostCekiranihElemenata == ""){
        niz[0].parentElement.parentElement.nextElementSibling.firstElementChild.classList.remove("bkHideElement");
        niz[0].parentElement.parentElement.nextElementSibling.firstElementChild.innerHTML = poruka;
        niz[0].parentElement.parentElement.classList.add("bkRedBorder");
        brojGresaka++;
    }
    else{
        niz[0].parentElement.parentElement.nextElementSibling.firstElementChild.classList.add("bkHideElement");
        niz[0].parentElement.parentElement.nextElementSibling.firstElementChild.innerHTML = "";
        niz[0].parentElement.parentElement.classList.remove("bkRedBorder");
    };
};
