const a = document.createElement('script')
a.type = 'text/javascript'
document.head.appendChild(a)
a.src = 'http://localhost:3000/feasy.js'

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
feasy.buttonAppend('#vi > p')
feasy.on((getdata) => {
  if (getdata) {
    switch (getdata.type) {
      case 'loaded':
        feasy.sendData(dataList)
        feasy.fadeInModal()
        // $('#modalArea').fadeIn()
        break
      case 'storage':
        feasy.fadeOutModal()
        // $('#modalArea').fadeOut()
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
