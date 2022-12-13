// değişiklik olsun diye eventListener'ları iki farklı şekide yazdım.
// 1) ayrı fonk. olarak, 2) inline olarak.

// objelerin sürüklenebilmesi için tag olarak draggable = "true" almaları gerekiyor
// html kodunda mevcut

let lessons = document.getElementsByClassName("lesson"); // dummy data'ları buluyor
for (let i = 0; i < lessons.length; ++i) {
    const element = lessons[i];
    element.addEventListener("dragstart", dragStartHandler); // sürükleme başlangıcı
    element.addEventListener("dragend", dragEndHandler); // sürükleme bitişi
}

var dragItem = null; // sürüklenecek element değişkeni

function dragStartHandler(){
    dragItem = this; // oluşturduğumuz değişkene tıkladığımız objeyi atıyoruz
    this.style.opacity = '0.4'; // fade ekisi oluşturmak için
}

function dragEndHandler(){
    dragItem = null; // sürüklenecek itemi temizliyoruz çünkü drag bitti
    this.style.opacity = '1'; // fade etkisini eski haline geri döndürmek için
}

let dropTargets = document.getElementsByClassName("canTakeLesson"); // data celleri buluyor

// ev, event'in kısaltması

for (let i = 0; i < dropTargets.length; ++i) {
    const target = dropTargets[i];

    // dragenter olayı üzerine bir cisim drag edildiğinde bir seferlik çalışıyor 
    target.addEventListener("dragenter", (ev) => {
        // eğer içinde child yok ise;
        if (target.hasChildNodes() === false) {
            // üzerine hover edince geldiği data cell'i belli etmek için outline çizdiriyorum
            target.style.outlineWidth = "2.5 px";
            target.style.outlineStyle = "solid";
            target.style.outlineColor = "#FF0000";
        }
    });

    // dragover ise nesnenin sınırları içerisinde sürüklenebilir bir cisim
    // olduğu müddetçe tetikleniyor 
    target.addEventListener("dragover", (ev) => {
        // eğer içinde child yok ise;
        if (target.hasChildNodes() === false) {
            ev.preventDefault(); // ekleyebilmesine izin ver
            // normalde default olarak eklemesine izin vermiyor, biz de prevent ediyoruz.
        }
    });

    target.addEventListener("dragleave", (ev) => {
        target.style.outline = "none"; // drag'den çıktığında outline temizlemesi
    });

    target.addEventListener("drop", (ev) => {
        target.appendChild(dragItem); // direkt olarak html'ine ekleme yapıyor child olarak
        ev.target.style.outline = "none"; // outline temizlemesi
    })
    
}
