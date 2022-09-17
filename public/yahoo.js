const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const script2 = document.createElement('script')
script2.type = 'text/javascript'
script2.src = 'http://localhost:3000/feasy.js'
document.body.appendChild(script2)

const dataList = [
  'familyname_kanji',
  'firstname_kanji',
  'familyname_hurigana',
  'firstname_hurigana',
  'zip_code',
  'prefecture',
  'municipalities',
  'town_name_block_number',
  'building_name',
  'tel1',
  'tel2',
  'tel3',
]

const btn = feasy.createBtn()
$('#context').append(btn)
btn.click(function () {
  const iframe = feasy.createIframe()
  $('#context').append(iframe)
})
feasy.on('data', (getdata) => {
  if (getdata) {
    console.log(getdata)
    switch (getdata.type) {
      case 'loaded':
        console.log(1)
        feasy.send(dataList)
        $('#modalArea').fadeIn()
        break
      case 'storage':
        $('#modalArea').fadeOut()
        $('#LN').val(getdata.val.familyname_kanji)
        $('#FN').val(getdata.val.firstname_kanji)
        $('#NK1').val(getdata.val.familyname_hurigana)
        $('#NK2').val(getdata.val.firstname_hurigana)
        $('#postalCode_a').val(getdata.val.zip_code)
        $('#address2_a').val(getdata.val.prefecture)
        $('#city_a').val(getdata.val.municipalities)
        $('#town_a').val(getdata.val.town_name_block_number)
        $('#house_a').val(getdata.val.building_name)
        $('#tel_a').val(getdata.val.tel1 + getdata.val.tel2 + getdata.val.tel3)
        $('#BN').val(getdata.val.school_name)
        break
    }
  } else {
    $('#modalArea').fadeOut()
  }
})
