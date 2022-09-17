function buttonAppend(buttonPosition) {
  $(buttonPosition).append(
    '<input style="width: 10em; height:3em;" type="button" value="feasyから入力" width=500 height=100 id="modalBtn">'
  )
  $('#modalBtn').click(function () {
    $('#contents').append(
      '<section style="display: none; position: fixed; top:0;left:0;width:100%;height:100%;"id="modalArea" class="modalArea">\
      <iframe style="position: absolute; top: 50%; left: 50%; transform:translate(-50%,-50%); border:none; width:100%; height:100vh;" height="360" id="childIframe" src="https://yoshi-program.github.io/Feasy"></iframe>\
      </section>'
    )
  })
}
function modalPrep() {
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://yoshi-program.github.io') {
      return
    }
    const getdata = event.data
    if (getdata) {
      switch (getdata.type) {
        case 'loaded': {
          first(dataList)
          break
        }
        case 'storage': {
          twice(getdata)
          break
        }
      }
    } else {
      $('#modalArea').fadeOut()
    }
  })
}
function first(dataList) {
  //const dataList = Object.keys(demandData)

  $('#childIframe')[0].contentWindow.postMessage(dataList, 'https://yoshi-program.github.io/Feasy')
  $('#modalArea').fadeIn()
}

function twice(getdata) {
  getdata = Object.values(getdata)
  getdata = getdata[1]
  getdata = Object.values(getdata)
  console.log(getdata)
  $('#modalArea').fadeOut()
  for (let i = 0; i < dataList.length; i++) {
    console.log(getdata[i])
    console.log(idData[i])
    document.getElementById(idData[i]).value = getdata[i]
  }
}

const demandData = {
  moushikomiShimeiKn: 'name_hurigana',
  moushikomiShimeiKj: 'name_kanji',
  moushikomiMail: 'email',
  confirmMoushikomiMail: 'mail',
  moushikomiPhoneNo1: 'tel1',
  moushikomiPhoneNo2: 'tel2',
  moushikomiPhoneNo3: 'tel3',
}

const dataList = Object.values(demandData)
console.log(dataList)
const idData = Object.keys(demandData)
console.log(idData)

buttonAppend('#contents')
modalPrep()
