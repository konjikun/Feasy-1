const a = document.createElement('script')
// a.src = 'https://yoshi-program.github.io/Feasy/feasy.js'

a.type = 'text/javascript'
document.head.appendChild(a)
a.src = 'http://localhost:3000/feasy.js'

const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const dataList = [
  'familyname_hurigana_kata',
  'firstname_hurigana_kata',
  'familyname_kanji',
  'firstname_kanji',
  'email',
  'tel1',
  'tel2',
  'tel3',
]


const keyData = 'data="100"'

$.post('http://localhost:3000/api/sign/', keyData)
  //サーバーからの返信を受け取る
  .done(function (data) {
    console.log('data: ', data)
  })

feasy.buttonAppend('#contents')
feasy.on((getdata) => {
  if (getdata) {
    switch (getdata.type) {
      case 'loaded':
        feasy.sendData(dataList)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('#moushikomiShimeiKn').val(
          getdata.val.familyname_hurigana_kata + getdata.val.firstname_hurigana_kata
        )
        $('#moushikomiShimeiKj').val(getdata.val.familyname_kanji + getdata.val.firstname_kanji)
        $('#moushikomiMail').val(getdata.val.email)
        $('#confirmMoushikomiMail').val(getdata.val.email)
        $('#moushikomiPhoneNo1').val(getdata.val.tel1)
        $('#moushikomiPhoneNo2').val(getdata.val.tel2)
        $('#moushikomiPhoneNo3').val(getdata.val.tel3)
        break
    }
  } else {
    feasy.fadeOutModal()
    // $('#modalArea').fadeOut()
  }
})
