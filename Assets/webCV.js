window.onload = function () {
  //Chuẩn bị
  var skillvalue = document.querySelectorAll(".skil-input");
  var sitemA = document.querySelectorAll(".skill-place-name-item");
  var gein = document.querySelectorAll(".info-editable");
  var Progressbar = document.querySelectorAll(".progress-bar");
  var expheadinglist = document.querySelectorAll(".exp-item-heading");
  var exptextlist = document.querySelectorAll(".exp-des-text");
  var edhlist = document.querySelectorAll(".edu-item-heading");
  var edtlist = document.querySelectorAll(".edu-des-text");
  var ind = document.querySelectorAll(".intern-des");
  function skillpre() {
    skillvalue = document.querySelectorAll(".skil-input");
    expheadinglist = document.querySelectorAll(".exp-item-heading");
    exptextlist = document.querySelectorAll(".exp-des-text");
    edhlist = document.querySelectorAll(".edu-item-heading");
    edtlist = document.querySelectorAll(".edu-des-text");
    ind = document.querySelectorAll(".intern-des");
    for (i = 1; i < skillvalue.length + 1; i++) {
      window.localStorage.setItem(`spn-${i - 1}`, `Skill-${i}`);
    }
    window.localStorage.setItem("magein", "Tên của bạn");
    window.localStorage.setItem("mageip", "Vị Trí chính của bạn");
    for (i = 0; i < expheadinglist.length; i++) {
      window.localStorage.setItem(`exh${i}`, `Nơi làm việc`);
    }
    for (i = 0; i < exptextlist.length; i++) {
      window.localStorage.setItem(
        `ext${i}`,
        "Giới thiệu khái quát nơi làm việc"
      );
    }
    for (i = 0; i < edhlist.length; i++) {
      window.localStorage.setItem(`edh${i}`, "Nơi học tập");
    }
    for (i = 0; i < edtlist.length; i++) {
      window.localStorage.setItem(`edt${i}`, "Mô tả khái quát");
    }
    for (i = 0; i < ind.length; i++) {
      window.localStorage.setItem(
        `ind${i}`,
        `Giới thiệu khái quát về nơi thực tập`
      );
    }
  }
  function firstload() {
    if (window.localStorage.length == 0) {
      skillpre();
      location.reload();
    }
  }
  firstload();
  //Upload ảnh
  const fileUpload = document.querySelector("#upload-photo");
  var updateimage = "";
  if (window.localStorage.getItem("Avaimg")) {
    var imgdata = window.localStorage.getItem("Avaimg");
    document.querySelector(".avatar-img").src = `${imgdata}`;
  }
  fileUpload.addEventListener("change", (event) => {
    // Lấy thông tin tập tin được đăng tải
    const files = event.target.files;
    const reader = new FileReader();
    // Đọc thông tin tập tin đã được đăng tải
    reader.readAsDataURL(files[0]);
    // Lắng nghe quá trình đọc tập tin hoàn thành
    reader.addEventListener("load", (event) => {
      const uploadedfiles = reader.result;
      window.localStorage.setItem("Avaimg", uploadedfiles);
      var imgdata = window.localStorage.getItem("Avaimg");
      document.querySelector(".avatar-img").src = `${imgdata}`;
    });
  });
  //Download file PDF
  var downbtn = document.querySelector(".download-pdf-btn");
  downbtn.onclick = function () {
    window.scroll({
      top: 0,
      left: 0,
    });
    var changeatr = document.querySelectorAll("[contenteditable]");
    for (var i of changeatr) {
      i.setAttribute("contenteditable", false);
    }
    var element = document.querySelector(".main-CV-item-wrap");
    var otp = {
      margin: 10,
      jsPDF: {
        format: [210, 297],
        pagebreak: { after: ".test-item--page-break" },
      },
      pagebreak: {
        mode: "",
        before: ".break-before",
        after: ".break-after",
        avoid: ".break-avoid",
      },
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
    };
    html2pdf().set(otp).from(element).save();
    setTimeout(function () {
      for (var i of changeatr) {
        i.setAttribute("contenteditable", true);
      }
    }, 2000);
  };
  //Xóa hết nội dung
  var dlabtn = document.querySelector(".delete-all-btn");
  dlabtn.onclick = function () {
    localStorage.clear();
    location.reload();
    skillpre();
  };
  //Thay đổi skill value
  function changeskv() {
    skillvalue = document.querySelectorAll(".skil-input");
    Progressbar = document.querySelectorAll(".progress-bar");
    for (var i of skillvalue) {
      i.oninput = function (e) {
        for (var j = 0; j < skillvalue.length; j++) {
          if (j == e.target.id) {
            window["Progressbar" + j] = skillvalue[j].value;
            window.localStorage.setItem(
              `Progressbar[${j}]`,
              window["Progressbar" + j]
            );
            Progressbar[j].style.width = `${skillvalue[j].value}%`;
          }
        }
      };
    }
  }
  changeskv();
  //Đưa các biến từ local storage ra ngoài và gán lại % process
  function getandtakeprocess() {
    skillvalue = document.querySelectorAll(".skil-input");
    Progressbar = document.querySelectorAll(".progress-bar");
    for (i = 0; i < skillvalue.length; i++) {
      skillvalue[i].value = window.localStorage.getItem(`Progressbar[${i}]`);
      Progressbar[i].style.width = `${skillvalue[i].value}%`;
    }
  }
  getandtakeprocess();
  //Thêm thẻ skill
  //Lưu trữ các biến dữ liệu nhập vào Local Storage và đưa các biến đó ra của phần kĩ năng
  function skillheadingpro() {
    sitemA = document.querySelectorAll(".skill-place-name-item");
    for (var j = 0; j < sitemA.length; j++) {
      sitemA[j].innerHTML = window.localStorage.getItem(`spn-${j}`);
    }
    for (var i of sitemA) {
      i.onkeyup = function (e) {
        for (var j = 0; j < sitemA.length; j++) {
          if (j == e.target.id) {
            window["spn" + j] = sitemA[j].innerHTML;
            window.localStorage.setItem(`spn-${j}`, window["spn" + j]);
          }
        }
      };
    }
  }
  skillheadingpro();
  // Hàm lấy và lưu dữ liệu general info
  function takeandgetgeinfo() {
    for (var i of gein) {
      i.onkeyup = function (e) {
        for (var j = 0; j < gein.length; j++) {
          if (j == e.target.id) {
            window["ge" + j] = gein[j].innerHTML;
            window.localStorage.setItem(`ge${j}`, window["ge" + j]);
          }
        }
      };
      for (var j = 0; j < gein.length; j++) {
        gein[j].innerHTML = window.localStorage.getItem(`ge${j}`);
      }
    }
  }
  takeandgetgeinfo();

  //Lấy và lưu dữ liệu interest
  function takeandgetgeinte() {
    var inte = document.querySelector(".interest-content");
    inte.onkeyup = function (e) {
      var intec = e.target.innerHTML;
      window.localStorage.setItem("intec", intec);
    };
    inte.innerHTML = window.localStorage.getItem("intec");
  }
  takeandgetgeinte();

  //Lấy và lưu dữ liệu general main info
  function takeandgetgeminfo() {
    var magein = document.querySelector(".main-ge-name");
    var mageip = document.querySelector(".main-ge-po");
    magein.onkeyup = function (e) {
      var magein = e.target.innerHTML;
      window.localStorage.setItem("magein", magein);
    };
    mageip.onkeyup = function (e) {
      var mageip = e.target.innerHTML;
      window.localStorage.setItem("mageip", mageip);
    };
    magein.innerHTML = window.localStorage.getItem("magein");
    mageip.innerHTML = window.localStorage.getItem("mageip");
  }
  takeandgetgeminfo();

  //Phần kinh nghiệm
  //Lấy trữ phần kinh nghiệm làm việc bên local storage
  function getexp() {
    expheadinglist = document.querySelectorAll(".exp-item-heading");
    exptextlist = document.querySelectorAll(".exp-des-text");
    for (var i of expheadinglist) {
      i.onkeyup = function (e) {
        for (var j = 0; j < expheadinglist.length; j++) {
          if (j == e.target.id) {
            window["exh" + j] = expheadinglist[j].innerHTML;
            window.localStorage.setItem(`exh${j}`, window["exh" + j]);
          }
        }
      };
    }
    for (var i of exptextlist) {
      i.onkeyup = function (e) {
        for (var j = 0; j < exptextlist.length; j++) {
          if (j == e.target.id) {
            window["ext" + j] = exptextlist[j].innerHTML;
            window.localStorage.setItem(`ext${j}`, window["ext" + j]);
          }
        }
      };
    }
    for (var j = 0; j < expheadinglist.length; j++) {
      expheadinglist[j].innerHTML = window.localStorage.getItem(`exh${j}`);
      exptextlist[j].innerHTML = window.localStorage.getItem(`ext${j}`);
    }
  }
  getexp();
  //Lấy phần học vấn bên local storage
  function getedu() {
    edhlist = document.querySelectorAll(".edu-item-heading");
    edtlist = document.querySelectorAll(".edu-des-text");
    for (var i of edhlist) {
      i.onkeyup = function (e) {
        for (var j = 0; j < edhlist.length; j++) {
          if (j == e.target.id) {
            window["edh" + j] = edhlist[j].innerHTML;
            window.localStorage.setItem(`edh${j}`, window["edh" + j]);
          }
        }
      };
    }
    for (var i of edtlist) {
      i.onkeyup = function (e) {
        for (var j = 0; j < edtlist.length; j++) {
          if (j == e.target.id) {
            window["edt" + j] = edtlist[j].innerHTML;
            window.localStorage.setItem(`edt${j}`, window["edt" + j]);
          }
        }
      };
    }
    for (var j = 0; j < edtlist.length; j++) {
      edhlist[j].innerHTML = window.localStorage.getItem(`edh${j}`);
      edtlist[j].innerHTML = window.localStorage.getItem(`edt${j}`);
    }
  }
  getedu();
  //Phần kinh nghiệm thực tập
  function expword() {
    var ind = document.querySelectorAll(".intern-des");
    for (var i of ind) {
      i.onkeyup = function (e) {
        for (var j = 0; j < ind.length; j += 1) {
          if (j == e.target.id) {
            window["ind" + j] = ind[j].innerHTML;
            window.localStorage.setItem(`ind${j}`, window["ind" + j]);
          }
        }
      };
      for (var j = 0; j < ind.length; j++) {
        ind[j].innerHTML = window.localStorage.getItem(`ind${j}`);
      }
    }
  }
  expword();
  function checkdisplay() {
    var checkboxbtn = document.querySelectorAll(".checkbox-choose");
    for (var i of checkboxbtn) {
      i.onclick = function (e) {
        switch (e.target.id) {
          case "0":
            if (e.target.checked) {
              document.querySelector(".skill-place").style.display = "block";
            } else {
              document.querySelector(".skill-place").style.display = "none";
            }
            break;
          case "1":
            if (e.target.checked) {
              document.querySelector(".interest-place").style.display = "block";
            } else {
              document.querySelector(".interest-place").style.display = "none";
            }
            break;
          case "2":
            if (e.target.checked) {
              document.querySelector(".main-experiment-place").style.display =
                "block";
            } else {
              document.querySelector(".main-experiment-place").style.display =
                "none";
            }
            break;
          case "3":
            if (e.target.checked) {
              document.querySelector(".main-education-place").style.display =
                "block";
            } else {
              document.querySelector(".main-education-place").style.display =
                "none";
            }
            break;
          case "4":
            if (e.target.checked) {
              document.querySelector(".main-intern-place").style.display =
                "block";
            } else {
              document.querySelector(".main-intern-place").style.display =
                "none";
            }
            break;
        }
      };
    }
  }
  checkdisplay();
  function instruction() {
    skillvalue = document.querySelectorAll(".skil-input");
    sitemA = document.querySelectorAll(".skill-place-name-item");
    expheadinglist = document.querySelectorAll(".exp-item-heading");
    exptextlist = document.querySelectorAll(".exp-des-text");
    edhlist = document.querySelectorAll(".edu-item-heading");
    edtlist = document.querySelectorAll(".edu-des-text");
    for (var i of gein) {
      i.onfocus = function (e) {
        document.querySelector(".ge-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".ge-info").style.display = "none";
        hideins();
      };
    }
    for (var i of sitemA) {
      i.onfocus = function (e) {
        document.querySelector(".skill-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".skill-info").style.display = "none";
        hideins();
      };
    }
    for (var i of skillvalue) {
      i.onfocus = function (e) {
        document.querySelector(".skill-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".skill-info").style.display = "none";
        hideins();
      };
    }
    for (var i of expheadinglist) {
      i.onfocus = function (e) {
        document.querySelector(".work-exp-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".work-exp-info").style.display = "none";
        hideins();
      };
    }
    for (var i of exptextlist) {
      i.onfocus = function (e) {
        document.querySelector(".work-exp-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".work-exp-info").style.display = "none";
        hideins();
      };
    }
    for (var i of edhlist) {
      i.onfocus = function (e) {
        document.querySelector(".edu-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".edu-info").style.display = "none";
        hideins();
      };
    }
    for (var i of edtlist) {
      i.onfocus = function (e) {
        document.querySelector(".edu-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".edu-info").style.display = "none";
        hideins();
      };
    }
    for (var i of ind) {
      i.onfocus = function (e) {
        document.querySelector(".intern-info").style.display = "block";
        enins();
      };
      i.onblur = function (e) {
        document.querySelector(".intern-info").style.display = "none";
        hideins();
      };
    }
    document.querySelector(".interest-content").onfocus = function (e) {
      document.querySelector(".interest-info").style.display = "block";
      enins();
    };
    document.querySelector(".interest-content").onblur = function (e) {
      document.querySelector(".interest-info").style.display = "none";
      hideins();
    };
  }
  instruction();
  function hideins() {
    document.querySelector(".main-instruction-place").classList.remove("l-3");
    document.querySelector(".main-CV-place").classList.add("l-o-3");
    document.querySelector(".main-CV-place").style.marginright = "-20px";
  }
  function enins() {
    document.querySelector(".main-instruction-place").classList.add("l-3");
    document.querySelector(".main-CV-place").classList.remove("l-o-3");
    document.querySelector(".main-CV-place").classList.add("l-6");
    document.querySelector(".main-CV-place").style.marginright = "0";
  }

  function newskilladd() {
    if (JSON.parse(window.localStorage.getItem("skl-ac"))) {
      var n = JSON.parse(window.localStorage.getItem("skl-ac"));
    } else {
      var n = 1;
    }
    document.querySelector(".add-btn-skill").onclick = function () {
      var nodeori = document.querySelector(".skill-place-item:last-child");
      var nodedup = nodeori.cloneNode(true);
      nodedup.id = `js-s-${n}`;
      nodedup.querySelector(".skil-input").id = `${n}`;
      nodedup.querySelector(".skill-place-name-item").id = `${n}`;
      nodedup.querySelector(".skill-place-name-item").innerHTML = `Skill-${
        n + 1
      }`;
      if (!window.localStorage.getItem(`Progressbar[${n}]`)) {
        window.localStorage.setItem(`spn-${n}`, `Skill-${n + 1}`);
        window.localStorage.setItem(`Progressbar[${n}]`, `${n}`);
      }
      nodedup.querySelector(".progress-bar").id = `js-s-${n + 1}`;
      nodeori.after(nodedup);
      window.localStorage.setItem(`skl-ac`, `${n + 1}`);
      n += 1;
      changeskv();
      skillheadingpro();
      getandtakeprocess();
      instruction();
      removeskill();
    };
  }
  newskilladd();
  function newexpadd() {
    document.querySelector(".add-btn-exp").onclick = function () {
      if (JSON.parse(window.localStorage.getItem("exp-ac"))) {
        var k = JSON.parse(window.localStorage.getItem("exp-ac"));
      } else {
        var k = 1;
      }
      var nodeori = document.querySelector(".exp-item:last-child");
      var nodedup = nodeori.cloneNode(true);
      nodedup.querySelector(".exp-item-heading").id = `${k}`;
      nodedup.querySelector(".exp-des-text").id = `${k}`;
      if (!window.localStorage.getItem(`exh${k}`)) {
        window.localStorage.setItem(`exh${k}`, `Nơi làm việc`);
        window.localStorage.setItem(
          `ext${k}`,
          `Giới thiệu khái quát nơi làm việc`
        );
      }
      nodeori.after(nodedup);
      window.localStorage.setItem(`exp-ac`, `${k + 1}`);
      k += 1;
      getexp();
      instruction();
      removeexp();
    };
  }
  newexpadd();
  function neweduadd() {
    if (JSON.parse(window.localStorage.getItem("edu-ac"))) {
      var n = JSON.parse(window.localStorage.getItem("edu-ac"));
    } else {
      var n = 1;
    }
    document.querySelector(".add-btn-edu").onclick = function () {
      if (JSON.parse(window.localStorage.getItem("edu-ac"))) {
        var n = JSON.parse(window.localStorage.getItem("edu-ac"));
      } else {
        var n = 1;
      }
      var nodeori = document.querySelector(".edu-item:last-child");
      var nodedup = nodeori.cloneNode(true);
      nodedup.querySelector(".edu-item-heading").id = `${n}`;
      nodedup.querySelector(".edu-des-text").id = `${n}`;
      if (!window.localStorage.getItem(`edh${n}`)) {
        window.localStorage.setItem(`edh${n}`, `Nơi học tập`);
        window.localStorage.setItem(`edt${n}`, `Mô tả khái quát`);
      }
      nodeori.after(nodedup);
      window.localStorage.setItem(`edu-ac`, `${n + 1}`);
      n++;
      getedu();
      instruction();
    };
  }
  neweduadd();
  function newinternadd() {
    document.querySelector(".add-btn-intern").onclick = function (e) {
      if (JSON.parse(window.localStorage.getItem("ind-ac"))) {
        var n = JSON.parse(window.localStorage.getItem("ind-ac"));
      } else {
        var n = 1;
      }
      var nodeori = document.querySelector(".intern-des-item:last-child");
      var nodedup = nodeori.cloneNode(true);
      nodedup.querySelector(".intern-des").id = `${n}`;
      if (!window.localStorage.getItem(`ind${n}`)) {
        window.localStorage.setItem(
          `ind${n}`,
          `Giới thiệu khái quát về nơi thực tập`
        );
      }
      window.localStorage.setItem(`ind-ac`, `${n + 1}`);
      // if (checkoverflow()) {
      //   doifoverflow(nodedup);
      // } else {
      nodeori.after(nodedup);
      // }
      n++;
      expword();
      instruction();
      removeintern();
    };
  }
  newinternadd();
  function changeplaceup() {
    var upbtnlist = document.querySelectorAll(".go-up-btn");
    upbtnlist.forEach(function (i) {
      i.onclick = function () {
        var nodeori1 = i.parentNode.parentNode.parentNode.parentNode;
        function changeplaceitemup() {
          var nodeori2 =
            i.parentNode.parentNode.parentNode.parentNode.previousSibling;
          nodeori1.remove();
          nodeori2.before(nodeori1);
        }
        if (
          i.parentNode.parentNode.parentNode.parentNode.previousElementSibling
            .className == "gene-info" ||
          i.parentNode.parentNode.parentNode.parentNode.previousElementSibling
            .className == "main-ge-info"
        ) {
          return 0;
        } else {
          changeplaceitemup();
          changeplaceitemup();
        }
      };
    });
  }
  changeplaceup();
  function changeplacedown() {
    var downbtnlist = document.querySelectorAll(".go-down-btn");
    downbtnlist.forEach(function (i) {
      i.onclick = function () {
        var nodeori1 = i.parentNode.parentNode.parentNode.parentNode;
        function changeplaceitemdown() {
          var nodeori2 =
            i.parentNode.parentNode.parentNode.parentNode.nextSibling;
          nodeori1.remove();
          nodeori2.after(nodeori1);
        }
        if (i.parentNode.parentNode.parentNode.parentNode.nextSibling) {
          console.log(1);
          changeplaceitemdown();
          changeplaceitemdown();
          downbtnlist = document.querySelectorAll(".go-down-btn");
        } else {
          return 0;
        }
      };
    });
  }
  changeplacedown();
  function geandtalsskagain() {
    if (JSON.parse(window.localStorage.getItem("skl-ac"))) {
      var n = JSON.parse(window.localStorage.getItem("skl-ac"));
      var k = 0;
      for (i = 2; i < n + 1; i++) {
        var nodeori = document.querySelector(".skill-place-item:last-child");
        var nodedup = nodeori.cloneNode(true);
        nodedup.id = `js-s-${k + 1}`;
        nodedup.querySelector(".skil-input").id = `${k + 1}`;
        nodedup.querySelector(".skill-place-name-item").id = `${k + 1}`;
        nodedup.querySelector(".skill-place-name-item").innerHTML = `Skill-${
          k + 2
        }`;
        nodedup.querySelector(".progress-bar").id = `js-s-${k + 1}`;
        nodeori.after(nodedup);
        k++;
        changeskv();
        skillheadingpro();
        getandtakeprocess();
        instruction();
      }
    } else {
      var n = 1;
    }
  }
  geandtalsskagain();
  function geandtaexagain() {
    if (JSON.parse(window.localStorage.getItem("exp-ac"))) {
      var n = JSON.parse(window.localStorage.getItem("exp-ac"));
      var k = 0;
      for (i = 0; i < n - 1; i += 1) {
        var nodeori = document.querySelector(".exp-item").lastChild.parentNode;
        var nodedup = nodeori.cloneNode(true);
        nodedup.querySelector(".exp-item-heading").id = `${k}`;
        nodedup.querySelector(".exp-des-text").id = `${k}`;
        nodeori.after(nodedup);
        k++;
        getexp();
        instruction();
      }
    } else {
      var n = 1;
    }
  }
  function geandtaeduagain() {
    if (JSON.parse(window.localStorage.getItem("edu-ac"))) {
      var n = JSON.parse(window.localStorage.getItem("edu-ac"));
      var k = 0;
      for (i = 0; i < n - 1; i += 1) {
        var nodeori = document.querySelector(".edu-item").lastChild.parentNode;
        var nodedup = nodeori.cloneNode(true);
        nodedup.querySelector(".edu-item-heading").id = `${k}`;
        nodedup.querySelector(".edu-des-text").id = `${k}`;
        nodeori.after(nodedup);
        k + 1;
        getedu();
        instruction();
      }
    } else {
      var n = 1;
    }
  }
  geandtaeduagain();
  geandtaexagain();
  function geandtaintagain() {
    var n = JSON.parse(window.localStorage.getItem("ind-ac"));
    var k = 0;
    if (JSON.parse(window.localStorage.getItem("ind-ac"))) {
      for (i = 0; i < n - 1; i += 1) {
        var nodeori =
          document.querySelector(".intern-des-item").lastChild.parentNode;
        var nodedup = nodeori.cloneNode(true);
        nodedup.querySelector(".intern-des").id = `${k}`;
        nodeori.after(nodedup);
        k++;
        expword();
        instruction();
      }
    } else {
      var n = 1;
    }
  }
  geandtaintagain();
  function printbtn() {
    var printbtn = document.querySelector(".print-btn");
    printbtn.onclick = function () {
      window.print();
    };
  }
  printbtn();
  function removeskill() {
    document.querySelector(".remove-btn-skill").onclick = function () {
      if (JSON.parse(window.localStorage.getItem("skl-ac"))) {
        var k = JSON.parse(window.localStorage.getItem("skl-ac"));
      } else {
        var k = 1;
      }
      if (
        document.querySelector(".skill-place-item:last-child")
          .previousElementSibling
      ) {
        var nodeori = document.querySelector(".skill-place-item:last-child");
        nodeori.remove();
        window.localStorage.setItem(`skl-ac`, `${k - 1}`);
        k -= 1;
        changeskv();
        skillheadingpro();
        getandtakeprocess();
        instruction();
        newskilladd();
      } else {
        return 0;
      }
    };
  }
  removeskill();
  function removeexp() {
    document.querySelector(".remove-btn-exp").onclick = function () {
      if (JSON.parse(window.localStorage.getItem("exp-ac"))) {
        var k = JSON.parse(window.localStorage.getItem("exp-ac"));
      } else {
        var k = 1;
      }
      if (
        document.querySelector(".exp-item:last-child").previousElementSibling
      ) {
        var nodeori = document.querySelector(".exp-item:last-child");
        nodeori.remove();
        window.localStorage.setItem(`exp-ac`, `${k - 1}`);
        k -= 1;
        getexp();
        instruction();
        newexpadd();
      } else {
        return 0;
      }
    };
  }
  removeexp();
  function removeedu() {
    document.querySelector(".remove-btn-edu").onclick = function () {
      if (
        document.querySelector(".edu-item:last-child").previousElementSibling
      ) {
        if (JSON.parse(window.localStorage.getItem("edu-ac"))) {
          var k = JSON.parse(window.localStorage.getItem("edu-ac"));
        } else {
          var k = 1;
        }
        var nodeori = document.querySelector(".edu-item:last-child");
        nodeori.remove();
        window.localStorage.setItem(`edu-ac`, `${k - 1}`);
        k -= 1;
        getedu();
        instruction();
        neweduadd();
      } else {
        return 0;
      }
    };
  }
  removeedu();
  function removeintern() {
    document.querySelector(".remove-btn-intern").onclick = function () {
      if (
        document.querySelector(".intern-des-item:last-child")
          .previousElementSibling
      ) {
        if (JSON.parse(window.localStorage.getItem("ind-ac"))) {
          var k = JSON.parse(window.localStorage.getItem("ind-ac"));
        } else {
          var k = 1;
        }
        var nodeori = document.querySelector(".intern-des-item:last-child");
        nodeori.remove();
        window.localStorage.setItem(`ind-ac`, `${k - 1}`);
        k -= 1;
        expword();
        instruction();
        newinternadd();
      } else {
        return 0;
      }
    };
  }
  removeintern();
};
