const a = document.createElement('script')
//a.src = 'http://localhost:3000/feasy.js'
a.src = 'https://yoshi-program.github.io/Feasy/feasy.js'
a.type = 'text/javascript'
document.head.appendChild(a)

const script1 = document.createElement('script')
script1.type = 'text/javascript'
script1.src = '//code.jquery.com/jquery-1.12.0.min.js'
document.body.appendChild(script1)

const dataList = [
  'car_egistration_plate_number',
  'car_egistration_plate_bunrui',
  'car_egistration_plate_kana',
  'car_egistration_plate_ichiren',
  'zip_code1',
  'zip_code2',
  'prefecture',
  'municipalities',
  'town_name',
  'block_number_kanji',
  'tel1',
  'tel2',
  'tel3',
  'before_one_zip_code1',
  'before_one_zip_code2',
  'before_one_prefecture',
  'before_one_town_name',
  'before_one_block_number_kanji',
]

const noChange = []

const sendData = { list: dataList, sig: noChange }

feasy.buttonAppend('.dmfraZ')
feasy.on((getdata) => {
  if (getdata) {
    const data = getdata.val
    switch (getdata.type) {
      case 'loaded':
        feasy.sendData(sendData)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('select[name="combobox006"]').val(data.car_egistration_plate_number)
        $('#text065').val(data.car_egistration_plate_bunrui)
        $('#text066').val(data.car_egistration_plate_kana)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
