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
  'zip_code1',
  'zip_code2',
  'prefecture',
  'municipalities',
  'town_name',
  'block_number_kanji',
  'building_name',
  'tel1',
  'tel2',
  'tel3',
  'tel_landline1',
  'tel_landline2',
  'tel_landline3',
  // 'school_name',
  // 'school_zip_code1',
  // 'school_zip_code2',
  // 'school_prefecture',
  // 'school_municipalities',
  // 'school_town_name',
  // 'school_block_number',
  // 'school_building_name',
  // 'school_tel1',
  // 'school_tel2',
  // 'school_tel3',
]

feasy.buttonAppend('#yjMain > div > form > div > div > div.buttonMedium')
feasy.on((getdata) => {
  if (getdata) {
    console.log(getdata)
    switch (getdata.type) {
      case 'loaded':
        console.log(1)
        feasy.sendData(dataList)
        feasy.fadeInModal()
        break
      case 'storage':
        feasy.fadeOutModal()
        $('#LN').val(getdata.val.familyname_kanji)
        $('#FN').val(getdata.val.firstname_kanji)
        $('#NK1').val(getdata.val.familyname_hurigana_kata)
        $('#NK2').val(getdata.val.firstname_hurigana_kata)
        $('#postalCode_a').val(`${getdata.val.zip_code1}-${getdata.val.zip_code2}`)
        $('select[name="home_state"]').val(getdata.val.prefecture)
        //$('#address2_a').val(getdata.val.prefecture)
        $('#city_a').val(getdata.val.municipalities)
        $('#town_a').val(getdata.val.town_name + getdata.val.block_number_kanji)
        $('#house_a').val(getdata.val.building_name)
        $('#tel_a').val(getdata.val.tel1 + getdata.val.tel2 + getdata.val.tel3)
        $('#fax_a').val(
          getdata.val.tel_landline1 + getdata.val.tel_landline2 + getdata.val.tel_landline3
        )
        $('#contact_a').val(getdata.val.tel1 + getdata.val.tel2 + getdata.val.tel3)
        // $('#BN').val(getdata.val.school_name)
        // $('#postalCode_b').val(getdata.val.school_zip_code1 + getdata.val.school_zip_code2)
        // $('#address_b').val(getdata.val.school_prefecture)
        // $('#city_b').val(getdata.val.school_municipalities)
        // $('#town_b').val(getdata.val.school_town_name + getdata.val.school_block_number)
        // $('#house_b').val(getdata.val.school_building_name)
        // $('#tel_b').val(getdata.school_tel1)
        // $('#fax_b').val(getdata.school_tel2)
        // $('#contact_b').val(getdata.school_tel3)
        break
    }
  } else {
    feasy.fadeOutModal()
  }
})
