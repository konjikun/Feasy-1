const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const script2 = document.createElement('script')
script2.type = 'text/javascript'
script2.src = 'https://yoshi-program.github.io/Feasy/feasy.js'
document.body.appendChild(script2)

const dataList = [
  'familyname_kanji',
  'firstname_kanji',
  'familyname_hurigana_kata',
  'firstname_hurigana_kata',
  'dateofbirth_year',
  'dateofbirth_month',
  'dateofbirth_day',
  'zip_code1',
  'zip_code2',
  'block_number',
  'tel1',
  'tel2',
  'tel3',
  'tel_landline1',
  'tel_landline2',
  'tel_landline3',
  'email',
]
feasy.buttonAppend('#BasicInputForm')
feasy.on((getdata) => {
  if (getdata) {
    const data = getdata.val
    switch (getdata.type) {
      case 'loaded':
        feasy.sendData(dataList)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('input[name="name.name1"]').val(data.familyname_kanji)
        $('input[name="name.name2"]').val(data.firstname_kanji)
        $('input[name="nameKana.nameKana1"]').val(data.familyname_hurigana_kata)
        $('input[name="name.name2"]').val(data.firstname_hurigana_kata)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
