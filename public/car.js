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
  'before_one_prefecture',
  'before_one_municipalities',
  'before_one_town_name',
  'before_one_block_number_kanji',
]

const noChange = []

const sendData = { list: dataList, sig: null }

feasy.buttonAppend('#label_radio074')
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
        $('select[name="combobox006"]').val(data.car_egistration_plate_number)
        $('#text065').val(data.car_egistration_plate_bunrui)
        $('#text066').val(data.car_egistration_plate_kana)
        $('#text067').val(data.car_egistration_plate_ichiren)
        $('#text073').val(data.zip_code1)
        $('#text074').val(data.zip_code2)
        $('select[name="combobox007"]').val(data.prefecture)
        $('#text075').val(data.municipalities)
        $('#text076').val(data.town_name + data.block_number_kanji)
        $('#text078').val(`${data.tel1}-${data.tel2}-${data.tel3}`)
        $('select[name="combobox008"]').val(data.before_one_prefecture)
        $('#text079').val(data.before_one_municipalities)
        $('#text080').val(data.before_one_town_name + data.before_one_block_number_kanji)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
