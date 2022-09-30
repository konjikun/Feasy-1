const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const script2 = document.createElement('script')
script2.type = 'text/javascript'
script2.src = 'https://yoshi-program.github.io/Feasy/feasy.js'
//script2.src = 'https://yoshi-program.github.io/Feasy/feasy.js'
document.body.appendChild(script2)

const noChangeDataList = { tax_2022: '100', income_2022: '5000' }
const noChange = []
let d = {}

for (let i = 0; i < Object.keys(noChangeDataList).length; i++) {
  const keyData = `data=${Object.values(noChangeDataList)[i]}`
  d = {}
  $.post('http://localhost:3000/api/sign/', keyData)
    //サーバーからの返信を受け取る
    .done(function (data) {
      d = Object.assign(d, data)
      noChange.push({
        [Object.keys(noChangeDataList)[i]]: JSON.stringify(
          Object.assign(d, { data: Object.values(noChangeDataList)[i] })
        ),
      })
    })
}

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
  'block_number_kanji',
  'block_number_kata',
  'tel1',
  'tel2',
  'tel3',
  'tel_landline1',
  'tel_landline2',
  'tel_landline3',
  'email',
]

const sendData = { list: dataList, sig: noChange }
feasy.buttonAppend('#BasicInputForm')

feasy.on((getdata) => {
  if (getdata) {
    const data = getdata.val
    switch (getdata.type) {
      case 'loaded':
        // feasy.sendData(dataList)
        feasy.sendData(sendData)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('input[name="name.name1"]').val(data.familyname_kanji)
        $('input[name="name.name2"]').val(data.firstname_kanji)
        $('input[name="nameKana.nameKana1"]').val(data.familyname_hurigana_kata)
        $('input[name="nameKana.nameKana2"]').val(data.firstname_hurigana_kata)
        $('select[name="birthPc.birthdayNendai"]').val(String(Number(data.dateofbirth_year) + 2012))
        $('select[name="birthPc.birthday1"]').val(data.dateofbirth_month)
        $('select[name="birthPc.birthday2"]').val(data.dateofbirth_day)
        $('input[name="address.zip1"]').val(data.zip_code1)
        $('input[name="address.zip2"]').val(data.zip_code2)
        $('input[name="address.address2"]').val(data.block_number_kanji)
        $('input[name="address.addressKana2"]').val(data.block_number_kata)
        $('input[name="tel.tel2A"]').val(data.tel1)
        $('input[name="tel.tel2B"]').val(data.tel2)
        $('input[name="tel.tel2C"]').val(data.tel3)
        $('input[name="tel.tel1A"]').val(data.tel_landline1)
        $('input[name="tel.tel1B"]').val(data.tel_landline2)
        $('input[name="tel.tel1C"]').val(data.tel_landline3)
        $('input[name="email.emailAddress1"]').val(data.email)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})

/*//この下は安全
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
  'familyname_hurigana_kata',
  'firstname_hurigana_kata',
  'dateofbirth_year',
  'dateofbirth_month',
  'dateofbirth_day',
  'zip_code1',
  'zip_code2',
  'block_number_kanji',
  'block_number_kata',
  'tel1',
  'tel2',
  'tel3',
  'tel_landline1',
  'tel_landline2',
  'tel_landline3',
  'email',
]
feasy.buttonAppend('#BasicInputForm > ul.function02.clearfix')
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
        $('input[name="nameKana.nameKana2"]').val(data.firstname_hurigana_kata)
        $('select[name="birthPc.birthdayNendai"]').val(String(Number(data.dateofbirth_year) + 2012))
        $('select[name="birthPc.birthday1"]').val(data.dateofbirth_month)
        $('select[name="birthPc.birthday2"]').val(data.dateofbirth_day)
        $('input[name="address.zip1"]').val(data.zip_code1)
        $('input[name="address.zip2"]').val(data.zip_code2)
        $('input[name="address.address2"]').val(data.block_number_kanji)
        $('input[name="address.addressKana2"]').val(data.block_number_kata)
        $('input[name="tel.tel2A"]').val(data.tel1)
        $('input[name="tel.tel2B"]').val(data.tel2)
        $('input[name="tel.tel2C"]').val(data.tel3)
        $('input[name="tel.tel1A"]').val(data.tel_landline1)
        $('input[name="tel.tel1B"]').val(data.tel_landline2)
        $('input[name="tel.tel1C"]').val(data.tel_landline3)
        $('input[name="email.emailAddress1"]').val(data.email)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
*/
